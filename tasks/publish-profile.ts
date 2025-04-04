import { streamExec } from "@kenta/stream-exec";
import { member } from "./member.ts";

const repository = {
  name: "member profile",
  directory: `./cartridges/${member.id}/`,
  repositoryPath: "",
};
if (await streamExec("git", { args: ["-C", repository.directory, "remote", "get-url", "origin"] }, "", (repositoryPath) => repository.repositoryPath = repositoryPath) !== 0) {
  Deno.exit(1);
}

const git = async (args: string[]) => {
  if (await streamExec("git", { args: ["-C", repository.directory, ...args] }) !== 0) Deno.exit(1);
};

console.log(`Publishing ${repository.name}... (${repository.repositoryPath})`);
await git(["commit", "--allow-empty-message", "-am", '""']);
await git(["push"]);

console.log();
