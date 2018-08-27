import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist/lib/index";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Phrases {
  @persist("object")
  @observable
  _phrases = {};
  @persist
  @observable
  _selectedPhrase = "";
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
    apiCall(constants.getAllPhrases, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._phrases = response.data;
        } else {
          this._hasError = true;
        }
      })
      .catch(() => {
        this._isLoading = false;
        this._hasError = true;
      });
  };

  @action selectPhrase = phrase => (this._selectedPhrase = phrase);

  @computed
  get phrases() {
    return toJS(this._phrases);
  }

  @computed
  get selectedPhrase() {
    return toJS(this._selectedPhrase);
  }

  constructor() {
    this.getAllPhrases();
  }
}

export default Phrases;
