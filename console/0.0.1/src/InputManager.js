import { InputGamepad } from "./InputGamepad.js";
import { InputTouch } from "./InputTouch.js";
import { InputKey } from "./InputKey.js";

export class InputManager {
  static pads;

  static setup(config) {
    this.pads = [];
    config.pads.forEach((pad, padId) => {
      this.pads[padId] = {};
      for (const buttonName in pad) {
        this.pads[padId][buttonName] = {
          justPressed: false,
          justReleased: false,
          last: false,
        };
      }
    });
    InputGamepad.setup(config);
    if ("ontouchstart" in globalThis) {
      InputTouch.setup(config);
    }
    if ("onkeydown" in globalThis) {
      InputKey.setup(config);
    }
  }

  static onFrame() {
    this.pads.forEach((pad, padId) => {
      for (const buttonName in pad) {
        pad[buttonName].pressed = InputGamepad.getPressed(padId, buttonName) ||
          InputTouch.getPressed(padId, buttonName) ||
          InputKey.pads[padId][buttonName].pressed;
        pad[buttonName].justPressed = !pad[buttonName].last &&
          pad[buttonName].pressed;
        pad[buttonName].justReleased = pad[buttonName].last &&
          !pad[buttonName].pressed;
        pad[buttonName].last = pad[buttonName].pressed;
      }
    });
  }
}
