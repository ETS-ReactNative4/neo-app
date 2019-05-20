import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import apiCall from "../Services/networkRequests/apiCall";
import storeService from "../Services/storeService/storeService";

class ChatDetails {
  static hydrator = storeInstance => {
    hydrate("_chatDetails", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

  @action
  reset = () => {
    this._chatDetails = {};
  };

  @persist("object")
  @observable
  _chatDetails = {};

  @observable _isLoading = false;

  @observable _initializationError = false;

  @observable _metaDataError = false;

  @observable _isChatActive = false;

  @observable _chatActivationTime = 0;

  @computed
  get chatDetails() {
    return toJS(this._chatDetails);
  }

  @computed
  get initializationError() {
    return this._initializationError;
  }

  @computed
  get metaDataError() {
    return this._metaDataError;
  }

  @computed
  get isChatActive() {
    return this._isChatActive;
  }

  @computed
  get chatActivationTime() {
    return this._chatActivationTime;
  }

  /**
   * Retrieve the details needed for initializing chat
   * This also includes the chat token and the host urls
   */
  @action
  getUserDetails = () => {
    this._isLoading = true;
    apiCall(
      `${constants.initiateChat}?itineraryId=${
        storeService.itineraries.selectedItineraryId
      }`
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._isChatActive = true;
          this._chatDetails = response.data;
          this._initializationError = false;
        } else if (response.status === "NOT_INITIATED") {
          this._isChatActive = false;
          this._chatActivationTime = response.data.departureDateMillis;
        } else {
          this._initializationError = true;
        }
      })
      .catch(() => {
        this._initializationError = true;
        this._isLoading = false;
      });
  };

  /**
   * Set meta data - `restoreId` needed to get the chat history
   * Also sends meta data such as `actorId` for use in Plato to send push notifications
   */
  @action
  setChatMetaInfo = (requestBody, successCallback) => {
    this._isLoading = true;
    apiCall(`${constants.setChatRestoreId}`, requestBody, "PUT")
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._metaDataError = false;
          this._chatDetails = {
            ...this.chatDetails,
            frid: requestBody.restoreId
          };
          successCallback();
        } else {
          this._metaDataError = true;
        }
      })
      .catch(() => {
        this._metaDataError = true;
        this._isLoading = false;
      });
  };
}

export default ChatDetails;
