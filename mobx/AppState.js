import { observable, computed, action, set, toJS } from "mobx";
import { persist } from "mobx-persist";
import { createTransformer } from "mobx-utils";
import { NavigationActions } from "react-navigation";
import _ from "lodash";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";
import navigationService from "../Services/navigationService/navigationService";
import DebouncedAlert from "../CommonComponents/DebouncedAlert/DebouncedAlert";
import storeService from "../Services/storeService/storeService";
import * as Keychain from "react-native-keychain";
import { AsyncStorage } from "react-native";

const {
  conversionRateError,
  currencyDetailsError
} = constants.currencyConverterText;

class AppState {
  @action
  reset = () => {
    this._tripMode = {
      status: true
    };
    this._currencies = {};
    this._isChatNotificationActive = false;
  };

  /**
   * Trip Toggle Button
   */
  @persist("object")
  @observable
  _tripMode = {
    status: false
  };

  @action
  setTripMode = status => {
    this._tripMode.status = status;
    AsyncStorage.setItem(
      constants.tripToggleStatusStorageKey,
      JSON.stringify(status)
    );
  };

  @computed
  get isTripModeOn() {
    return this._tripMode.status;
  }

  /**
   * Itinerary Selection Menu
   */
  @observable _isItinerarySelectionMenuVisible = false;

  @action
  toggleItinerarySelection = status => {
    this._isItinerarySelectionMenuVisible = status;
  };

  @computed
  get isItinerarySelectionMenuVisible() {
    return this._isItinerarySelectionMenuVisible;
  }

  /**
   * Active Scenes in the navigation stack
   */
  @observable _activeScenes = [];

  @action
  setActiveScenes = activeScenes => {
    this._activeScenes = activeScenes;
  };

  @computed
  get activeScenes() {
    return toJS(this._activeScenes);
  }

  /**
   * Booked Itinerary screen scrolling date selection
   */
  @observable _selectedDate = "";

  @action
  setSelectedDate = date => {
    this._selectedDate = date;
  };

  @computed
  get selectedDate() {
    return this._selectedDate;
  }

  /**
   * Currency Conversion Rates
   */
  @persist("object")
  @observable
  _conversionRates = {};

  @computed
  get conversionRates() {
    return toJS(this._conversionRates);
  }

  @action
  getConversionRates = () => {
    /**
     * TODO: Change api to dev server
     */
    apiCall(constants.getCurrencyRates, {}, "GET")
      .then(response => {
        if (response.status === "SUCCESS") {
          this._conversionRates = response.data;
        } else {
          storeService.infoStore.setError(
            conversionRateError.title,
            conversionRateError.message,
            constants.errorBoxIllus,
            conversionRateError.actionText,
            () => navigationService.navigation._navigation.goBack()
          );
        }
      })
      .catch(e => {
        storeService.infoStore.setError(
          conversionRateError.title,
          conversionRateError.message,
          constants.errorBoxIllus,
          conversionRateError.actionText,
          () => navigationService.navigation._navigation.goBack()
        );
      });
  };

  currencyConverter = createTransformer(({ amount, from, to }) => {
    const quotes = this.conversionRates;

    amount = parseFloat(amount);

    function toUS(actualAmount) {
      const quote = quotes[from];
      return actualAmount / quote;
    }

    function toNative(usAmount) {
      const quote = quotes[to];
      return usAmount * quote;
    }

    const firstConversion = toUS(amount);
    const result = toNative(firstConversion);

    return result.toFixed(2);
  });

  @persist("object")
  @observable
  _currencies = {};

  @computed
  get currencies() {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    if (this._currencies[itineraryId])
      return _.uniq(toJS(this._currencies[itineraryId]));
    else return [];
  }

  @action
  loadCurrencies = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    if (!this._currencies[itineraryId])
      this._getCurrencyByItineraryId(itineraryId);
  };

  @action
  _getCurrencyByItineraryId = itineraryId => {
    apiCall(
      `${constants.getCurrencyList}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        if (response.status === "SUCCESS") {
          // set(
          //   this._currencies,
          //   `${itineraryId}`,
          //   response.data.map(each => each.toUpperCase())
          // );
          let currencyArray = [];
          const currencies = toJS(this._currencies);
          for (let key in response.data) {
            if (response.data.hasOwnProperty(key)) {
              const country = response.data[key];
              currencyArray.push(country.default.toUpperCase());
              currencyArray = [
                ...currencyArray,
                ...country.others.map(each => each.toUpperCase())
              ];
            }
          }
          currencies[itineraryId] = currencyArray;
          this._currencies = currencies;
        } else {
          storeService.infoStore.setError(
            currencyDetailsError.title,
            currencyDetailsError.message,
            constants.errorBoxIllus,
            currencyDetailsError.actionText,
            () => navigationService.navigation._navigation.goBack()
          );
        }
      })
      .catch(err => {
        storeService.infoStore.setError(
          currencyDetailsError.title,
          currencyDetailsError.message,
          constants.errorBoxIllus,
          currencyDetailsError.actionText,
          () => navigationService.navigation._navigation.goBack()
        );
      });
  };

  /**
   * Push notification tokens
   */
  @persist("object")
  @observable
  _pushTokens = {
    deviceToken: ""
  };

  @computed
  get pushTokens() {
    return toJS(this._pushTokens);
  }

  @action
  setPushTokens = deviceToken => {
    if (deviceToken && this._pushTokens.deviceToken !== deviceToken) {
      this._updatePushToken(deviceToken);
    }
  };

  _updatePushToken = deviceToken => {
    const requestBody = {
      deviceToken
    };
    Keychain.getGenericPassword().then(credentials => {
      if (credentials && credentials.password) {
        apiCall(constants.registerDeviceToken, requestBody, "PUT")
          .then(response => {
            if (response.status === "SUCCESS") {
              this._pushTokens.deviceToken = deviceToken;
            } else {
              this._pushTokens.deviceToken = "";
            }
          })
          .catch(err => {
            this._pushTokens.deviceToken = "";
            logError(err, { eventType: "Device token Failed to register" });
          });
      }
    });
  };

  removePushToken = callback => {
    const requestBody = {
      deviceToken: this._pushTokens.deviceToken
    };
    Keychain.getGenericPassword().then(credentials => {
      if (credentials && credentials.password) {
        apiCall(
          constants.registerDeviceToken,
          requestBody,
          "DELETE",
          false,
          credentials.password
        )
          .then(response => {
            if (response.status === "SUCCESS") {
              this._pushTokens = {
                deviceToken: ""
              };
            } else {
              logError("failed to remove device token after logOut");
              this._pushTokens = {
                deviceToken: ""
              };
            }
          })
          .catch(err => {
            this._pushTokens = {
              deviceToken: ""
            };
            logError(err, {
              eventType: "failed to remove device token after logOut"
            });
          });
        callback();
      }
    });
  };

  /**
   * Internet status
   */
  @observable _isConnected = true;

  @computed
  get isConnected() {
    return this._isConnected;
  }

  @action
  setConnectionStatus = status => {
    this._isConnected = status;
  };

  /**
   * Chat Notification
   */
  @observable _isChatNotificationActive = false;

  @computed
  get isChatNotificationActive() {
    return this._isChatNotificationActive;
  }

  @action
  setChatNotification = () => {
    this._isChatNotificationActive = true;
  };

  @action
  clearChatNotification = () => {
    this._isChatNotificationActive = false;
  };
}

export default AppState;
