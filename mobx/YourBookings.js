import { observable, computed, action } from "mobx";
import apiCall from "../../Services/networkRequests/apiCall";
import constants from "../../constants/constants";

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
    const requestBody = {
      userId: "5ab367fe3fef300bbd3a5783"
    };
    apiCall(constants.getYourTrips, requestBody)
      .then(response => {
        this._isLoading = false;
        console.log(response);
        if (response.status === "SUCCESS") {
          this._upcomingItineraries = response.data.upcomingItineraries;
          this._loadingError = false;
        } else {
          this._loadingError = true;
        }
      })
      .catch(error => {
        console.log(error);
        this._isLoading = false;
        this._loadingError = true;
      });
  }
}

export default YourBookings;
