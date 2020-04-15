import { action, computed, observable, toJS } from "mobx";
import { persist } from "mobx-persist";
import { ICountryDetail } from "../Screens/TravelProfileCityScreen/TravelProfileCity";
import hydrate from "../Services/hydrate/hydrate";
import { logError } from "../Services/errorLogger/errorLogger";
import apiCall from "../Services/networkRequests/apiCall";
import {
  CONSTANT_userProfileInfo,
  CONSTANT_getCountriesList,
  CONSTANT_userProfileData,
  CONSTANT_getMaritalStatusData
} from "../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";
import _ from "lodash";
import { CONSTANT_apiServerUrl } from "../constants/serverUrls";

export type maritalStatusType = "COUPLE" | "FAMILY" | "FRIENDS" | "SOLO";

export type maritalStatusOptionImagesType = {
  [key in maritalStatusType]: string;
};

export type travellingWithType =
  | "Senior Citizens"
  | "Kids"
  | "Teenagers"
  | "Kids Below 7"
  | "Infants";

export type tripIntensityType = "LAID_BACK" | "MODERATE" | "PACKED";

export type budgetRangeType = "DEAL_HUNTER" | "VALUE_FOR_MONEY" | "FLEXIBLE";

export interface ITravelProfileInfo {
  firstTimeTraveller?: boolean;
  travelledCountries?: number[];
  wishlistCountries?: number[];
  maritalStatus?: maritalStatusType;
  tripIntensity?: tripIntensityType;
  tripBudget?: budgetRangeType;
  travellingWith?: travellingWithType[];
}

export interface ITravelProfileOptions {
  tripIntensity: tripIntensityType[];
  budgetRange: budgetRangeType[];
  maritalStatus: {
    values: maritalStatusType[];
    travellingWith: travellingWithType[];
  };
}

export interface ILoadSavedTravelProfileResponse extends IMobileServerResponse {
  data: ITravelProfileInfo;
}

export interface ILoadTravelProfileResponse extends IMobileServerResponse {
  data: ITravelProfileOptions;
}

export interface ICountryDetailsListResponse extends IMobileServerResponse {
  data: ICountryDetail[];
}

export const travelProfileOptionsTypeGuard = (
  profileOptions: ITravelProfileOptions | {}
): profileOptions is ITravelProfileOptions => {
  return !_.isEmpty(profileOptions);
};

class TravelProfile {
  static hydrator = (storeInstance: TravelProfile) => {
    Promise.all([
      hydrate("_countriesList", storeInstance),
      hydrate("_travelProfileOptions", storeInstance),
      hydrate("_firstTimeTraveller", storeInstance)
    ])
      .then(() => {})
      .catch(logError);
  };

  @persist("list")
  @observable
  _countriesList: ICountryDetail[] = [];

  @persist("object")
  @observable
  _travelProfileOptions: ITravelProfileOptions | {} = {};

  @persist("object")
  @observable
  _travelProfileData: ITravelProfileInfo = {};

  @persist
  @observable
  _firstTimeTraveller: boolean = false;

  @persist("object")
  @observable
  _maritalStatusOptionImages: maritalStatusOptionImagesType | {} = {};

  @action
  reset = () => {
    this._countriesList = [];
    this._travelProfileOptions = {};
    this._firstTimeTraveller = false;
  };

  @computed
  get countriesList() {
    return toJS(this._countriesList);
  }

  @computed
  get maritalStatusOptions(): maritalStatusType[] {
    try {
      if (travelProfileOptionsTypeGuard(this._travelProfileOptions)) {
        return toJS(this._travelProfileOptions.maritalStatus.values);
      } else {
        return [];
      }
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get maritalStatusOptionImages(): maritalStatusOptionImagesType | {} {
    return toJS(this._maritalStatusOptionImages);
  }

  @computed
  get travellingWith(): travellingWithType[] {
    try {
      if (travelProfileOptionsTypeGuard(this._travelProfileOptions)) {
        return toJS(this._travelProfileOptions.maritalStatus.travellingWith);
      } else {
        return [];
      }
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get firstTimeTraveller(): boolean {
    return this._firstTimeTraveller;
  }

  @computed
  get travelProfileData(): ITravelProfileInfo {
    return toJS(this._travelProfileData);
  }

  @action
  updateTravelProfileData(newData: ITravelProfileInfo) {
    try {
      this._travelProfileData = {
        ...this._travelProfileData,
        ...newData
      };
    } catch (e) {
      logError(e, { type: "Failed to save travel profile data" });
    }
  }

  @action
  setFirstTimeTraveller = (status: boolean) => {
    this._firstTimeTraveller = status;
  };

  @action
  loadCountriesList = () => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_getCountriesList, {}, "GET")
        .then((response: ICountryDetailsListResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._countriesList = response.data;
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };

  @action
  loadMaritalStatusOptionImages = () => {
    return new Promise<boolean>((resolve, reject) => {
      fetch(`${CONSTANT_apiServerUrl}${CONSTANT_getMaritalStatusData}`)
        .then(response => response.json())
        .then((data: maritalStatusOptionImagesType) => {
          this._maritalStatusOptionImages = data;
          resolve(true);
        })
        .catch(reject);
    });
  };

  @action
  loadTravelProfileOptions = () => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_userProfileInfo, {}, "GET")
        .then((response: ILoadTravelProfileResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._travelProfileOptions = response.data;
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };

  @action
  loadSavedTravelProfile = () => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_userProfileData, {}, "GET")
        .then((response: ILoadSavedTravelProfileResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._travelProfileData = response.data;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };
}

export default TravelProfile;
