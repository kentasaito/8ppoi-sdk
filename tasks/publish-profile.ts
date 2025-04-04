import { streamExec } from "@kenta/stream-exec";
import { repository } from "./repository.ts";

const command = async (line: string) => {
  const args = line.split(" ");
  if (await streamExec(args.shift() ?? "", { args }) !== 0) Deno.exit(1);
};

console.log(`Publishing ${repository.name}... (${repository.repositoryPath})`);
await command(`git -C ${repository.directory} commit --allow-empty-message -am ""`);
await command(`git -C ${repository.directory} push`);

console.log();
