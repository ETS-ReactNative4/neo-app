import { observable, computed, action } from "mobx";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class YourBookings {
  @observable _upcomingItineraries = [];
  @observable _isLoading = false;
  @observable _loadingError = false;

  @computed
  get itineraries() {
    return this._upcomingItineraries.slice();
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._loadingError;
  }

  @action
  getUpcomingItineraries() {
    this._isLoading = true;
    const requestBody = {};
    apiCall(constants.getYourTrips, requestBody)
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._upcomingItineraries = response.data.upcomingItineraries;
          this._loadingError = false;
        } else {
          this._loadingError = true;
        }
      })
      .catch(error => {
        this._isLoading = false;
        this._loadingError = true;
      });
  }
}

export default YourBookings;
