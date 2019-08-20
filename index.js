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

require("./app-index");
