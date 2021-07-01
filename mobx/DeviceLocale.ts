import { observable, action, computed } from "mobx";
import { getCountry } from "react-native-localize";
import { persist } from "mobx-persist";
import hydrate from "../Services/hydrate/hydrate";
import _ from "lodash";
import { logError } from "../Services/errorLogger/errorLogger";
import { getLocales, findBestAvailableLanguage } from "react-native-localize";

const locales = getLocales();

const languageCodes = locales.map(each => each.languageTag);

export const systemLanguageCode =
  findBestAvailableLanguage(languageCodes)?.languageTag ?? "en-IN";

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

  @persist
  @observable
  _deviceLocaleCode: string = systemLanguageCode;

  @computed get deviceLocale() {
    return this._deviceLocale;
  }

  @computed get deviceLocaleCode() {
    return this._deviceLocaleCode;
  }

  @action updateDeviceLocale = (newLocale: string) => {
    this._deviceLocale = newLocale;
  };

  @action updateDeviceLocaleCode = (newLocaleCode: string) => {
    this._deviceLocaleCode = newLocaleCode;
  };
}

export default DeviceLocale;
