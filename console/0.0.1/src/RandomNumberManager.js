import { RandomNumber } from "./RandomNumber.js";

export class RandomNumberManager {
  static createRandomNumber(seed) {
    return new RandomNumber(seed);
  }

  static deleteRandomNumber(obj, keys) {
    if (!obj) return;
    while (keys.length > 1) {
      obj = obj[keys.shift()];
      if (!obj) return;
    }
    delete obj[keys[0]];
  }
}
