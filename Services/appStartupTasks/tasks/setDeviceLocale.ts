import { CONSTANT_productUrl } from "../../../constants/serverUrls";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";
import storeService from "../../storeService/storeService";

const setDeviceLocale = async () => {
  const response = await fetch(`${CONSTANT_productUrl}locale`);
  if (response.status === 200) {
    const result: IMobileServerResponse = await response.json();
    if (result.status === "SUCCESS") {
      storeService.deviceLocaleStore.updateDeviceLocale(
        result.data?.locale ?? "in"
      );
    } else {
      // failed again... No-op needed system will fallback
    }
  } else {
    // failed to load locale... No-op needed system will fallback
  }
};

export default setDeviceLocale;
