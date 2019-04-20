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

  @persist("object")
  @observable
  _chatDetails = {};

  @observable _isLoading = false;

  @observable _hasError = false;

  @computed
  get chatDetails() {
    return toJS(this._chatDetails);
  }

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
          this._chatDetails = response.data;
          this._hasError = false;
        } else {
          this._hasError = true;
        }
      })
      .catch(() => {
        this._hasError = true;
        this._isLoading = false;
      });
  };

  @action
  setChatMetaInfo = (requestBody, successCallback) => {
    this._isLoading = true;
    apiCall(`${constants.setChatRestoreId}`, requestBody, "PUT")
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._hasError = false;
          this._chatDetails.frid = restoreId;
          successCallback();
        } else {
          this._hasError = true;
        }
      })
      .catch(() => {
        this._hasError = true;
        this._isLoading = false;
      });
  };
}

export default ChatDetails;
