import { streamExec } from "@kenta/stream-exec";

let member = {
  id: "",
  login: "",
  name: "",
};
await streamExec(
  "gh",
  { args: ["api", "user"] },
  "",
  (stdoutMessage) => member = JSON.parse(stdoutMessage),
);
export { member };
