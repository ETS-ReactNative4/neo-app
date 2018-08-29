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
  _translatedPhrase = "Select a phrase to translate...";
  @observable _isLoading = false;
  @observable _isTranslating = false;
  @observable _translatingError = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _languages = { itineraryId: "", languages: [] };
  @observable _selectedLanguage = {};

  @action
  reset = () => {
    this._phrases = {};
    this._selectedPhrase = "";
    this._translatedPhrase = "";
    this._translatedPhrases = {};
    this._isLoading = false;
    this._isTranslating = false;
    this._translatingError = false;
    this._hasError = false;
    this._languages = { itineraryId: "", languages: [] };
    this._selectedLanguage = {};
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
    if (_.isEmpty(this.phrases)) {
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
    }
  };

  @action
  getLanguages = itineraryId => {
    if (this._languages.itineraryId !== itineraryId) {
      const requestObject = { itineraryId };
      this._isLoading = true;
      apiCall(constants.getLanguages, requestObject)
        .then(response => {
          this._isLoading = false;
          if (response.status === "SUCCESS") {
            const languages = _.uniqBy(
              _.flatten(
                response.data.map(country => {
                  return country.languageCodes.map(language => {
                    return language;
                  });
                })
              ),
              "language"
            );
            this._languages = {
              itineraryId,
              languages
            };
            this._selectedLanguage = languages[0];
          } else {
            this._hasError = true;
          }
        })
        .catch(err => {
          this._isLoading = false;
          this._hasError = true;
        });
    }
  };

  @action
  selectLanguage = language => {
    this._selectedLanguage = language;
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

  @computed
  get languages() {
    return toJS(this._languages.languages);
  }

  @computed
  get selectedLanguage() {
    return toJS(this._selectedLanguage);
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }
}

export default Phrases;
