import { command } from "./command.ts";
import { repository } from "./repository.ts";

console.log(`Showing diff of ${repository.name} (${repository.remotePath})\n`);
await command(`git -C ${repository.localPath} diff`);
