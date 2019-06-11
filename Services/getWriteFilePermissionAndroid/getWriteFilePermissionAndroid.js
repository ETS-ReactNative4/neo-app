import { logError } from "../errorLogger/errorLogger";
import { PermissionsAndroid } from "react-native";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import OpenAppSettingsAndroid from "react-native-app-settings";

const getWriteFilePermissionAndroid = async (success, failure, settings) => {
  const permissionFailed = () => {
    openAppSettings();
  };

  const openAppSettings = fileAccessError => {
    DebouncedAlert(
      "Unable to create file in your device",
      "This permission is needed to crop images before you add them to your journal",
      [
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
      ]
    );
  };

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Pickyourtrail needs to crop and save images in your device",
        message: `This will help you crop images before you add them to your journal`
      }
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
