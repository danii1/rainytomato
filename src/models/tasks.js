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

// debug timer intervals
/*
const TaskInterval = {
  WORK: 3 * 1000,
  SHORT_BREAK: 1 * 1000,
  LONG_BREAK: 2 * 1000
};
*/

class BaseTask {
  constructor() {
    this.status = TaskStatus.STOPPED;
    this.startTime = null;
    this.stopTime = null;
  }
}

class WorkTask extends BaseTask {
  constructor(duration = TaskInterval.WORK) {
    super();
    this.type = TaskType.WORK;
    this.duration = duration;
  }
}

class ShortBreakTask extends BaseTask {
  constructor(duration = TaskInterval.SHORT_BREAK) {
    super();
    this.type = TaskType.SHORT_BREAK;
    this.duration = duration;
  }
}

class LongBreakTask extends BaseTask {
  constructor(duration = TaskInterval.LONG_BREAK) {
    super();
    this.type = TaskType.LONG_BREAK;
    this.duration = duration;
  }
}

class TaskBuilder {
  static build(taskType) {
    switch (taskType) {
      case TaskType.WORK:
        return new WorkTask();
      case TaskType.SHORT_BREAK:
        return new ShortBreakTask();
      case TaskType.LONG_BREAK:
        return new LongBreakTask();
      default:
        return null;
    }
  }
}


class TaskQueueBuilder {
  static build(setLength, shortBreakDuration, longBreakDuration) {
    if (typeof setLength !== 'number') {
      throw new TypeError(`setLength parameter should be number, got ${setLength} instead`);
    }

    if (setLength < 1) {
      throw new RangeError(`setLength parameter should be positive number, got ${setLength} instead`);
    }

    let queue = [];

    for (var i = 0; i < setLength; i++) {
      queue.push(new WorkTask());

      if (i === setLength - 1) {
        queue.push(new LongBreakTask(longBreakDuration));
      } else {
        queue.push(new ShortBreakTask(shortBreakDuration));
      }
    }

    return queue;
  }
}

export {TaskStatus, TaskType, TaskInterval,
  WorkTask, ShortBreakTask, LongBreakTask,
  TaskQueueBuilder, TaskBuilder};
