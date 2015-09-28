import { TaskType } from './tasks';

export default class NotificationManager {
  static requestPermissions() {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  static showTaskNotification(taskType) {
    if ('Notification' in window && Notification.permission === 'granted') {
      let notificationMessage;
      switch (taskType) {
        case TaskType.WORK:
          notificationMessage = 'Work session finished, relax!';
          break;
        default:
          notificationMessage = 'Break finished, now get back to work!';
      }
      // TODO: add sound and icon to Notification
      new Notification(notificationMessage);
    }
  }
}
