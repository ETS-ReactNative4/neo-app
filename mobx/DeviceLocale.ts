import { observable, action, computed } from "mobx";
import { getCountry } from "react-native-localize";
import { persist } from "mobx-persist";
import hydrate from "../Services/hydrate/hydrate";
import _ from "lodash";
import { logError } from "../Services/errorLogger/errorLogger";

class DeviceLocale {
  static hydrator = (storeInstance: DeviceLocale) => {
    hydrate("_deviceLocale", storeInstance)
      .then(() => null)
      .catch(err => {
        logError(err);
      });
  };

  @persist
  @observable
  _deviceLocale: string = _.toLower(getCountry());

  @computed get deviceLocale() {
    return this._deviceLocale;
  }

  @action updateDeviceLocale = (newLocale: string) => {
    this._deviceLocale = newLocale;
  };
}

export default DeviceLocale;
