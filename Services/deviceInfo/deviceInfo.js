import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import storeService from "../storeService/storeService";
import constants from "../../constants/constants";
import { logError } from "../errorLogger/errorLogger";

export const readDeviceInfo = async (
  successCallback = () => null,
  errorCallback = () => null
) => {
  try {
    const deviceInfo = {
      buildNumber: DeviceInfo.getBuildNumber() || "",
      versionNumber: DeviceInfo.getVersion() || "",
      carrier: DeviceInfo.getCarrier() || "",
      deviceId: DeviceInfo.getUniqueID() || "",
      deviceName: DeviceInfo.getDeviceName() || "",
      deviceToken: storeService.appState.pushTokens.deviceToken || "",
      deviceType: DeviceInfo.getDeviceType() || "",
      installReferer: DeviceInfo.getInstallReferrer() || "",
      lastUpdateTime: DeviceInfo.getLastUpdateTime() || "",
      manufacturer: DeviceInfo.getManufacturer() || "",
      model: DeviceInfo.getModel() || "",
      systemName: DeviceInfo.getSystemName() || ""
    };

    try {
      if (Platform.OS === constants.platformAndroid) {
        deviceInfo.isAutoTimeZone = await DeviceInfo.isAutoTimeZone();
      }
    } catch (e) {
      logError(constants.getAutoTimeZoneError, { errorInfo: e });
    }

    successCallback(deviceInfo);
  } catch (e) {
    logError(constants.getDeviceInfoError, { errorInfo: e });
    errorCallback();
  }
};
