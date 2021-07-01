import { Linking, Platform } from "react-native";
import { logError } from "../errorLogger/errorLogger";
import OpenAppSettingsAndroid from "react-native-app-settings";
import constants from "../../constants/constants";

const openAppSettings = () => {
  if (Platform.OS === constants.platformIos) {
    Linking.canOpenURL("app-settings:")
      .then(supported => {
        if (!supported) {
          logError("Error opening App Settings");
        } else {
          return Linking.openURL("app-settings:");
        }
      })
      .catch(settingsErr => {
        logError(settingsErr);
      });
  } else {
    OpenAppSettingsAndroid.open();
  }
};

export default openAppSettings;
