import { TaskQueueBuilder, TaskType } from 'models/tasks';

describe('TaskQueueBuilder', () => {
  describe('build', () => {
    it('should throw error if setLength is not number', () => {
      expect(
        () => TaskQueueBuilder.build(null)
      ).toThrowError(TypeError);
    });

    it('should throw error if setLength is less than 1', () => {
      expect(
        () => TaskQueueBuilder.build(0)
      ).toThrowError(RangeError);
    });

    it('should return task queue with proper length', () => {
      let setLength = 1;
      let queue = TaskQueueBuilder.build(setLength);
      expect(queue.length).toEqual(setLength * 2);
    });

    it('should return task queue with first work task', () => {
      let queue = TaskQueueBuilder.build(1);
      let firstTask = queue[0];
      expect(firstTask.type).toEqual(TaskType.WORK);
    });

    it('should return task queue with last \"long break\" task', () => {
      let queue = TaskQueueBuilder.build(1);
      let lastTask = queue[queue.length-1];
      expect(lastTask.type).toEqual(TaskType.LONG_BREAK);
    });

    it('should return task queue with correct number of work and break tasks', () => {
      const classicPomodoroSet = 4;
      let queue = TaskQueueBuilder.build(classicPomodoroSet);

      let numberOfWorkTasks = queue.filter( (currentTask) =>
        { return currentTask.type === TaskType.WORK }
      ).length;

      let numberOfShortBreakTasks = queue.filter( (currentTask) =>
        { return currentTask.type === TaskType.SHORT_BREAK }
      ).length;

      let numberOfLongBreakTasks = queue.filter( (currentTask) =>
        { return currentTask.type === TaskType.LONG_BREAK }
      ).length;

      expect(queue.length).toEqual(8);
      expect(numberOfWorkTasks).toEqual(4);
      expect(numberOfShortBreakTasks).toEqual(3);
      expect(numberOfLongBreakTasks).toEqual(1);
    });

  });
});
