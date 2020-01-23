import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { logError } from "../Services/errorLogger/errorLogger";
import { hydrate } from "./Store";
import apiCall from "../Services/networkRequests/apiCall";
import { CONSTANT_feedbackUserState } from "../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";

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
    return new Promise<boolean>((resolve, reject) => {
      apiCall(
        `${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`,
        {},
        "GET"
      )
        .then(response => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            const {
              seenPostBookingIntro = false,
              completedSOFeedback = false,
              seenOPSIntro = false
            } = response.data || {};
            this._seenPostBookingIntro = seenPostBookingIntro;
            this._completedSOFeedback = completedSOFeedback;
            this._seenOPSIntro = seenOPSIntro;
            resolve(true);
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
        `${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`,
        { seenPostBookingIntro: true },
        "PATCH"
      )
        .then(response => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._seenPostBookingIntro = true;
            resolve(true);
          } else {
            this._seenPostBookingIntro = false;
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
        `${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`,
        { seenOPSIntro: true },
        "PATCH"
      )
        .then(response => {
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
