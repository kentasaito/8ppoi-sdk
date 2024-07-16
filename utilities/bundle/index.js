import { bundle } from "https://deno.land/x/emit@0.40.0/mod.ts";
import { dirname } from "https://deno.land/std@0.224.0/path/mod.ts";

const result = await bundle(
  Deno.args[0],
  {
    minify: true,
  },
);
await Deno.writeTextFile(`${dirname(Deno.args[0])}/bundle.js`, result.code);
