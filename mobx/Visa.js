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

  /**
   * This method will retrieve the visa details of an itinerary stored in the local mobx store
   */
  getVisaDetailsByItineraryId = createTransformer(itineraryId => {
    if (this._visaDetails[itineraryId])
      return toJS(this._visaDetails[itineraryId]);
    else return [];
  });

  /**
   * This will fetch visa details of an itinerary from the api
   */
  @action
  getVisaDetails = itineraryId => {
    /**
     * Condition used to fetch visa details only when the visa information is not available in mobx
     */
    // if (!this._visaDetails[itineraryId])
    this._getVisaDetailsFromAPI(itineraryId);
  };

  @action
  _getVisaDetailsFromAPI = itineraryId => {
    this._isLoading = true;
    apiCall(
      constants.getVisaDetails.replace(":itineraryId", itineraryId),
      {},
      "GET"
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const visaDetails = toJS(this._visaDetails);
          visaDetails[itineraryId] = response.data;
          this._visaDetails = visaDetails;
          // set(this._visaDetails, itineraryId, response.data);
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
