import { observable, computed, action, set, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";
import { hydrate } from "./Store";
import storeService from "../Services/storeService/storeService";
import _ from "lodash";
import { toastBottom } from "../Services/toast/toast";

class Visa {
  static hydrator = storeInstance => {
    hydrate("_visaDetails", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_homeScreenDetails", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_visaList", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_isVisaInitialized", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _visaDetails = {};

  @persist("object")
  @observable
  _homeScreenDetails = {};

  @persist("list")
  @observable
  _visaList = [];

  @persist
  @observable
  _isVisaInitialized = false;

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._visaDetails = {};
    this._homeScreenDetails = {};
    this._visaList = [];
    this._isVisaInitialized = false;
  };

  @computed
  get homeScreenDetails() {
    return toJS(this._homeScreenDetails);
  }

  @computed
  get visaList() {
    return toJS(this._visaList);
  }

  @computed
  get isSingleVisa() {
    return this._visaList && this._visaList.length === 1;
  }

  @computed
  get isVisaInitialized() {
    return this._isVisaInitialized;
  }

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
  loadVisaDetails = visaId => {
    return new Promise((resolve, reject) => {
      const requiredVisa =
        this.visaList.find(visa => visa.visaId === visaId) || {};
      apiCall(
        `${constants.getVisaDetails.replace(":visaId", visaId)}?visaType=${
          requiredVisa.visaType
        }`
      )
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            const visaDetails = toJS(this._visaDetails);
            visaDetails[visaId] = response.data;
            this._visaDetails = visaDetails;
            resolve(response.data);
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  getVisaDetails = createTransformer(visaId => {
    try {
      return toJS(this._visaDetails[visaId] || {});
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getHelpSectionsByVisaId = createTransformer(visaId => {
    try {
      return toJS((this._visaDetails[visaId] || {}).visaHelpData || []);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  @action
  initiateVisa = () => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestBody = {
        itineraryId
      };
      apiCall(constants.initiateVisaProcess, requestBody, "POST")
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            this._visaList = _.get(response, "data.visaList") || [];
            resolve(this.visaList);
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
  };

  // @action
  // _getVisaDetailsFromAPI = itineraryId => {
  //   this._isLoading = true;
  //   apiCall(
  //     constants.getVisaDetails.replace(":itineraryId", itineraryId),
  //     {},
  //     "GET"
  //   )
  //     .then(response => {
  //       this._isLoading = false;
  //       if (response.status === "SUCCESS") {
  //         this._hasError = false;
  //         const visaDetails = toJS(this._visaDetails);
  //         visaDetails[itineraryId] = response.data;
  //         this._visaDetails = visaDetails;
  //         // set(this._visaDetails, itineraryId, response.data);
  //       } else {
  //         this._hasError = true;
  //       }
  //     })
  //     .catch(err => {
  //       this._isLoading = false;
  //       this._hasError = true;
  //       console.error(err);
  //     });
  // };

  @action
  getVisaHomeScreenDetails = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    apiCall(
      `${constants.getVisaHomeInfo}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        if (response.status === constants.responseSuccessStatus) {
          this._isVisaInitialized = _.get(response, "data.initialized");
          if (this._isVisaInitialized) {
            this._visaList = _.get(response, "data.visaList") || [];
          } else {
            this._homeScreenDetails = response.data;
          }
        } else {
          toastBottom(constants.visaScreenText.failedToLoadVisaData);
        }
      })
      .catch(() => null);
  };

  getVisaDetailsById = createTransformer(visaId => {
    try {
      return toJS(this._visaDetails[visaId]) || {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

  /**
   * A utility function that will open visa home screen
   * depending on the various parameters that are obtained from
   * the visa store. But the values should be supplied as parameters.
   */
  static visaOpener = ({
    navigation,
    isVisaInitialized,
    isSingleVisa,
    visaList
  }) => {
    if (isVisaInitialized && isSingleVisa) {
      const firstVisa = visaList[0];
      navigation.navigate("VisaStatus", { visaId: firstVisa.visaId });
    } else if (isVisaInitialized) {
      navigation.navigate("VisaSelector");
    } else {
      navigation.navigate("Visa");
    }
  };
}

export default Visa;
