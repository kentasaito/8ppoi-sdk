import { streamExec } from "@kenta/stream-exec";

const command = async (line: string, stdinValue: string = "") => {
  const args = line.split(" ");
  if (await streamExec(args.shift() ?? "", { args }, stdinValue) !== 0) Deno.exit(1);
};

export { command };
