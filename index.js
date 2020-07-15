import { Platform } from "react-native";

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
 * Core-JS polyfill for android
 * addresses https://github.com/facebook/immutable-js/issues/1305 that only happens in dev mode of Android
 * added resolutions in package.json based on https://github.com/zloirock/core-js/issues/368#issuecomment-376586585
 */
if (Platform.OS === "android" && __DEV__) {
  require("core-js");
}

/**
 * Intl Polyfill for Android
 * fix based on https://github.com/facebook/react-native/issues/19410#issuecomment-434232762
 */
if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/en-IN");
  require("intl/locale-data/jsonp/chr-US");
  require("intl/locale-data/jsonp/es-US");
  require("intl/locale-data/jsonp/en-US");
  require("intl/locale-data/jsonp/haw-US");
  require("intl/locale-data/jsonp/lkt-US");
  require("intl/locale-data/jsonp/en-GB");
  require("intl/locale-data/jsonp/cy-GB");
  require("intl/locale-data/jsonp/gd-GB");
  require("intl/locale-data/jsonp/kw-GB");
  require("intl/locale-data/jsonp/ar-AE");
  require("intl/locale-data/jsonp/en-SG");
  require("intl/locale-data/jsonp/ms-SG");
  require("intl/locale-data/jsonp/ta-SG");
  require("intl/locale-data/jsonp/zh-Hans-SG");
}

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
