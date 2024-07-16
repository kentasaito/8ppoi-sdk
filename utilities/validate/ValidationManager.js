import { Validation } from "./Validation.js";

export class ValidationManager {
  static paths;
  static errors;

  static validate(path) {
    this.paths = [];
    this.errors = [];

    const validation = new Validation(path);

    if (this.errors.length) {
      console.error(
        this.errors.map((error) =>
          `\u001b[1;31merror\u001b[0m: Undeclared indentifier "${error.name}" at \u001b[36m${error.path}\u001b[0m:\u001b[33m${error.start.line}\u001b[0m:\u001b[33m${error.start.column}\u001b[0m`
        ).join("\n"),
      );
      Deno.exit(1);
    }
  }
}
