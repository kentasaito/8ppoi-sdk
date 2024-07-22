export class IndexState {
  static #score;
  static randomNumber;
  static playerGraphic;
  static bulletGraphic;
  static targetGraphic;
  static effectSound;

  static onPushState(Console) {
    this.#reset(Console);
  }

  static onPopState(Console) {
    this.#reset(Console);
  }

  static onFrame(Console) {
    this.#movePlayer(Console);
    this.#moveBullet(Console);
    if (Console.pads[0].b.justPressed) {
      this.#shotBullet(Console);
    }
    if (this.#moveTarget(Console));
  }

  static #reset(Console) {
    this.#score = 10;
    Console.deleteRandomNumber(this, ["randomNumber"]);
    this.randomNumber = Console.createRandomNumber(Date.now());
    this.#recreatePlayer(Console);
    Console.deleteGraphic(this, ["bulletGraphic"]);
    this.#recreateTarget(Console);
  }

  static #recreatePlayer(Console) {
    Console.deleteGraphic(this, ["playerGraphic"]);
    this.playerGraphic = Console.createGraphic("playerGraphic");
    this.playerGraphic.paletteName = "playerPalette";
    this.playerGraphic.x = 0;
    this.playerGraphic.y = 12;
  }

  static #recreateTarget(Console) {
    Console.deleteGraphic(this, ["targetGraphic"]);
    this.targetGraphic = Console.createGraphic("targetGraphic");
    this.targetGraphic.paletteName = "targetPalette";
    this.targetGraphic.x = 0;
    this.targetGraphic.y = 0;
  }

  static #movePlayer(Console) {
    if (Console.pads[0].right.justPressed && this.playerGraphic.x < 16) {
      this.playerGraphic.x += 4;
    }
    if (Console.pads[0].left.justPressed && this.playerGraphic.x > 0) {
      this.playerGraphic.x -= 4;
    }
  }

  static #moveBullet(Console) {
    if (this.bulletGraphic) {
      if (this.bulletGraphic.y === 0) {
        Console.deleteGraphic(this, ["bulletGraphic"]);
      } else {
        this.bulletGraphic.y--;
        this.#checkHit(Console);
      }
    }
  }

  static #shotBullet(Console) {
    if (!this.bulletGraphic) {
      this.bulletGraphic = Console.createGraphic("bulletGraphic");
      this.bulletGraphic.paletteName = "bulletPalette";
      this.bulletGraphic.x = this.playerGraphic.x;
      this.bulletGraphic.y = 12;
      this.#recreateEffectSound(Console, "shotSound");
      this.#checkHit(Console);
    }
  }

  static #moveTarget(Console) {
    if (this.randomNumber.next() % 100 < this.#score) {
      this.targetGraphic.y++;
      this.#checkHit(Console);
    }
    if (this.targetGraphic.y === 12) {
      this.#miss(Console);
    }
  }

  static #checkHit(Console) {
    if (
      this.bulletGraphic && this.bulletGraphic.x === this.targetGraphic.x &&
      this.bulletGraphic.y === this.targetGraphic.y
    ) {
      this.#hit(Console);
    }
  }

  static #hit(Console) {
    this.#score++;
    this.#recreateEffectSound(Console, "hitSound");
    Console.deleteGraphic(this, ["bulletGraphic"]);
    this.#recreateTarget(Console);
    this.targetGraphic.x = this.randomNumber.next() % 5 * 4;
  }

  static #miss(Console) {
    this.playerGraphic.cells[0][0] = 1;
    this.#recreateEffectSound(Console, "missSound");
    Console.pushState("ResultState", { score: this.#score });
  }

  static #recreateEffectSound(Console, soundName) {
    Console.deleteSound(this, ["effectSound"]);
    this.effectSound = Console.createSound(soundName);
  }
}
