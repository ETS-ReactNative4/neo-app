import { logError } from "../errorLogger/errorLogger";
import { PermissionsAndroid } from "react-native";

const getSmsPermissionAndroid = async (success, failure) => {
  const permissionFailed = () => failure();

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: "Pickyourtrail needs detect OTP message",
        message: `We need your permission to read incoming messages to pre-fill OTP.`
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

export default getSmsPermissionAndroid;
