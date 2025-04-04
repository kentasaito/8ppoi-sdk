const repositories = {
  "8ppoi-sdk": {
    name: "8ppoi SDK",
    directory: "./8ppoi-sdk/",
  },
  "8ppoi-console": {
    name: "8ppoi Console",
    directory: "./8ppoi-sdk/console/",
  },
  "8ppoi-1627937": {
    name: "Example 8ppoi member",
    directory: "./8ppoi-sdk/cartridges/1627937/",
  },
  "8ppoi-1627937-invaderx": {
    name: "Example 8ppoi cartridge",
    directory: "./8ppoi-sdk/cartridges/1627937/invaderx/",
  },
};

for (const [repositoryId, repository] of Object.entries(repositories)) {
  const repositoryPath = `./repos/${repositoryId}`;
  console.log(`Installing ${repository.name} (${repositoryPath})`);

  const command = new Deno.Command("git", {
    args: [
      "clone",
      repositoryPath,
      repository.directory,
    ],
  });

  const { code, stdout, stderr } = command.outputSync();

  const stdoutMessage = new TextDecoder().decode(stdout);
  const stderrMessage = new TextDecoder().decode(stderr);

  if (stdoutMessage) console.log(stdoutMessage);
  if (stderrMessage) console.error(stderrMessage);

  if (code !== 0) {
    console.error(`Failed to install ${repository.name} (${repositoryPath}):`);
    Deno.exit(1);
  }
}
console.log(
  `  \x1b[32mAwesome!\x1b[0m The 8ppoi SDK is all set up! \x1b[1m🚀\x1b[0m
  Now, run \x1b[34m\`cd ./8ppoi-sdk/\`\x1b[0m to navigate into the SDK directory.
  Then, go ahead and run \x1b[34m\`deno task dev\`\x1b[0m, open your browser,
  and check out \x1b[33mhttp://localhost:8000\x1b[0m.
  When you're done, hit \x1b[31mCtrl+C\x1b[0m to stop it. \x1b[32mEnjoy!\x1b[0m
`,
);
