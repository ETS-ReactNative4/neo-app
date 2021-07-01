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
      carrier: (await DeviceInfo.getCarrier()) || "",
      deviceId: DeviceInfo.getUniqueId() || "",
      deviceName: (await DeviceInfo.getDeviceName()) || "",
      deviceToken: storeService.appState.pushTokens.deviceToken || "",
      deviceType: DeviceInfo.getDeviceType() || "",
      installReferer: (await DeviceInfo.getInstallReferrer()) || "",
      lastUpdateTime: (await DeviceInfo.getLastUpdateTime()) || "",
      manufacturer: (await DeviceInfo.getManufacturer()) || "",
      model: DeviceInfo.getModel() || "",
      systemName: DeviceInfo.getSystemName() || ""
    };

    successCallback(deviceInfo);
  } catch (e) {
    logError(constants.getDeviceInfoError, { errorInfo: e });
    errorCallback();
  }
};
