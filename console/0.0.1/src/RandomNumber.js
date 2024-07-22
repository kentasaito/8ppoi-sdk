export class RandomNumber {
  static seed;

  constructor(seed = 1) {
    this.seed = seed;
  }

  next() {
    this.seed = this.seed * 16807 % 2147483647;
    return this.seed;
  }
}
