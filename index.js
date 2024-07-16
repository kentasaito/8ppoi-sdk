import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve({
  port: Deno.args[0] ?? 8000,
}, (req) => {
  return serveDir(req, {
    quiet: true,
  });
});
