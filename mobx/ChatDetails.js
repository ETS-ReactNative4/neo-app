import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import apiCall from "../Services/networkRequests/apiCall";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";

class ChatDetails {
  static hydrator = storeInstance => {
    hydrate("_chatDetails", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate("_chatActivationTime", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate("_chatActivationMessage", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate("_offlineContact", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

  @action
  reset = () => {
    this._chatDetails = {};
    this._chatActivationTime = 0;
    this._chatActivationMessage = constants.preTripChatText;
    this._offlineContact = "";
  };

  @persist("object")
  @observable
  _chatDetails = {};

  @persist
  @observable
  _offlineContact = "";

  @observable _isLoading = false;

  @observable _initializationError = false;

  @observable _metaDataError = false;

  @observable _isChatActive = false;

  @persist
  @observable
  _chatActivationTime = 0;

  @persist
  @observable
  _chatActivationMessage = constants.preTripChatText;

  @computed
  get chatActivationMessage() {
    return this._chatActivationMessage;
  }

  @computed
  get offlineContact() {
    return this._offlineContact;
  }

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
    const initializationUrl = `${constants.initiateChat}?itineraryId=${
      storeService.itineraries.selectedItineraryId
    }`;
    apiCall(initializationUrl)
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._isChatActive = true;
          this._chatDetails = response.data;
          this._initializationError = false;
          this._offlineContact = response.data.offlineContact;
        } else if (response.status === "NOT_INITIATED") {
          this._isChatActive = false;
          this._initializationError = false; // Chat not initiated but initialization call is success
          this._chatActivationTime = response.data.departureDateMillis;
          this._chatActivationMessage =
            response.data.displayMsg || constants.preTripChatText;
          this._offlineContact = response.data.offlineContact;
        } else {
          logError("Chat failed to Initialize", {
            response,
            initializationUrl
          });
          this._initializationError = true;
        }
      })
      .catch(err => {
        logError("Chat failed to Initialize", { err, initializationUrl });
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
          logError("Chat failed to register restore ID", {
            requestBody,
            response
          });
          this._metaDataError = true;
        }
      })
      .catch(err => {
        logError("Chat failed to register restore ID", { requestBody, err });
        this._metaDataError = true;
        this._isLoading = false;
      });
  };
}

export default ChatDetails;
