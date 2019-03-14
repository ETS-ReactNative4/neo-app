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

  @observable _isForexStatusLoading = false;
  @observable _forexStatusError = false;

  @observable _isGuidesDataLoading = false;
  @observable _guidesDataError = false;

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
  get isForexStatusLoading() {
    return this._isForexStatusLoading;
  }

  @computed
  get forexStatusError() {
    return this._forexStatusError;
  }

  @computed
  get opportunityId() {
    return this._opportunityId;
  }

  @computed
  get userDetails() {
    return toJS(this._userDetails);
  }

  @computed
  get forexGuidesDetails() {
    return toJS(this._forexGuidesDetails);
  }

  @action
  getForexStatus = () => {
    const { selectedItineraryId } = storeService.itineraries;
    this._isForexStatusLoading = true;
    apiCall(
      `${constants.getForexStatus}?itineraryId=${selectedItineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isForexStatusLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._forexStatusError = false;
          if (response.data) {
            this._opportunityId = response.data.opportunityId;
          }
        } else {
          this._forexStatusError = true;
          toastBottom(constants.serverResponseErrorText);
        }
      })
      .catch(() => {
        this._isForexStatusLoading = false;
        this._forexStatusError = true;
        toastBottom(constants.serverErrorText);
      });
  };

  @action
  getForexDataFromGuides = () => {
    const { selectedItineraryId } = storeService.itineraries;
    this._isGuidesDataLoading = true;
    apiCall(
      `${constants.getForexInfoFromGuides}?itineraryId=${selectedItineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isGuidesDataLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._guidesDataError = false;
          this._forexGuidesDetails = response.data;
        } else {
          this._guidesDataError = true;
        }
      })
      .catch(() => {
        this._isGuidesDataLoading = false;
        this._guidesDataError = true;
      });
  };
}

export default Forex;
