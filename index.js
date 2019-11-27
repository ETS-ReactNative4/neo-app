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
 * For MobX Support
 * fix based on https://github.com/facebook/react-native/issues/20150#issue-340235017
 * For permanent fix need RN 0.57.4 upgrade https://github.com/facebook/react-native/issues/20150#issuecomment-436320490
 */
// import applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
// import initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import { Platform } from "react-native";

// Object.assign(babelHelpers, {
//   applyDecoratedDescriptor,
//   initializerDefineProperty
// });

/**
 * Intl Polyfill for Android
 * fix based on https://github.com/facebook/react-native/issues/19410#issuecomment-434232762
 */
if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/en-IN");
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
