export class InputGamepad {
  static config;

  static setup(config) {
    this.config = config;
  }

  static getPressed(padId, buttonId) {
    return this.config.pads[padId][buttonId].axis
      ? (navigator.getGamepads()[padId]
        ? navigator.getGamepads()[padId]
          .axes[this.config.pads[padId][buttonId].axis[0]] ===
          this.config.pads[padId][buttonId].axis[1]
        : false)
      : (navigator.getGamepads()[padId]
        ?.buttons[this.config.pads[padId][buttonId].button].pressed ??
        false);
  }
}
