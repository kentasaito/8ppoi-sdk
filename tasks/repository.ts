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
export { repository };
