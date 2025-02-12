export class Queue {
  static queues;
  ended;
  tasks;
  i;
  counter;

  static onFrame() {
    for (const q in this.queues) {
      const queue = this.queues[q];
      queue.counter++;
      queue.tick(q);
    }
  }

  static onPostFrame() {
    for (const q in this.queues) {
      const queue = this.queues[q];
      if (queue.tasks.length > 0 && queue.i === 0 && queue.counter === 0) {
        queue.tasks[queue.i].callback();
        if (queue.tasks[queue.i].delay === 0) {
          queue.tick(q);
        }
      }
    }
  }

  static reset() {
    for (const q in this.queues) {
      delete this.queues[q];
    }
    this.queues = [];
  }

  constructor() {
    this.ended = false;
    this.tasks = [];
    this.i = 0;
    this.counter = 0;
    Queue.queues.push(this);
  }

  push(callback, delay) {
    this.tasks.push({ callback, delay });
  }

  remove() {
    for (const q in Queue.queues) {
      if (Queue.queues[q] === this) {
        delete Queue.queues[q];
      }
    }
  }

  tick(q) {
    if (this.tasks.length > 0 && this.counter === this.tasks[this.i].delay) {
      this.i++;
      this.counter = 0;
      if (this.i === this.tasks.length) {
        this.ended = true;
        delete Queue.queues[q];
      } else {
        this.tasks[this.i].callback();
        this.tick(q);
      }
    }
  }
}
