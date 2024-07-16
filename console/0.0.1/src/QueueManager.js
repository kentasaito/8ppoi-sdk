import { Queue } from "./Queue.js";

export class QueueManager {
  static queues;

  static setup() {
    this.queues = [];
  }

  static onFrame() {
    this.queues.forEach((queue, queueId) => {
      if (queue.onFrame()) {
        delete this.queues[queueId];
      }
    });
  }

  static createQueue(tasks, loop = false) {
    const queue = new Queue(tasks, loop);
    queue.queueId = this.queues.length;
    this.queues.push(queue);
    return queue;
  }

  static deleteQueue(obj, keys) {
    if (!obj) return;
    while (keys.length > 1) {
      obj = obj[keys.shift()];
      if (!obj) return;
    }
    delete this.queues[obj[keys[0]].queueId];
    delete obj[keys[0]];
  }
}
