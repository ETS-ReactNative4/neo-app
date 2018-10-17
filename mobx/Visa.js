import { observable, computed, action, set, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Visa {
  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _visaDetails = {};

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._visaDetails = {};
  };

  getVisaDetailsByItineraryId = createTransformer(itineraryId =>
    toJS(this._visaDetails[itineraryId])
  );

  @action
  getVisaDetails = itineraryId => {
    if (!this._visaDetails[itineraryId])
      this._getVisaDetailsFromAPI(itineraryId);
  };

  @action
  _getVisaDetailsFromAPI = itineraryId => {
    this._isLoading = true;
    apiCall(constants.getVisaDetails.replace(":itineraryId", itineraryId), {})
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          set(this._visaDetails, itineraryId, response.data);
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

export default Visa;
