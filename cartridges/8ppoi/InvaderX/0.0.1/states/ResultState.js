export class ResultState {
  static resultGraphic;

  static onPushState(Console, params) {
    this.resultGraphic = Console.createGraphic(
      "fontGraphic",
      "" + params.score,
    );
    this.resultGraphic.x = 2;
    this.resultGraphic.y = 4;
  }

  static onFrame(Console) {
    if (Console.pads[0].a.justPressed) {
      Console.deleteGraphic(this, ["resultGraphic"]);
      Console.popState();
    }
  }
}
