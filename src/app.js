import startRouter from './router';
import NotificationManager from './models/notification-manager';

startRouter();
NotificationManager.requestPermissions();
