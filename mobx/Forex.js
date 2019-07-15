import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import storeService from "../Services/storeService/storeService";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";
import { hydrate } from "./Store";
import { toastBottom } from "../Services/toast/toast";
import _ from "lodash";
import { createTransformer } from "mobx-utils";

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
    hydrate("_submittedData", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate("_forexCurrencies", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

  @observable _isForexStatusLoading = false;
  @observable _forexStatusError = false;

  @observable _isGuidesDataLoading = false;
  @observable _guidesDataError = false;

  @observable _isSubmitAPILoading = false;
  @observable _submitAPIError = false;

  @persist
  @observable
  _opportunityId = "";

  @persist("object")
  @observable
  _userDetails = {};

  @persist("object")
  @observable
  _forexGuidesDetails = {};

  @persist("object")
  @observable
  _submittedData = {};

  @persist("object")
  @observable
  _forexCurrencies = {};

  @action
  reset = () => {
    this._opportunityId = "";
    this._userDetails = {};
    this._forexGuidesDetails = {};
    this._submittedData = {};
  };

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

  @computed
  get isSubmitAPILoading() {
    return this._isSubmitAPILoading;
  }

  @computed
  get submittedData() {
    return toJS(this._submittedData);
  }

  getCurrencyListByItineraryId = createTransformer(itineraryId => {
    try {
      return toJS(this._forexCurrencies[itineraryId] || []);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  @action
  loadForexCurrencyByItineraryId = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    apiCall(
      `${constants.getCurrencyByItinerary.replace(
        ":itineraryId",
        itineraryId
      )}?tcAllowedCurrencies=true`,
      {},
      "GET"
    )
      .then(response => {
        if (response.status === "SUCCESS") {
          const currencies = toJS(this._forexCurrencies);
          currencies[itineraryId] = _.compact(response.data);
          this._forexCurrencies = currencies;
        } else {
          toastBottom(constants.forexText.failedToFetchCurrency);
        }
      })
      .catch(() => {
        toastBottom(constants.forexText.failedToFetchCurrency);
      });
  };

  /**
   * Check if the user has already submitted a quote request
   */
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
            const { opportunityId, ...otherData } = response.data;
            this._opportunityId = opportunityId;
            this._submittedData = otherData;
          } else {
            this._opportunityId = "";
            this._submittedData = {};
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

  /**
   * Retreive Forex data from Guides
   */
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

  /**
   * Submit Forex Data (for the request quote action in UI)
   */
  @action
  submitForexData = requestObject => {
    this._isSubmitAPILoading = true;
    apiCall(constants.sendUserDataToForex, requestObject, "POST")
      .then(response => {
        this._isSubmitAPILoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._submitAPIError = false;
          if (response.data.messageCode === -1) {
            toastBottom(constants.forexText.requestExistsText);
          } else if (response.data.messageCode === 0) {
            this._opportunityId = response.data.opportunityId;
            this._submittedData = requestObject;
          } else {
            toastBottom(constants.forexText.unableToSubmitRequest);
          }
        } else {
          this._submitAPIError = true;
          toastBottom(constants.serverResponseErrorText);
        }
      })
      .catch(() => {
        this._isSubmitAPILoading = false;
        this._submitAPIError = true;
        toastBottom(constants.serverErrorText);
      });
  };
}

export default Forex;
