import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import storeService from "../storeService/storeService";
import constants from "../../constants/constants";

export const readDeviceInfo = async (callback = () => null) => {
  const deviceInfo = {
    buildNumber: DeviceInfo.getBuildNumber(),
    versionNumber: DeviceInfo.getVersion(),
    carrier: DeviceInfo.getCarrier(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceName: DeviceInfo.getDeviceName(),
    deviceToken: storeService.appState.pushTokens.deviceToken,
    deviceType: DeviceInfo.getDeviceType(),
    installReferer: DeviceInfo.getInstallReferrer(),
    lastUpdateTime: DeviceInfo.getLastUpdateTime(),
    manufacturer: DeviceInfo.getManufacturer(),
    model: DeviceInfo.getModel(),
    systemName: DeviceInfo.getSystemName()
  };

  if (Platform.OS === constants.platformAndroid) {
    deviceInfo.isAutoTimeZone = await DeviceInfo.isAutoTimeZone();
  }

  callback(deviceInfo);
};
