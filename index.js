/**
 * This is a fix for issue in storybook which removes finally from promises
 * based on - https://github.com/storybookjs/react-native/issues/20#issuecomment-542283774
 */
global.promiseFinallyFn = Promise.prototype.finally;

/**
 * TODO: Temporary fix for Android gesture crash
 *
 * Based on solution: https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
 * Must be removed once the issue is fixed
 */
import "react-native-gesture-handler";

/**
 * This config with enable push notifications for freshchat react native sdk on Android
 *
 * Currently disabled since freshchat only supports one device for push notifications at a time
 */
// import {
//   FreshchatNotificationConfig,
//   Freshchat
// } from "react-native-freshchat-sdk";

// const freshchatNotificationConfig = new FreshchatNotificationConfig();
// freshchatNotificationConfig.priority =
//   FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH;
// freshchatNotificationConfig.notificationSoundEnabled = true;
// Freshchat.setNotificationConfig(freshchatNotificationConfig);

require("./app-index");
