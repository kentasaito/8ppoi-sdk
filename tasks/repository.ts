import { streamExec } from "@kenta/stream-exec";
import { member } from "./member.ts";

const repository = {
  name: "member profile",
  localPath: `./cartridges/${member.id}/`,
  remotePath: "",
};
if (await streamExec("git", { args: ["-C", repository.localPath, "remote", "get-url", "origin"] }, "", (repositoryPath) => repository.remotePath = repositoryPath) !== 0) {
  Deno.exit(1);
}
export { repository };
