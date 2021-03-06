import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import _ from "lodash";
import DebouncedAlert from "../CommonComponents/DebouncedAlert/DebouncedAlert";
import { LayoutAnimation } from "react-native";
import { toastShort } from "../Services/toast/toast";

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
  /**
   * TODO: Make the object 2D Array for multiple itineraries
   */
  @persist("object")
  @observable
  _languages = {
    itineraryId: "",
    languages: [{ language: "", languageCode: "" }]
  };
  @persist("list")
  @observable
  _pinnedPhrases = [];
  @observable _selectedLanguage = { language: "", languageCode: "" };

  @action
  reset = () => {
    this._phrases = {};
    this._selectedPhrase = "";
    this._translatedPhrase = "Select a phrase to translate...";
    this._translatedPhrases = {};
    this._isLoading = false;
    this._isTranslating = false;
    this._translatingError = false;
    this._hasError = false;
    this._languages = {
      itineraryId: "",
      languages: [{ language: "", languageCode: "" }]
    };
    this._pinnedPhrases = [];
    this._selectedLanguage = { language: "", languageCode: "" };
  };

  @action
  _translatePhrase = (phrase, targetLanguage) => {
    const translatedPhrases = this._translatedPhrases[targetLanguage];
    if (translatedPhrases) {
      const translatedPhrase = _.find(translatedPhrases, { phrase });
      if (translatedPhrase) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this._translatingError = false;
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
    if (targetLanguage === "en") {
      if (this._translatedPhrase[targetLanguage]) {
        this._translatedPhrases[targetLanguage].push({
          phrase,
          translation: phrase
        });
      } else {
        this._translatedPhrase[targetLanguage] = [
          {
            phrase,
            translation: phrase
          }
        ];
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this._translatedPhrase = phrase;
    } else {
      const requestBody = {
        text: phrase,
        targetLanguage
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this._isTranslating = true;
      apiCall(constants.translatePhrase, requestBody)
        .then(response => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this._translatedPhrase = response.data;
          } else {
            toastShort(constants.phrasesTranslationFailedText);
            this._translatingError = true;
          }
        })
        .catch(err => {
          toastShort(constants.phrasesTranslationFailedText);
          this._isTranslating = false;
          this._translatingError = true;
        });
    }
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
            this._phrases = response.data.phrases;
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

  /**
   * Will fetch all the languages associated with an itinerary and creates an array of languages
   * Currently the default language to be displayed is the first element of the array
   * TODO: handle default language as per the country the user is currently on
   */
  @action
  getLanguages = itineraryId => {
    this._isLoading = true;
    apiCall(`${constants.getLanguages}?itineraryId=${itineraryId}`, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          const languages = _.compact(
            // remove null or undefined values from array
            _.uniqBy(
              // filter unique languages
              _.flatten(
                // flatten multiple country languages into a single array
                response.data.map(country => {
                  return [
                    country.defaultCode,
                    ...(Array.isArray(country.languageCodes)
                      ? country.languageCodes.map(language => {
                          return language;
                        })
                      : [])
                  ];
                })
              ),
              "language"
            )
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
  };

  @action
  getPinnedPhrases = () => {
    apiCall(constants.getPinnedPhrases)
      .then(response => {
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._pinnedPhrases = response.data.checked;
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._hasError = true;
      });
  };

  @action
  pinPhrase = phrase => {
    if (this._pinnedPhrases.indexOf(phrase) === -1) {
      const requestBody = {
        checked: [phrase]
      };
      this._pinnedPhrases.push(phrase);
      const failed = () => {
        const pinIndex = this._pinnedPhrases.indexOf(phrase);
        this._pinnedPhrases.splice(pinIndex, 1);
      };
      apiCall(constants.pinPhrase, requestBody)
        .then(response => {
          if (response.status === "SUCCESS") {
          } else {
            DebouncedAlert("Error", "Unable to Pin the phrase...");
            failed();
          }
        })
        .catch(err => {
          DebouncedAlert("Error", "Unable to pin.. Internal Server Error!");
          failed();
        });
    }
  };

  @action
  unPinPhrase = phrase => {
    if (this._pinnedPhrases.indexOf(phrase) > -1) {
      const requestBody = {
        removed: [phrase]
      };
      const pinIndex = this._pinnedPhrases.indexOf(phrase);
      this._pinnedPhrases.splice(pinIndex, 1);
      const failed = () => {
        this._pinnedPhrases.splice(pinIndex, 0, phrase);
      };
      apiCall(constants.pinPhrase, requestBody)
        .then(response => {
          if (response.status === "SUCCESS") {
          } else {
            DebouncedAlert("Error", "Unable to unpin the phrase...");
            failed();
          }
        })
        .catch(err => {
          DebouncedAlert(
            "Error",
            "Unable to remove pin.. Internal Server Error!"
          );
          failed();
        });
    }
  };

  @action
  selectLanguage = languageObject => {
    this._selectedLanguage = languageObject;
    if (this._selectedPhrase) {
      this.selectPhrase(this._selectedPhrase, languageObject.language);
    }
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
  get pinnedPhrases() {
    return toJS(this._pinnedPhrases);
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

  @computed
  get translatingError() {
    return this._translatingError;
  }
}

export default Phrases;
