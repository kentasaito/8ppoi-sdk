export { Console } from "./deps.js";

export class Cartridge {
  static limit;
  static score;
  static player;
  static bullet;
  static target;
  static result;

  static onLoad() {
    Console.Graphic.scale = 8;
    this.limit = {
      left: 0,
      right: Math.floor(320 / Console.Graphic.scale / 8) * 8 - 8,
      top: 0,
      bottom: Math.floor(240 / Console.Graphic.scale) - 8,
    };
    this.player = new Console.Graphic();
    this.player.text = "^";
    this.bullet = new Console.Graphic();
    this.bullet.text = ".";
    this.target = new Console.Graphic();
    this.target.text = "*";
    this.result = new Console.Graphic();
    this.result.x = (this.limit.right - this.limit.left) / 2 - 4;
    this.result.y = (this.limit.bottom - this.limit.top) / 2;
    this.restart();
  }

  static onFrame() {
    if (this.result.hidden) {
      if (
        Console.pads[0].buttons.left.justPressed &&
        this.player.x > this.limit.left
      ) {
        this.player.x -= 8;
      }
      if (
        Console.pads[0].buttons.right.justPressed &&
        this.player.x < this.limit.right
      ) {
        this.player.x += 8;
      }
      if (!this.bullet.hidden) {
        this.moveBullet();
      }
      if (this.bullet.hidden && Console.pads[0].buttons.b.justPressed) {
        this.shot();
      }
      if (Math.random() * 100 < this.score) {
        this.target.y += 2;
      }
      if (!this.bullet.hidden) {
        this.checkHit();
      }
      if (this.target.y === this.limit.bottom) {
        this.defeated();
      }
    } else {
      if (Console.pads[0].buttons.a.justPressed) {
        this.restart();
      }
    }
  }

  static restart() {
    this.score = 10;
    this.player.x = this.limit.left;
    this.player.y = this.limit.bottom;
    this.bullet.hidden = true;
    this.target.x = this.limit.left;
    this.target.y = this.limit.top;
    this.result.hidden = true;
  }

  static shot() {
    this.bullet.hidden = false;
    this.bullet.x = this.player.x;
    this.bullet.y = this.player.y - 8;
  }

  static moveBullet() {
    this.bullet.y -= 2;
    if (this.bullet.y <= this.limit.top - 8) {
      this.bullet.hidden = true;
    }
  }

  static checkHit() {
    if (this.bullet.x === this.target.x && this.bullet.y <= this.target.y) {
      this.hit();
    }
  }

  static hit() {
    this.score++;
    this.bullet.hidden = true;
    this.target.x = Math.floor(Math.random() * (this.limit.right / 8)) * 8;
    this.target.y = this.limit.top;
  }

  static defeated() {
    this.result.text = this.score;
    this.result.hidden = false;
  }
}
