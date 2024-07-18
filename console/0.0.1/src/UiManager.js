import { Console } from "./Console.js";

export class UiManager {
  static setup(config) {
    document.getElementById("screenContainer").setAttribute("tabindex", "-1");
    document.getElementById("screenContainer").style.width = `${config.screen.width}px`;
    document.getElementById("screenContainer").style.height = `${config.screen.height}px`;
    document.getElementById("screenContainer").style.position = "relative";
    const screen = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    screen.setAttribute(
      "viewBox",
      `0 0 ${config.screen.width / config.screen.scale} ${
        config.screen.height / config.screen.scale
      }`,
    );
    screen.id = "screen";
    screen.style.verticalAlign = "top";
    screen.style.width = "100%";
    screen.style.height = "100%";
    screen.style.backgroundColor =
      `var(--color${config.screen.backgroundColorId})`;
    const style = document.createElement("style");
    style.textContent += "#screen {";
    config.screen.colors.forEach((color, colorId) => {
      style.textContent += `--color${colorId}: ${color};`;
    });
    for (const paletteName in config.screen.palettes) {
      style.textContent += `[data-palette-name="${paletteName}"] {`;
      config.screen.palettes[paletteName].forEach((colorId, paletteColorId) => {
        if (Number.isInteger(colorId)) {
          style.textContent +=
            `[data-palette-color-id="${paletteColorId}"] { fill: var(--color${colorId}) };`;
        }
      });
      style.textContent += "}";
    }
    style.textContent += "}";
    screen.append(style);
    document.getElementById("screenContainer").append(screen);
    document.getElementById("screenContainer").append(this.renderRun(config));
  }

  static renderRun(config) {
    const run = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    run.setAttribute(
      "viewBox",
      `0 0 ${config.screen.width} ${config.screen.height}`,
    );
    run.id = "run";
    run.onclick = () => {
      run.remove();
      document.getElementById("screenContainer").focus();
      Console.run();
    };
    run.style.verticalAlign = "top";
    run.style.position = "absolute";
    run.style.left = "0";
    run.style.top = "0";
    run.style.width = "100%";
    run.style.height = "100%";
    run.style.opacity = 0.5;
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("fill", "hsl(0, 0%, 0%)");
    rect.setAttribute("x", `${0}`);
    rect.setAttribute("y", `${0}`);
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    run.append(rect);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "hsl(0, 0%, 100%)");
    path.setAttribute("d", "M120,80 v80 l80,-40 z");
    run.append(path);
    return run;
  }
}
