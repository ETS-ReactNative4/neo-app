import { observable, computed, action, set, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";

class SupportStore {
  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _faqDetails = {};

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._faqDetails = {};
  };

  @computed
  get faqDetails() {
    return toJS(this._faqDetails);
  }

  getFaqByType = createTransformer(faqSection => {
    try {
      const faqObject = toJS(this._faqDetails[faqSection]);
      return Object.values(faqObject);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  @action
  loadFaqDetails = () => {
    this._isLoading = true;
    apiCall(constants.getFaq, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._faqDetails = response.data.faqs;
        } else {
          storeService.infoStore.setError(
            "Unable to Load FAQ!",
            "Please try again after sometime..."
          );
          this._hasError = true;
        }
      })
      .catch(err => {
        storeService.infoStore.setError(
          "Unable to Load FAQ!",
          "Please try again after sometime..."
        );
        this._isLoading = false;
        this._hasError = true;
      });
  };
}

export default SupportStore;
