import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";

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
    const itineraryId = storeService.itineraries.selectedItineraryId;
    const { leadPassengerDetail } = this._passportDetails[itineraryId];
    const { firstName, lastName } = leadPassengerDetail;
    return `${firstName} ${lastName}`;
  }

  @computed
  get passengerCount() {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    const passengersList = this.getPassportDetailsByItinerary(itineraryId);
    return passengersList.length;
  }

  getPassportDetailsByItinerary = createTransformer(itineraryId => {
    const passportDetails = toJS(this._passportDetails[itineraryId]);
    return [
      passportDetails.leadPassengerDetail,
      ...passportDetails.otherPassengerDetailList
    ];
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
    apiCall(constants.getPassportDetails.replace(":itineraryId", itineraryId))
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const passportDetails = toJS(this._passportDetails);
          passportDetails[itineraryId] = response.data;
          this._passportDetails = passportDetails;
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
