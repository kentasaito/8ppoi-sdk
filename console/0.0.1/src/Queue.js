export class Queue {
  tasks;
  loop;
  paused;
  taskCounter;
  frameCounter;

  constructor(tasks, loop) {
    this.tasks = tasks;
    this.loop = loop;
    this.paused = false;
    this.taskCounter = 0;
    this.frameCounter = 0;
  }

  onFrame() {
    if (this.paused) return false;
    if (this.taskCounter === this.tasks.length) {
      if (this.loop) {
        this.taskCounter = 0;
        this.frameCounter = 0;
      } else {
        return true;
      }
    }
    if (this.frameCounter === 0) {
      this.tasks[this.taskCounter][0]();
      if (this.tasks[this.taskCounter][1] === 0) {
        this.taskCounter++;
        return this.onFrame();
      }
    }
    this.frameCounter++;
    if (this.frameCounter === this.tasks[this.taskCounter][1]) {
      this.taskCounter++;
      this.frameCounter = 0;
    }
    return false;
  }
}
