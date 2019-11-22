import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import requestPermission from "../requestPermission/requestPermission";
import constants from "../../constants/constants";

const { PERMISSIONS } = Platform.select({
  android: () => require("react-native-permissions"),
  ios: () => {
    return {};
  }
})();

const getDeviceLocation = async (
  success = () => null,
  failure = () => null,
  settings = () => null
) => {
  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(success, failure, {
      enableHighAccuracy: true,
      timeout: 5000
    });
  };

  if (Platform.OS === constants.platformAndroid) {
    requestPermission({
      permissionType:
        Platform.OS === constants.platformIos
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      requestError: failure,
      featureUnavailable: failure,
      permissionBlocked: failure,
      permissionGranted: getGeoLocation
    });
  } else {
    /**
     * TODO: Requesting location permission on iOS currently causes issues in React native
     * https://github.com/react-native-community/react-native-permissions/issues/346
     */
    getGeoLocation();
  }
};

export default getDeviceLocation;
