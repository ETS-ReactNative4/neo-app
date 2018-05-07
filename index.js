import { AppRegistry } from "react-native";
import App from "./App";

/**
 * TODO: Find a way to overcome this warning
 */
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

AppRegistry.registerComponent("Pickyourtrail", () => App);
