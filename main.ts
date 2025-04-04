import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { streamExec } from "@kenta/stream-exec";

interface ContextVariables {
  memberId: string;
}

const app = new Hono<{ Variables: ContextVariables }>();

// メンバーID取得
app.use("*", async (c, next) => {
  c.set(
    "memberId",
    await (async () => {
      let id = "unpublished_member";
      await streamExec(
        "gh",
        { args: ["api", "user", "--jq", ".id"] },
        (stdoutMessage) => id = stdoutMessage,
        () => {},
      );
      return id;
    })(),
  );
  await next();
});

app.get("/*", (c, next) => {
  const memberId = c.get("memberId");
  return serveStatic({
    root: `./cartridges/${memberId}/`,
  })(c, next);
});

Deno.serve(app.fetch);
