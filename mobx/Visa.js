import { action, computed, observable, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { CONSTANT_updateVisaSuccessAnimationSeen } from "../constants/apiUrls";
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
    hydrate("_selectedVisaChecklistItems", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_isVisaAvailable", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  @observable _isLoading = false;
  @observable _hasError = false;

  /**
   * VisaDetails includes all details of visas for all itineraries in the "Your bookings" screen.
   */
  @persist("object")
  @observable
  _visaDetails = {};

  @persist("object")
  @observable
  _homeScreenDetails = {};

  /**
   * VisaList is independent of itineraries. It always only contains all visas INSIDE the current itinerary.
   */
  @persist("list")
  @observable
  _visaList = [];

  @persist("list")
  @observable
  _selectedVisaChecklistItems = [];

  @persist
  @observable
  _isVisaInitialized = false;

  @persist
  @observable
  _isVisaAvailable = false;

  @observable
  _isVisaDetailsLoading = false;

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._visaDetails = {};
    this._homeScreenDetails = {};
    this._visaList = [];
    this._isVisaInitialized = false;
    this._isVisaAvailable = false;
    this._selectedVisaChecklistItems = [];
    this._isVisaDetailsLoading = false;
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

  @computed
  get selectedVisaChecklistItems() {
    return toJS(this._selectedVisaChecklistItems) || [];
  }

  @computed
  get isVisaAvailable() {
    return this._isVisaAvailable;
  }

  @computed
  get isVisaDetailsLoading() {
    return this._isVisaDetailsLoading;
  }

  /**
   * This method looks at 2 flags from the backend to see if we should display the VisaSuccess animated screen.
   * 1. `isGranted` tells us if the Visa has been granted or not.
   * 2. `showVisaAnimation` tells us if the user has already seen the VisaSuccess screen.
   *
   * We loop over all the visas the user has, and returns `true` only when EVERY visa has been granted.
   */
  @computed
  get shouldDisplaySuccessAnimation() {
    try {
      return this._visaList.reduce((prevVisaStatus, thisVisa) => {
        const visaInfo = _.get(this._visaDetails, `${thisVisa.visaId}`, {});
        return (
          prevVisaStatus &&
          _.get(visaInfo, "isGranted", false) &&
          _.get(visaInfo, "showVisaAnimation", false)
        );
      }, true);
    } catch (e) {
      logError(e, {
        type: "Failed to get status of the visa success animation",
        visaList: toJS(this._visaList),
        visaDetails: toJS(this._visaDetails)
      });
      return false;
    }
  }

  isVisaHelpDataAvailable = createTransformer((visaId = "") => {
    return !!(_.get(this._visaDetails[visaId], "visaHelpData") || []).length;
  });

  /**
   * This method will retrieve the visa details of an itinerary stored in the local mobx store
   */
  getVisaDetailsByItineraryId = createTransformer((itineraryId = "") => {
    if (this._visaDetails[itineraryId]) {
      return toJS(this._visaDetails[itineraryId]);
    } else {
      return [];
    }
  });

  @action
  updateUserHasSeenSuccessAnimation = () => {
    return new Promise((resolve, reject) => {
      apiCall(
        CONSTANT_updateVisaSuccessAnimationSeen,
        {
          showAnimation: false
        },
        "PATCH"
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(() => {
          reject();
        });
    });
  };

  /**
   * This will fetch visa details of an itinerary from the api based on the
   * required visaId
   */
  @action
  loadVisaDetails = visaId => {
    this._isVisaDetailsLoading = true;
    return new Promise((resolve, reject) => {
      const requiredVisa =
        this.visaList.find(visa => visa.visaId === visaId) || {};
      apiCall(
        `${constants.getVisaDetails.replace(":visaId", visaId)}?visaType=${
          requiredVisa.visaType
        }`
      )
        .then(response => {
          this._isVisaDetailsLoading = false;
          if (response.status === constants.responseSuccessStatus) {
            const visaDetails = toJS(this._visaDetails);
            visaDetails[visaId] = response.data;
            this._visaDetails = visaDetails;
            resolve(response.data);
          }
        })
        .catch(() => {
          this._isVisaDetailsLoading = false;
          reject();
        });
    });
  };

  /**
   * This will fetch all the visa details associated with an itinerary without
   * the need for visaId
   */
  @action
  loadAllVisaDetails = () => {
    try {
      this.visaList.forEach(visa => this.loadVisaDetails(visa.visaId));
    } catch (e) {
      logError(e, {
        type: "failed to fetch visa details from the API",
        visaList: toJS(this._visaList)
      });
    }
  };

  getVisaDetails = createTransformer((visaId = "") => {
    try {
      return toJS(this._visaDetails[visaId] || {});
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getHelpSectionsByVisaId = createTransformer((visaId = "") => {
    try {
      return toJS((this._visaDetails[visaId] || {}).visaHelpData || []);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  getMaritalStatusesByVisaId = createTransformer((visaId = "") => {
    try {
      const visaDetails = this._visaDetails[visaId];
      const { visaDocsMetaDetails = {} } = visaDetails;
      const { maritialStatusMap = [] } = visaDocsMetaDetails;
      return toJS(maritialStatusMap);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  getDocumentMustKnowsByVisaId = createTransformer((visaId = "") => {
    try {
      const visaDetails = this._visaDetails[visaId];
      const { visaDocsMetaDetails = {} } = visaDetails;
      const { visaDocsFooter = {} } = visaDocsMetaDetails;
      const { title = "", body = "" } = visaDocsFooter;
      return { title, body };
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getEmploymentTypesByVisaId = createTransformer((visaId = "") => {
    try {
      const visaDetails = this._visaDetails[visaId];
      const { visaDocsMetaDetails = {} } = visaDetails;
      const { employmentTypeMap = [] } = visaDocsMetaDetails;
      return toJS(employmentTypeMap);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  getChecklistItemsBySelectedOptions = createTransformer(
    ({ visaId, maritalStatus, employmentType } = {}) => {
      try {
        const visaDetails = this._visaDetails[visaId];
        const { visaDocsMetaDetails = {} } = visaDetails;
        const { docsCheckList = {} } = visaDocsMetaDetails;
        return toJS(
          docsCheckList[`${employmentType}###${maritalStatus}`] || {}
        );
      } catch (e) {
        logError(e);
        return {};
      }
    }
  );

  /**
   * Used to initiate a visa process
   * Visa details will not be available unless this method is called
   */
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
            /**
             * Home screen details should be fetched to prevent
             * user from going back to the visa welcome screen
             */
            this.getVisaHomeScreenDetails();
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
  };

  @action
  loadVisaChecklistStatus = visaId => {
    return new Promise((resolve, reject) => {
      apiCall(`${constants.visaChecklistDetails}?visaId=${visaId}`, {}, "GET")
        .then(response => {
          if ((response.status = constants.responseSuccessStatus)) {
            const selectedItems = _.get(response, "data.selected");
            if (selectedItems) {
              this._selectedVisaChecklistItems = selectedItems;
            }
            resolve();
          } else {
            // toastBottom(constants.visaScreenText.failedToLoadChecklistData);
            reject();
          }
        })
        .catch(() => {
          reject();
          // toastBottom(constants.visaScreenText.failedToLoadChecklistData)
        });
    });
  };

  @action
  toggleVisaChecklistItem = (
    visaId,
    mstatus,
    empType,
    selected,
    isDeleteMode
  ) => {
    return new Promise((resolve, reject) => {
      const requestBody = {
        visaId,
        mstatus,
        empType,
        selected: [selected]
      };
      const requestMethod = isDeleteMode ? "DELETE" : "POST";
      apiCall(constants.visaChecklistDetails, requestBody, requestMethod)
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            this.loadVisaChecklistStatus(visaId)
              .then(() => {
                resolve();
              })
              .catch(() => reject());
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  /**
   * Fetch the home screen details of the visa
   * The home screen details are shown only until the visa is initiated.
   *
   * The `_visaList` must be resetted to empty array if visa is not initiated.
   * Otherwise, it will cause problems with visa opener
   */
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
          this._isVisaAvailable = _.get(response, "data.visaAvailable");
          if (this._isVisaInitialized) {
            this._visaList = _.get(response, "data.visaList") || [];
          } else {
            this._homeScreenDetails = response.data;
            this._visaList = [];
          }
        } else {
          toastBottom(constants.visaScreenText.failedToLoadVisaData);
        }
      })
      .catch(() => null);
  };

  @action
  visaGranted = (visaId, requestUrl) => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestBody = {
        visaStatus: "APPROVED",
        visaId,
        itineraryId
      };
      apiCall(requestUrl, requestBody)
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            this.loadVisaDetails()
              .then(resolve)
              .catch(reject);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  };

  @action
  visaRejected = (visaId, requestUrl) => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestBody = {
        visaStatus: "REJECTED",
        visaId,
        itineraryId
      };
      apiCall(requestUrl, requestBody)
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            this.loadVisaDetails()
              .then(resolve)
              .catch(reject);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  };

  getVisaDetailsById = createTransformer((visaId = "") => {
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
    visaList,
    isVisaAvailable
  }) => {
    if (!isVisaAvailable) {
      navigation.navigate("Visa");
    } else if (isVisaInitialized && isSingleVisa) {
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
