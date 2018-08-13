import { Linking, Platform, PermissionsAndroid } from "react-native";
import { logError } from "../errorLogger/errorLogger";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";

const getDeviceLocation = async (success, failure) => {
  const getGeoLocation = () => {
    navigator.geolocation.watchPosition(success, locationFailed);
  };

  const locationFailed = locationError => {
    if (Platform.OS === "ios") {
      if (locationError.code === 1) {
        DebouncedAlert(
          "Unable to get Device location",
          "Your device location is used to find places near you. Open Settings to enable location permissions for pickyourtrail app.",
          [
            {
              text: "Open Settings",
              style: "cancel",
              onPress: () => {
                Linking.canOpenURL("app-settings:")
                  .then(supported => {
                    if (!supported) {
                      failure(locationError);
                    } else {
                      return Linking.openURL("app-settings:");
                    }
                  })
                  .catch(settingsErr => {
                    logError(settingsErr);
                    failure(locationError);
                  });
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
      }
    } else {
      failure(locationError);
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
