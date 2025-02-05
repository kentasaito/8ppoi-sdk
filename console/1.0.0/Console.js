import { padConfig } from "./padConfig.js";
import { Pad } from "./Pad.js";
import { Graphic } from "./Graphic.js";

export class Console {
  static pads;
  static Graphic;
  static Cartridge;
  static _fps;
  static timeoutId;

  static onLoad(screen, Cartridge, fps) {
    this.pads = [
      new Pad(padConfig.pads[0]),
      new Pad(padConfig.pads[1]),
    ];
    this.Graphic = Graphic;
    this.Graphic.onLoad(screen);
    Object.defineProperty(this, "fps", {
      get: () => {
        return this._fps;
      },
      set: (v) => {
        clearTimeout(this.timeoutId);
        this._fps = v;
        this.onFrame();
      },
    });
    this._fps = fps;
    this.reset(Cartridge);
  }

  static onFrame() {
    this.Cartridge.onFrame();
    for (const pad of this.pads) {
      pad.onFrame();
    }
    if (this.fps <= 0) {
      return;
    }
    this.timeoutId = setTimeout(() => {
      this.onFrame();
    }, 1000 / this.fps);
  }

  static reset(Cartridge) {
    this.Graphic.reset();
    this.Cartridge = Cartridge;
    this.Cartridge.onLoad();
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.onFrame();
    }, 1000 / this.fps);
  }
}
