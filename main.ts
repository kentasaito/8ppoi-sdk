import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { streamExec } from "@kenta/stream-exec";

let memberId = "unpublished_member";
await streamExec(
  "gh",
  { args: ["api", "user", "--jq", ".id"] },
  "",
  (stdoutMessage) => memberId = stdoutMessage,
  () => {},
);

const app = new Hono();

app.get("/*", serveStatic({ root: `./cartridges/${memberId}/` }));

Deno.serve(app.fetch);
