import { action, computed, observable, toJS } from "mobx";
import { persist } from "mobx-persist";
import { ICountryDetail } from "../Screens/TravelProfileCityScreen/TravelProfileCity";
import hydrate from "../Services/hydrate/hydrate";
import { logError } from "../Services/errorLogger/errorLogger";
import apiCall from "../Services/networkRequests/apiCall";
import {
  CONSTANT_userProfileInfo,
  CONSTANT_getCountriesList
} from "../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";

export type maritalStatusType = "Couple" | "Family" | "Friends" | "Solo";

export type travellingWithType =
  | "Senior Citizens"
  | "Kids"
  | "Teenagers"
  | "Kids Below 7"
  | "Infants";

export type tripIntensityType = "LAID_BACK" | "MODERATE" | "PACKED";

export type budgetRangeType = "DEAL_HUNTER" | "VALUE_FOR_MONEY" | "FLEXIBLE";

export interface ITravelProfileInfo {
  firstTimeTraveller: boolean;
  travelledCountries: number[];
  wishlistCountries: number[];
  maritalStatus: maritalStatusType;
  tripIntensity: tripIntensityType;
  tripBudget: budgetRangeType;
  travellingWith: travellingWithType[];
}

export interface ITravelProfileOptions {
  tripIntensity: tripIntensityType[];
  budgetRange: budgetRangeType[];
  maritalStatus: {
    values: maritalStatusType[];
    travellingWith: travellingWithType[];
  };
}

export interface ILoadTravelProfileResponse extends IMobileServerResponse {
  data: ITravelProfileInfo;
}

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

  @persist
  @observable
  _firstTimeTraveller: boolean = false;

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
  get maritalStatusOptions() {
    return;
  }

  @computed
  get travellingWith() {
    return;
  }

  @computed
  get firstTimeTraveller() {
    return this._firstTimeTraveller;
  }

  @action
  loadCountriesList = () => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_getCountriesList, {}, "GET")
        .then(response => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            // TODO: Need response in JSON Format
          }
        })
        .catch(reject);
    });
  };

  @action
  loadTravelProfile = () => {
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
}

export default TravelProfile;
