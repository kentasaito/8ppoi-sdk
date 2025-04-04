import { repositories } from "./repositories.ts";

for (const [repositoryId, repository] of Object.entries(repositories)) {
  const repositoryPath = `./repos/${repositoryId}`;
  console.log(`Checking version ${repository.name} (${repositoryPath})`);

  const command = new Deno.Command("git", {
    args: [
      "-C",
      repository.directory,
      "describe",
      "--tags",
    ],
  });

  const { code, stdout, stderr } = command.outputSync();

  const stdoutMessage = new TextDecoder().decode(stdout);
  const stderrMessage = new TextDecoder().decode(stderr);

  if (stdoutMessage) console.log(stdoutMessage);
  if (stderrMessage) console.error(stderrMessage);

  if (code !== 0) {
    console.error(
      `Failed to Check version ${repository.name} (${repositoryPath}):`,
    );
    Deno.exit(1);
  }
}
