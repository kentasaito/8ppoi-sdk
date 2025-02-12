export class Pad {
  buttons;

  constructor(config) {
    this.buttons = {};
    for (const k in config.buttons) {
      this.buttons[k] = {
        justPressed: false,
        pressed: false,
        justReleased: false,
      };
    }
    document.addEventListener("keydown", (e) => {
      for (const k in config.buttons) {
        if (this.buttons[k].pressed === false && e.key === config.buttons[k]) {
          this.buttons[k].justPressed = true;
          this.buttons[k].pressed = true;
        }
      }
    });
    document.addEventListener("keyup", (e) => {
      for (const k in config.buttons) {
        if (this.buttons[k].pressed === true && e.key === config.buttons[k]) {
          this.buttons[k].pressed = false;
          this.buttons[k].justReleased = true;
        }
      }
    });
  }

  onFrame() {
    for (const k in this.buttons) {
      this.buttons[k].justPressed = false;
      this.buttons[k].justReleased = false;
    }
  }
}
