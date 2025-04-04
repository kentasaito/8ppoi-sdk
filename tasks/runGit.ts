import { streamExec } from "@kenta/stream-exec";
import { repository } from "./repository.ts";

const runGit = async (args: string[]) => {
  if (await streamExec("git", { args: ["-C", repository.directory, ...args] }) !== 0) Deno.exit(1);
};

export { runGit };
