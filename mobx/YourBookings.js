import { observable, computed, action } from "mobx";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class YourBookings {
  @observable _upcomingItineraries = [];
  @observable _completedItineraries = [];
  @observable _isLoading = false;
  @observable _loadingError = false;

  @computed
  get upcomingItineraries() {
    return this._upcomingItineraries.slice();
  }

  @computed
  get completedItineraries() {
    return this._completedItineraries.slice();
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
          this._upcomingItineraries = response.data.UNCOMPLETED;
          this._completedItineraries = response.data.COMPLETED;
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
