import { uiConfig } from "../uiConfig.js";
import { inputConfig } from "../inputConfig.js";
import { RandomNumberManager } from "./RandomNumberManager.js";
import { UiManager } from "./UiManager.js";
import { InputManager } from "./InputManager.js";
import { GraphicManager } from "./GraphicManager.js";
import { QueueManager } from "./QueueManager.js";
import { SoundManager } from "./SoundManager.js";
import { StateManager } from "./StateManager.js";

export class Console {
  static setup(cartridge, deps) {
    this.createRandomNumber = (seed) => RandomNumberManager.createRandomNumber(seed);
    this.deleteRandomNumber = (obj, keys) => RandomNumberManager.deleteRandomNumber(obj, keys);

    UiManager.setup({
      screen: Object.assign(uiConfig.screen, cartridge.uiConfig.screen),
    });

    InputManager.setup(Object.assign(inputConfig, cartridge.inputConfig));
    this.pads = InputManager.pads;

    GraphicManager.setup(Object.assign(deps.graphics, cartridge.graphics));
    this.createGraphic = (graphicName, cells) =>
      GraphicManager.createGraphic(graphicName, cells);
    this.deleteGraphic = (obj, keys) => GraphicManager.deleteGraphic(obj, keys);

    QueueManager.setup();
    this.createQueue = (tasks, loop) => QueueManager.createQueue(tasks, loop);
    this.deleteQueue = (obj, keys) => QueueManager.deleteQueue(obj, keys);

    SoundManager.setup(cartridge.sounds);
    this.createSound = (soundName, loop) =>
      SoundManager.createSound(soundName, loop);
    this.deleteSound = (obj, keys) => SoundManager.deleteSound(obj, keys);

    StateManager.setup(cartridge.states);
    this.pushState = (stateName, params) =>
      StateManager.pushState(stateName, params);
    this.popState = (params) => StateManager.popState(params);
  }

  static run() {
    SoundManager.run();
    this.pushState("IndexState");
    QueueManager.onFrame();
    SoundManager.onFrame();
    setInterval(() => this.onFrame(), 1000 / 60);
  }

  static onFrame() {
    InputManager.onFrame();
    StateManager.onFrame();
    QueueManager.onFrame();
    SoundManager.onFrame();
  }
}
