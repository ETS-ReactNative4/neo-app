import {AppRegistry} from 'react-native';
// import { Text, TextInput } from "react-native";
import App from './App';
import {onBackgroundNotificationReceived} from './Services/fcmService/fcm';
// import constants from "./constants/constants";

// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
// Text.defaultProps.style = {
//   fontFamily: constants.primaryRegular,
//   color: constants.black1
// };

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;
// TextInput.defaultProps.style = {
//   fontFamily: constants.primaryRegular,
//   color: constants.black1
// };
onBackgroundNotificationReceived();

AppRegistry.registerComponent('NEO', () => App);
