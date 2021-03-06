import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import hydrate from "../Services/hydrate/hydrate";
import apiCall from "../Services/networkRequests/apiCall";
import {
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS,
  SCREEN_APP_LOGIN,
  SCREEN_TRIP_INTENSITY,
  SCREEN_BUDGET_PREFERENCES
} from "../NavigatorsV2/ScreenNames";
import { CONSTANT_userStateDetails } from "../constants/apiUrls";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";
import { logError } from "../Services/errorLogger/errorLogger";

export interface IWelcomeState {
  seenWelcomeScreen?: boolean;
  seenTravelCountryPicker?: boolean;
  seenMaritalStatus?: boolean;
  seenTripIntensity?: boolean;
  seenBudgetPreferences?: boolean;
  skippedAt?:
    | typeof SCREEN_APP_LOGIN
    | typeof SCREEN_TRAVEL_PROFILE_WELCOME
    | typeof SCREEN_TRAVEL_COUNTRY_PICKER
    | typeof SCREEN_TRAVEL_MARITAL_STATUS
    | typeof SCREEN_TRIP_INTENSITY
    | typeof SCREEN_BUDGET_PREFERENCES
    | boolean;
}

export interface IStateData {
  userId: string;
  itineraryId?: string;
  state: IWelcomeState;
}

export interface IWelcomeStateApiResponse extends IMobileServerResponse {
  data: IStateData[];
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

  @computed get completionPercentage() {
    let score = 0;
    this._welcomeState.seenBudgetPreferences && score++;
    this._welcomeState.seenMaritalStatus && score++;
    this._welcomeState.seenTravelCountryPicker && score++;
    this._welcomeState.seenTripIntensity && score++;
    this._welcomeState.seenWelcomeScreen && score++;
    return (score / 5) * 100;
  }

  @action
  loadWelcomeState = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_userStateDetails, {}, "GET")
        .then((response: IWelcomeStateApiResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            if (response.data.length) {
              this._welcomeState = response.data[0].state;
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };

  // constructor() {
  //   this.patchWelcomeState("seenMaritalStatus", false);
  //   this.patchWelcomeState("seenTravelCountryPicker", false);
  //   this.patchWelcomeState("seenWelcomeScreen", false);
  //   this.patchWelcomeState("seenTripIntensity", false);
  //   this.patchWelcomeState("seenBudgetPreferences", false);
  //   this.patchWelcomeState("skippedAt", false);
  // }

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
        "PUT"
      )
        .then((response: IMobileServerResponse) => {
          resolve(response.status === CONSTANT_responseSuccessStatus);
          this.loadWelcomeState();
        })
        .catch(reject);
    });
  };
}

export default WelcomeState;
