import { logError } from "../errorLogger/errorLogger";
import { PermissionsAndroid } from "react-native";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import OpenAppSettingsAndroid from "react-native-app-settings";
import constants from "../../constants/constants";

/**
 * Used to get read files permission of system directory in Android
 */
const getReadFilePermissionAndroid = async (
  success,
  failure,
  settings,
  permissionInfo = constants.permissionsInfoText.readFile
) => {
  const permissionFailed = () => {
    openAppSettings();
  };

  const openAppSettings = fileAccessError => {
    DebouncedAlert("Unable to access device files", permissionInfo, [
      {
        text: "Open Settings",
        style: "cancel",
        onPress: () => {
          settings();
          OpenAppSettingsAndroid.open();
        }
      },
      {
        text: "Cancel",
        onPress: () => {
          failure(fileAccessError);
        }
      }
    ]);
  };

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      // {
      //   title: "Pickyourtrail needs to access your images",
      //   message: `We need your permission to add images from your device to the journal`,
      //   buttonNeutral: "Ask Me Later",
      //   buttonNegative: "Cancel",
      //   buttonPositive: "OK"
      // }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      success();
    } else {
      failure();
      permissionFailed();
    }
  } catch (androidPermissionErr) {
    logError(androidPermissionErr);
    permissionFailed();
  }
};

export default getReadFilePermissionAndroid;
