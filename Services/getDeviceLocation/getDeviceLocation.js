import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import requestPermission from "../requestPermission/requestPermission";
import constants from "../../constants/constants";
import { PERMISSIONS } from "react-native-permissions";

const getDeviceLocation = async (
  success = () => null,
  failure = () => null
) => {
  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(success, failure, {
      enableHighAccuracy: true,
      timeout: 5000
    });
  };

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
};

export default getDeviceLocation;
