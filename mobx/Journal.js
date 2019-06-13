import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { persist } from "mobx-persist";
import { logError } from "../Services/errorLogger/errorLogger";
import apiCall from "../Services/networkRequests/apiCall";
import storeService from "../Services/storeService/storeService";

class Journal {
  static hydrator = storeInstance => {
    hydrate("_homeScreenDetails", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
  };

  @persist("object")
  @observable
  _homeScreenDetails = {};

  @observable _isHomeScreenLoading = false;

  @observable _homeScreenError = false;

  @computed
  get homeScreenDetails() {
    return toJS(this._homeScreenDetails);
  }

  @computed
  get isHomeScreenLoading() {
    return this._isHomeScreenLoading;
  }

  @computed
  get homeScreenError() {
    return this._homeScreenError;
  }

  @action
  getHomeScreenDetails = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    this._isHomeScreenLoading = true;
    apiCall(
      `${constants.getJournalScreenDetails}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isHomeScreenLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._homeScreenDetails = response.data;
          this._homeScreenError = false;
        } else {
          this._homeScreenError = true;
        }
      })
      .catch(() => {
        this._isHomeScreenLoading = false;
        this._homeScreenError = true;
      });
  };
}

export default Journal;
