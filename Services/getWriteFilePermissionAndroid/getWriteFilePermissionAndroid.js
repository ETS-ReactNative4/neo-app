import { logError } from "../errorLogger/errorLogger";
import { PermissionsAndroid } from "react-native";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import OpenAppSettingsAndroid from "react-native-app-settings";
import constants from "../../constants/constants";

/**
 * Used to get write access permission of system directory in Android
 */
const getWriteFilePermissionAndroid = async (
  success,
  failure,
  settings,
  permissionInfo = constants.permissionsInfoText.writeFile
) => {
  const permissionFailed = () => {
    openAppSettings();
  };

  const openAppSettings = fileAccessError => {
    DebouncedAlert("Unable to create file in your device", permissionInfo, [
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
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      // {
      //   title: "Pickyourtrail needs to crop and save images in your device",
      //   message: `This will help you crop images before you add them to your journal`,
      //   buttonNeutral: "Ask Me Later",
      //   buttonNegative: "Cancel",
      //   buttonPositive: "OK"
      // }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      success();
    } else {
      permissionFailed();
    }
  } catch (androidPermissionErr) {
    logError(androidPermissionErr);
    permissionFailed();
  }
};

export default getWriteFilePermissionAndroid;
