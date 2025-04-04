import { streamExec } from "@kenta/stream-exec";
import { repositories } from "./repositories.ts";

for (const [repositoryId, repository] of Object.entries(repositories)) {
  const repositoryPath = `git@github.com:kentasaito/${repositoryId}.git`;
  console.log(`Updating ${repository.name}...`);

  if (await streamExec("git", { args: ["-C", repository.directory, "remote", "-v"] }) !== 0) {
    Deno.exit(1);
  }
  if (await streamExec("git", { args: ["-C", repository.directory, "pull"] }) !== 0) {
    Deno.exit(1);
  }
  console.log();
}
