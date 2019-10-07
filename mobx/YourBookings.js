import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import DebouncedAlert from "../CommonComponents/DebouncedAlert/DebouncedAlert";

class YourBookings {
  @persist("list")
  @observable
  _upcomingItineraries = [];

  @persist("list")
  @observable
  _completedItineraries = [];

  @observable _isLoading = false;
  @observable _loadingError = false;

  @action
  reset = () => {
    this._upcomingItineraries = [];
    this._completedItineraries = [];
    this._isLoading = false;
    this._loadingError = false;
  };

  @action
  getUpcomingItineraries = () => {
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
          DebouncedAlert("Error!", "Unable to get Itinerary Details...");
        }
      })
      .catch(error => {
        this._isLoading = false;
        this._loadingError = true;
        DebouncedAlert("Error!", "Internal Server Error...");
      });
  };

  @computed
  get upcomingItineraries() {
    /**
     * TODO: Until the trip completed flow is created we need to show
     * the completed itineraries in the upcoming section.
     *
     * - Also requires a change in payment screen.
     */
    return toJS([...this._upcomingItineraries, this._completedItineraries]);
  }

  @computed
  get completedItineraries() {
    return toJS(this._completedItineraries);
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._loadingError;
  }
}

export default YourBookings;
