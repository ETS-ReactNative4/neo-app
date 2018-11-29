import { Linking, Platform, PermissionsAndroid } from "react-native";
import { logError } from "../errorLogger/errorLogger";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import OpenAppSettingsAndroid from "react-native-app-settings";

const getDeviceLocation = async (success, failure, settings = () => null) => {
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(success, locationFailed);
  };

  const openAppSettings = locationError => {
    DebouncedAlert(
      "Unable to get Device location",
      "Your device location is used to find places near you. Open Settings to enable location permissions for pickyourtrail app.",
      [
        {
          text: "Open Settings",
          style: "cancel",
          onPress: () => {
            if (Platform.OS === "ios") {
              Linking.canOpenURL("app-settings:")
                .then(supported => {
                  if (!supported) {
                    failure(locationError);
                  } else {
                    settings();
                    return Linking.openURL("app-settings:");
                  }
                })
                .catch(settingsErr => {
                  logError(settingsErr);
                  failure(locationError);
                });
            } else {
              OpenAppSettingsAndroid.open();
            }
          }
        },
        {
          text: "Cancel",
          onPress: () => {
            failure(locationError);
          }
        }
      ]
    );
  };

  const locationFailed = locationError => {
    if (Platform.OS === "ios") {
      if (locationError.code === 1) {
        openAppSettings(locationError);
      }
    } else {
      openAppSettings(locationError);
    }
  };

  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Pickyourtrail needs to know your location",
          message: `Your current location is used to find places near you.`
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getGeoLocation();
      } else {
        locationFailed();
      }
    } catch (androidPermissionErr) {
      logError(androidPermissionErr);
      locationFailed();
    }
  } else {
    getGeoLocation();
  }
};

export default getDeviceLocation;
