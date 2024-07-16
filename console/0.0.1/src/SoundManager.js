import { QueueManager } from "./QueueManager.js";
import { Sound } from "./Sound.js";
import { SoundChannel } from "./SoundChannel.js";

export class SoundManager {
  static caches;
  static sounds;
  static audioContext;
  static masterGainNode;
  static channels;

  static setup(sounds) {
    this.caches = this.renderCaches(sounds);
    this.sounds = [];
  }

  static renderCaches(sounds) {
    const caches = {};
    for (const soundName in sounds) {
      caches[soundName] = [];
      sounds[soundName].forEach((tasks, channelId) => {
        let params = {
          baseFrequency: 440,
          noteNumberOffset: 0,
          baseFrameCount: 128,
        };
        caches[soundName][channelId] = [];
        for (const _task of tasks) {
          if (Array.isArray(_task)) {
            const task = [];
            if (typeof _task[0] === "number") {
              task[0] = () =>
                this.channels[channelId].start(
                  params.baseFrequency *
                    2 ** ((params.noteNumberOffset + _task[0]) / 12),
                );
            } else {
              task[0] = () => this.channels[channelId].stop();
            }
            task[1] = params.baseFrameCount / _task[1];
            caches[soundName][channelId].push(task);
          } else {
            params = Object.assign(params, _task.render);
          }
        }
      });
    }
    return caches;
  }

  static run() {
    this.audioContext = new AudioContext();
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.gain.value = 1 / 8;
    this.masterGainNode.connect(this.audioContext.destination);
    this.channels = [
      new SoundChannel(),
    ];
  }

  static onFrame() {
    this.sounds.forEach((sound, soundId) => {
      if (sound.onFrame()) {
        delete this.sounds[soundId];
      }
    });
  }

  static createSound(soundName, loop = false) {
    const sound = new Sound(this.caches[soundName], loop);
    sound.soundId = this.sounds.length;
    this.sounds.push(sound);
    return sound;
  }

  static deleteSound(obj, keys) {
    if (!obj) return;
    while (keys.length > 1) {
      obj = obj[keys.shift()];
      if (!obj) return;
    }
    if (!obj[keys[0]]) return;
    for (const channelId in this.sounds[obj[keys[0]].soundId].queues) {
      this.channels[channelId].stop();
      QueueManager.deleteQueue(this.sounds[obj[keys[0]].soundId].queues, [
        channelId,
      ]);
    }
    delete this.sounds[obj[keys[0]].soundId];
    delete obj[keys[0]];
  }
}
