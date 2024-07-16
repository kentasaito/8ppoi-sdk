import { QueueManager } from "./QueueManager.js";
import { SoundManager } from "./SoundManager.js";

export class Sound {
  queues;
  params;

  constructor(cache, loop) {
    this.queues = [];
    for (const tasks of cache) {
      const queue = QueueManager.createQueue(tasks, loop);
      this.queues.push(queue);
    }
    this.params = {
      paused: false,
    };
    Object.defineProperties(this, {
      paused: {
        get: () => this.params.paused,
        set: (value) => {
          this.queues.forEach((queue, channelId) => {
            if (value) {
              SoundManager.channels[channelId].stop();
            }
            queue.paused = value;
          });
          this.params.paused = value;
        },
      },
    });
  }

  onFrame() {
    return this.queues.map((queue) => queue.queueId).map((queueId) =>
      QueueManager.queues[queueId]
    ).filter((queue) => queue).length === 0;
  }
}
