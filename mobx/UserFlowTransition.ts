import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { logError } from "../Services/errorLogger/errorLogger";
import hydrate from "../Services/hydrate/hydrate";
import apiCall from "../Services/networkRequests/apiCall";
import {
  CONSTANT_feedbackUserState,
  CONSTANT_feedbackInfo
} from "../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";

export interface ITransitionStatus {
  seenPostBookingIntro: boolean;
  completedSOFeedback: boolean;
  seenOPSIntro: boolean;
}

export interface IUserTransitionStatusResponse extends IMobileServerResponse {
  data: ITransitionStatus;
}

class UserFlowTransition {
  static hydrator = (storeInstance: UserFlowTransition) => {
    hydrate("_seenPostBookingIntro", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_completedSOFeedback", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_seenOPSIntro", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  @persist
  @observable
  _seenPostBookingIntro = false;

  @persist
  @observable
  _completedSOFeedback = false;

  @persist
  @observable
  _seenOPSIntro = false;

  @action
  reset = () => {
    this._seenPostBookingIntro = false;
    this._completedSOFeedback = false;
    this._seenOPSIntro = false;
  };

  @computed
  get seenPostBookingIntro() {
    return this._seenPostBookingIntro;
  }

  @computed
  get completedSOFeedback() {
    return this._completedSOFeedback;
  }

  @computed
  get seenOPSIntro() {
    return this._seenOPSIntro;
  }

  @action
  loadUserTransitionStatus = (itineraryId: string) => {
    return new Promise<ITransitionStatus>((resolve, reject) => {
      apiCall(
        `${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`,
        {},
        "GET"
      )
        .then((response: IUserTransitionStatusResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            const {
              seenPostBookingIntro = false,
              completedSOFeedback = false,
              seenOPSIntro = false
            } = response.data || {};
            this._seenPostBookingIntro = seenPostBookingIntro;
            this._completedSOFeedback = completedSOFeedback;
            this._seenOPSIntro = seenOPSIntro;
            resolve({
              seenPostBookingIntro,
              completedSOFeedback,
              seenOPSIntro
            });
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  };

  @action
  userSeenPostBookingIntro = (itineraryId: string) => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(
        `${CONSTANT_feedbackInfo}?itineraryId=${itineraryId}`,
        { seenPostBookingIntro: true },
        "PATCH"
      )
        .then((response: IMobileServerResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._seenPostBookingIntro = true;
            resolve(true);
          } else {
            this._seenPostBookingIntro = false;
            /**
             * TODO: Resolve this to false instead of reject
             */
            reject();
          }
        })
        .catch(() => {
          this._seenPostBookingIntro = false;
          reject();
        });
    });
  };

  @action
  userSeenOPSIntro = (itineraryId: string) => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(
        `${CONSTANT_feedbackInfo}?itineraryId=${itineraryId}`,
        { seenOPSIntro: true },
        "PATCH"
      )
        .then((response: IMobileServerResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._seenOPSIntro = true;
            resolve(true);
          } else {
            this._seenOPSIntro = false;
            reject();
          }
        })
        .catch(() => {
          this._seenOPSIntro = false;
          reject();
        });
    });
  };
}

export default UserFlowTransition;
