import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist/lib/index";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Phrases {
  @persist("object")
  @observable
  _phrases = {};
  @observable _isLoading = false;
  @observable _isTranslating = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._phrases = {};
    this._isLoading = false;
    this._isTranslating = false;
    this._hasError = false;
  };

  @action
  getAllPhrases = () => {
    this._isLoading = true;
    apiCall(constants.getAllPhrases, {}, "GET", false, false)
      .then(response => {
        this._isLoading = false;
        this._hasError = false;
        console.log(response);
        debugger;
      })
      .catch(() => {
        this._isLoading = false;
        this._hasError = true;
      });
  };

  constructor() {
    this.getAllPhrases();
  }
}

export default Phrases;
