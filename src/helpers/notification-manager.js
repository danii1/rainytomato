import { TaskType } from './tasks';
import icon from 'images/notification_icon.png';

export default class NotificationManager {
  static requestPermissions() {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  static showTaskNotification(taskType, voice = false) {
    if ('Notification' in window && Notification.permission === 'granted') {
      let notificationMessage;
      switch (taskType) {
        case TaskType.WORK:
          notificationMessage = 'Work session is finished, you can relax now!';
          break;
        default:
          notificationMessage = 'Break is over, now get back to work!';
      }

      new Notification('Rainy Tomato', {
        tag: 'tomatoNotification',
        body: notificationMessage,
        icon: icon
      });

      if (voice) {
        // TODO: speak notification message
      }
    }
  }
}
