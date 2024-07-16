import { SoundManager } from "./SoundManager.js";

export class SoundChannel {
  gainNode;
  oscillatorNode;

  constructor() {
    this.gainNode = SoundManager.audioContext.createGain();
    this.gainNode.connect(SoundManager.masterGainNode);
  }

  start(frequency) {
    if (!this.oscillatorNode) {
      this.oscillatorNode = SoundManager.audioContext.createOscillator();
      this.oscillatorNode.type = "square";
      this.oscillatorNode.connect(this.gainNode);
      this.oscillatorNode.start();
    }
    this.oscillatorNode.frequency.value = frequency;
  }

  stop() {
    if (this.oscillatorNode) {
      this.oscillatorNode.stop();
      delete this.oscillatorNode;
    }
  }
}
