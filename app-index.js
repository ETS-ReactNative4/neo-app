import { AppRegistry } from "react-native";
import { Text, TextInput } from "react-native";
import App from "./App";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent("Pickyourtrail", () => App);
