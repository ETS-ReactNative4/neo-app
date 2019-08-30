import { observable, computed, action, toJS, set } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import getTitleCase from "../Services/getTitleCase/getTitleCase";
import _ from "lodash";

class PassportDetails {
  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _passportDetails = {};

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._passportDetails = {};
  };

  @computed
  get loading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  @computed
  get leadPassengerName() {
    try {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const { leadPassengerDetail = {} } =
        _.get(this._passportDetails, itineraryId) || {};
      const { firstName = "", lastName = "" } = leadPassengerDetail || {};
      return getTitleCase(`${firstName} ${lastName}`);
    } catch (e) {
      logError(e);
      return "";
    }
  }

  @computed
  get passengerCount() {
    try {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const passengersList = this._getPassportDetailsByItinerary(itineraryId);
      return passengersList.length;
    } catch (e) {
      logError(e);
      return 0;
    }
  }

  @computed
  get getPassportDetails() {
    try {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      return toJS(this._passportDetails[itineraryId]);
    } catch (e) {
      logError(e);
      return {};
    }
  }

  @computed
  get getPassengerDetails() {
    try {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      return this._getPassportDetailsByItinerary(itineraryId);
    } catch (e) {
      logError(e);
      return {};
    }
  }

  _getPassportDetailsByItinerary = createTransformer(itineraryId => {
    try {
      const passportDetails = toJS(this._passportDetails[itineraryId]);
      if (passportDetails && passportDetails.leadPassengerDetail) {
        return [
          passportDetails.leadPassengerDetail,
          ...passportDetails.otherPassengerDetailList
        ];
      } else {
        return [];
      }
    } catch (e) {
      logError(e);
      return [];
    }
  });

  @action
  getPassportDetails = itineraryId => {
    if (!this._passportDetails[itineraryId]) {
      this._getPassportDetailsFromAPI(itineraryId);
    }
  };

  @action
  updatePassportDetails = itineraryId => {
    this._getPassportDetailsFromAPI(itineraryId);
  };

  @action
  _getPassportDetailsFromAPI = itineraryId => {
    this._isLoading = true;
    apiCall(
      constants.getPassportDetails.replace(":itineraryId", itineraryId),
      {},
      "GET"
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const passportDetails = toJS(this._passportDetails);
          passportDetails[itineraryId] = response.data;
          this._passportDetails = passportDetails;
          // set(this._passportDetails, `${itineraryId}`, response.data);
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isLoading = false;
        this._hasError = true;
        console.error(err);
      });
  };
}

export default PassportDetails;
