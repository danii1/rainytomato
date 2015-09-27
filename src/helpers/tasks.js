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

export {TaskStatus, TaskType, TaskInterval};
