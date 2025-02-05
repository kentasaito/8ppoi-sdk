export class Graphic {
  static screen;
  element;

  static onLoad(screen) {
    this.screen = screen;
    Object.defineProperty(Graphic, "scale", {
      get: () => {
        return this.screen.style.scale;
      },
      set: (v) => {
        this.screen.style.scale = parseInt(v);
        this.screen.style.width = `${320 / v}px`;
        this.screen.style.height = `${240 / v}px`;
      },
    });
    this.scale = 1;
  }

  static reset() {
    this.scale = 1;
    this.screen.innerHTML = "";
  }

  constructor() {
    Object.defineProperty(this, "text", {
      get: () => {
        return this.element.innerText;
      },
      set: (v) => {
        this.element.innerText = v;
      },
    });
    Object.defineProperty(this, "hidden", {
      get: () => {
        return this.element.style.visibility === "hidden";
      },
      set: (v) => {
        this.element.style.visibility = v ? "hidden" : "visible";
      },
    });
    Object.defineProperty(this, "x", {
      get: () => {
        return parseInt(this.element.style.left);
      },
      set: (v) => {
        this.element.style.left = `${parseInt(v)}px`;
      },
    });
    Object.defineProperty(this, "y", {
      get: () => {
        return parseInt(this.element.style.top);
      },
      set: (v) => {
        this.element.style.top = `${parseInt(v)}px`;
      },
    });
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    Graphic.screen.append(this.element);
    this.text = "";
    this.hidden = false;
    this.x = 0;
    this.y = 0;
  }

  remove() {
    this.element.remove();
  }
}
