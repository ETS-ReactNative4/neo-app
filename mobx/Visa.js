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

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._visaDetails = {};
    this._homeScreenDetails = {};
    this._visaList = [];
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
    return this._visaList.length === 1;
  }

  @computed
  get isVisaInitialized() {
    return this._visaList.length > 0;
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
  getVisaDetails = itineraryId => {
    /**
     * Condition used to fetch visa details only when the visa information is not available in mobx
     */
    // if (!this._visaDetails[itineraryId])
    this._getVisaDetailsFromAPI(itineraryId);
  };

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
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
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

  @action
  getVisaHomeScreenDetails = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    apiCall(
      `${constants.getVisaHomeInfo}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        if ((response.status = constants.responseSuccessStatus)) {
          if (_.get(response, "data.visaList")) {
            this._visaList = _.get(response, "data.visaList");
          } else {
            this._homeScreenDetails = response.data;
          }
        } else {
          toastBottom(constants.visaScreenText.failedToLoadVisaData);
        }
      })
      .catch(() => null);
  };

  constructor() {
    setTimeout(() => {
      this._homeScreenDetails = {
        title: "",
        body: "",
        departureDate: "",
        totalPax: 2,
        image: {
          uri:
            "https://img.jakpost.net/c/2019/03/19/2019_03_19_67991_1552969698._large.jpg"
        }
      };
      this._visaList = [
        {
          visaId: 122,
          visaType: "E-VISA",
          visaStage: "INITIAL_CALL",
          visaStageStr:
            "Initial call stage(This data will be added from product side)",
          visaTitleStr:
            "Australia & HongKong (This data will be added from product side)",
          countries: ["planningToolId1", "planningToolId2"],
          updatesAvailable: false
        },
        {
          visaId: 122,
          visaType: "E-VISA",
          visaStage: "INITIAL_CALL",
          visaStageStr:
            "Initial call stage(This data will be added from product side)",
          visaTitleStr:
            "Australia & HongKong (This data will be added from product side)",
          countries: ["planningToolId1", "planningToolId2"],
          updatesAvailable: false
        },
        {
          visaId: 122,
          visaType: "E-VISA",
          visaStage: "INITIAL_CALL",
          visaStageStr:
            "Initial call stage(This data will be added from product side)",
          visaTitleStr:
            "Australia & HongKong (This data will be added from product side)",
          countries: ["planningToolId1", "planningToolId2"],
          updatesAvailable: false
        }
      ];
    }, 5000);
  }
}

export default Visa;
