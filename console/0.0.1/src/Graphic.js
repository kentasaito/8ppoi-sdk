import { GraphicManager } from "./GraphicManager.js";

export class Graphic {
  element;
  params;
  lines;
  cells;

  constructor(graphicName, cells) {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.element.dataset.graphicName = graphicName;
    this.params = {};
    this.lines = [];
    for (const y in typeof cells === "string" ? cells.split("\n") : cells) {
      this.lines[y] = new Proxy({}, {
        get: (_, x) => {
          return parseInt(
            this.element.querySelector(`[data-pos="${x},${y}"]`)?.dataset
              .sceceId,
          ) || undefined;
        },
        set: (_, x, sceneId) => {
          this.element.querySelector(`[data-pos="${x},${y}"]`)?.remove();
          const scene = GraphicManager.caches[graphicName][sceneId].cloneNode(
            true,
          );
          scene.dataset.pos = `${x},${y}`;
          scene.setAttribute(
            "transform",
            `translate(${x * GraphicManager.graphicSizes[graphicName].width} ${
              y * GraphicManager.graphicSizes[graphicName].height
            })`,
          );
          this.element.append(scene);
          return true;
        },
      });
    }
    this.cells = new Proxy({}, {
      get: (_, y) => {
        return this.lines[y];
      },
    });
    Object.defineProperties(this, {
      parent: {
        get: () => this.params.parent,
        set: (value) => {
          this.params.parent = value;
          this.params.parent.append(this.element);
        },
      },
      x: {
        get: () => this.params.x,
        set: (value) => {
          this.params.x = value;
          this.element.setAttribute(
            "transform",
            `translate(${this.params.x ?? 0} ${this.params.y ?? 0})`,
          );
        },
      },
      y: {
        get: () => this.params.y,
        set: (value) => {
          this.params.y = value;
          this.element.setAttribute(
            "transform",
            `translate(${this.params.x ?? 0} ${this.params.y ?? 0})`,
          );
        },
      },
      paletteName: {
        get: () => this.params.paletteName,
        set: (value) => {
          this.params.paletteName = value;
          this.element.dataset.paletteName = this.params.paletteName;
        },
      },
      text: {
        set: (value) => {
          this.element.innerHTML = "";
          let x = 0;
          let y = 0;
          for (const c of value.split("")) {
            if (c === "\n") {
              x = 0;
              y++;
            } else {
              this.cells[y][x++] = c.charCodeAt(0);
            }
          }
        },
      },
    });
    this.parent = document.getElementById("screen");
    this.x = 0;
    this.y = 0;
    this.paletteName = "defaultPalette";
    if (typeof cells === "string") {
      this.text = cells;
    } else {
      cells.forEach((line, y) => {
        line.forEach((sceneId, x) => {
          this.cells[y][x] = sceneId;
        });
      });
    }
  }
}
