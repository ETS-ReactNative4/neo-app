import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import storeService from "../Services/storeService/storeService";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";
import { hydrate } from "./Store";
import { toastBottom } from "../Services/toast/toast";

class Forex {
  static hydrator = storeInstance => {
    hydrate("_opportunityId", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate("_userDetails", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate("_forexGuidesDetails", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

  @observable _isLoading = false;
  @observable _hasError = false;

  @persist
  @observable
  _opportunityId = "";

  @persist("object")
  @observable
  _userDetails = {};

  @persist("object")
  @observable
  _forexGuidesDetails = {};

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  @computed
  get opportunityId() {
    return this._opportunityId;
  }

  @computed
  get userDetails() {
    return toJS(this._userDetails);
  }

  @action
  getForexStatus = () => {
    const { selectedItineraryId } = storeService.itineraries;
    this._isLoading = true;
    apiCall(
      `${constants.getForexStatus}?itineraryId=${selectedItineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._hasError = false;
          if (response.data) {
            this._opportunityId = response.data.opportunityId;
          }
        } else {
          this._hasError = true;
          toastBottom(constants.serverResponseErrorText);
        }
      })
      .catch(() => {
        this._isLoading = false;
        this._hasError = true;
        toastBottom(constants.serverErrorText);
      });
  };

  @action
  getForexDataFromGuides = () => {
    const { selectedItineraryId } = storeService.itineraries;
    this._isLoading = true;
    apiCall(
      `${constants.getForexInfoFromGuides}?itineraryId=${selectedItineraryId}`,
      {},
      "GET"
    )
      .then(response => {})
      .catch(() => {});
  };
}

export default Forex;
