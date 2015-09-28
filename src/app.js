import startRouter from './router';
import NotificationManager from './helpers/notification-manager';
startRouter();

NotificationManager.requestPermissions();
