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

console.log(`Publishing ${repository.name}... (${repository.repositoryPath})`);
if (await streamExec("git", { args: ["-C", repository.directory, "commit", "--allow-empty-message", "-am", '""'] }) !== 0) {
  Deno.exit(1);
}
if (await streamExec("git", { args: ["-C", repository.directory, "push"] }) !== 0) {
  Deno.exit(1);
}
console.log();
