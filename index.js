import applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import { Platform } from "react-native";

Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty
});

/**
 * Intl Polyfill for Android
 */
if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/en-IN");
}

require("./app-index");
