import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

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

  getPassportDetailsByItinerary = createTransformer(itineraryId =>
    toJS(this._passportDetails[itineraryId])
  );

  @action
  getPassportDetails = itineraryId => {
    if (!this._passportDetails[itineraryId]) {
      this._getPassportDetailsFromAPI(itineraryId);
    }
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
