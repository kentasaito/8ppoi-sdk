import { Console } from "./Console.js";

export class StateManager {
  static states;
  static stack;

  static setup(states) {
    this.states = states;
    this.stack = [];
  }

  static onFrame() {
    this.stack.slice(-1)[0].onFrame?.(Console);
  }

  static pushState(stateName, params) {
    this.stack.push(this.states[stateName]);
    this.stack.slice(-1)[0].onPushState?.(Console, params);
  }

  static popState(params) {
    this.stack.pop();
    this.stack.slice(-1)[0].onPopState?.(Console, params);
  }
}
