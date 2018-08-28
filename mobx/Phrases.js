import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist/lib/index";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import _ from "lodash";

class Phrases {
  @persist("object")
  @observable
  _phrases = {};
  @persist("object")
  @observable
  _translatedPhrases = {};
  @persist
  @observable
  _selectedPhrase = "";
  @persist
  @observable
  _translatedPhrase = "";
  @observable _isLoading = false;
  @observable _isTranslating = false;
  @observable _translatingError = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._phrases = {};
    this._selectedPhrase = "";
    this._translatedPhrase = "";
    this._translatedPhrases = {};
    this._isLoading = false;
    this._isTranslating = false;
    this._hasError = false;
  };

  @action
  _translatePhrase = (phrase, targetLanguage) => {
    const translatedPhrases = this._translatedPhrases[targetLanguage];
    if (translatedPhrases) {
      const translatedPhrase = _.find(translatedPhrases, { phrase });
      if (translatedPhrase) {
        this._translatedPhrase = translatedPhrase.translation;
      } else {
        this._networkTranslate(phrase, targetLanguage);
      }
    } else {
      this._networkTranslate(phrase, targetLanguage);
    }
  };

  @action
  _networkTranslate = (phrase, targetLanguage) => {
    const requestBody = {
      text: phrase,
      targetLanguage
    };
    this._isTranslating = true;
    apiCall(constants.translatePhrase, requestBody)
      .then(response => {
        this._isTranslating = false;
        if (response.status === "SUCCESS") {
          this._translatingError = false;
          if (this._translatedPhrases[targetLanguage]) {
            this._translatedPhrases[targetLanguage].push({
              phrase,
              translation: response.data
            });
          } else {
            this._translatedPhrases[targetLanguage] = [
              { phrase, translation: response.data }
            ];
          }
          this._translatedPhrase = response.data;
        } else {
          this._translatingError = true;
        }
      })
      .catch(err => {
        this._isTranslating = false;
        this._translatingError = true;
      });
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

  @action
  selectPhrase = (phrase, targetLanguage) => {
    this._selectedPhrase = phrase;
    this._translatePhrase(phrase, targetLanguage);
  };

  @computed
  get phrases() {
    return toJS(this._phrases);
  }

  @computed
  get selectedPhrase() {
    return this._selectedPhrase;
  }

  @computed
  get translatedPhrase() {
    return this._translatedPhrase;
  }

  @computed
  get isTranslating() {
    return this._isTranslating;
  }

  constructor() {
    this.getAllPhrases();
  }
}

export default Phrases;
