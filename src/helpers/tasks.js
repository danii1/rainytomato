const TaskStatus = {
  RUNNING: 'running',
  STOPPED: 'stopped'
};

const TaskType = {
  WORK: 'work',
  LONG_BREAK: 'longBreak',
  SHORT_BREAK: 'shortBreak'
};

const TaskInterval = {
  WORK: 25 * 60 * 1000,
  SHORT_BREAK: 5 * 60 * 1000,
  LONG_BREAK: 15 * 60 * 1000
};

class TaskQueueBuilder {
  static build(setLength) {
    if (typeof setLength !== 'number') {
      throw new TypeError(`setLength parameter should be number, got ${setLength} instead`);
    }

    if (setLength < 1) {
      throw new RangeError(`setLength parameter should be positive number, got ${setLength} instead`);
    }

    let queue = [];
    
    for (var i = 0; i < setLength; i++) {
      queue.push({
        type: TaskType.WORK,
        status: TaskStatus.STOPPED,
        startTime: null,
        stopTime: null
      });

      if (i === setLength - 1) {
        queue.push({
          type: TaskType.LONG_BREAK,
          status: TaskStatus.STOPPED,
          startTime: null,
          stopTime: null
        });
      } else {
        queue.push({
          type: TaskType.SHORT_BREAK,
          status: TaskStatus.STOPPED,
          startTime: null,
          stopTime: null
        });
      }

    }

    return queue;
  }
}

export {TaskStatus, TaskType, TaskInterval, TaskQueueBuilder};
