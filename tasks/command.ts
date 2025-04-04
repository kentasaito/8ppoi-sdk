import { streamExec } from "@kenta/stream-exec";

const command = async (line: string) => {
  const args = line.split(" ");
  if (await streamExec(args.shift() ?? "", { args }) !== 0) Deno.exit(1);
};

export { command };
