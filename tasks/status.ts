import { command } from "./command.ts";
import { repository } from "./repository.ts";

console.log(`Showing status of ${repository.name} (${repository.remotePath})\n`);
await command(`git -C ${repository.localPath} status`);
