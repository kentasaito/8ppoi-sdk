import { command } from "./command.ts";
import { repository } from "./repository.ts";
import { member } from "./member.ts";

console.log(`Revoking ${repository.name}... (${repository.remotePath})`);
await command(`gh api --method POST /repos/${member.login}/8ppoi-${member.id}/pages --input - `, '{"source":{"branch":"","path":""}}');
