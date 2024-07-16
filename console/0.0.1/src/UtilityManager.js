export class UtilityManager {
  static randomSeed;

  static setup() {
    this.randomSeed = 1;
  }

  static random() {
    this.randomSeed = this.randomSeed * 16807 % 2147483647;
    return this.randomSeed;
  }
}
