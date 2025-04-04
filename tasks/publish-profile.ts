import { command } from "./command.ts";
import { repository } from "./repository.ts";

console.log(`Publishing ${repository.name}... (${repository.remotePath})`);
await command(`git -C ${repository.localPath} commit --allow-empty-message -am ""`);
await command(`git -C ${repository.localPath} push`);
