export class InputKey {
  static pads;

  static setup(config) {
    this.pads = [];
    config.pads.forEach((pad, padId) => {
      this.pads[padId] = {};
      for (const buttonName in pad) {
        this.pads[padId][buttonName] = {
          pressed: false,
        };
      }
    });
    document.getElementById("ui").onkeydown = (e) => {
      config.pads.forEach((pad, padId) => {
        for (const buttonName in pad) {
          if (e.key === pad[buttonName].key) {
            e.preventDefault();
            this.pads[padId][buttonName].pressed = true;
          }
        }
      });
    };
    document.getElementById("ui").onkeyup = (e) => {
      config.pads.forEach((pad, padId) => {
        for (const buttonName in pad) {
          if (e.key === pad[buttonName].key) {
            e.preventDefault();
            this.pads[padId][buttonName].pressed = false;
          }
        }
      });
    };
  }
}
