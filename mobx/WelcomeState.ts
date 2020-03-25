import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import hydrate from "../Services/hydrate/hydrate";
import apiCall from "../Services/networkRequests/apiCall";
import {
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS,
  SCREEN_APP_LOGIN
} from "../NavigatorsV2/ScreenNames";
import { CONSTANT_userStateDetails } from "../constants/apiUrls";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";
import { logError } from "../Services/errorLogger/errorLogger";

export interface IWelcomeState {
  seenWelcomeScreen?: boolean;
  seenTravelCountryPicker?: boolean;
  seenMaritalStatus?: boolean;
  skippedAt?:
    | typeof SCREEN_APP_LOGIN
    | typeof SCREEN_TRAVEL_PROFILE_WELCOME
    | typeof SCREEN_TRAVEL_COUNTRY_PICKER
    | typeof SCREEN_TRAVEL_MARITAL_STATUS
    | boolean;
}

export interface IWelcomeStateApiResponse extends IMobileServerResponse {
  data: IWelcomeState;
}

class WelcomeState {
  static hydrator = (storeInstance: WelcomeState) => {
    hydrate("_welcomeState", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  @persist("object")
  @observable
  _welcomeState: IWelcomeState = {};

  @action reset = () => {
    this._welcomeState = {};
  };

  @computed get skippedAt() {
    return this._welcomeState.skippedAt;
  }

  @computed get seenWelcomeScreen() {
    return this._welcomeState.seenWelcomeScreen;
  }

  @computed get seenTravelCountryPicker() {
    return this._welcomeState.seenTravelCountryPicker;
  }

  @computed get seenMaritalStatus() {
    return this._welcomeState.seenMaritalStatus;
  }

  @action
  loadWelcomeState = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_userStateDetails, {}, "GET")
        .then((response: IWelcomeStateApiResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._welcomeState = response.data;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };

  @action
  patchWelcomeState = <K extends keyof IWelcomeState>(
    key: K,
    value: IWelcomeState[K]
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(
        CONSTANT_userStateDetails,
        {
          [key]: value
        },
        "POST"
      )
        .then((response: IMobileServerResponse) => {
          resolve(response.status === CONSTANT_responseSuccessStatus);
        })
        .catch(reject);
    });
  };
}

export default WelcomeState;
