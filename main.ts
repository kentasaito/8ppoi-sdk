import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { streamExec } from "@kenta/stream-exec";

let memberId = "";
const code = await streamExec(
  "gh",
  { args: ["api", "user", "--jq", ".id"] },
  "",
  (stdoutMessage) => memberId = stdoutMessage,
  () => {},
);
if (code !== 0) {
  console.error("Failed to get member ID");
  console.error("Please make sure you are logged in to GitHub CLI");
  console.error("You can log in using the command: gh auth login");
  Deno.exit(1);
}

const app = new Hono();

app.get("/*", serveStatic({ root: `./cartridges/${memberId}/` }));

Deno.serve(app.fetch);
