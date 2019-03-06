import { observable, computed, action, set, toJS } from "mobx";
import { persist } from "mobx-persist";
import { createTransformer } from "mobx-utils";
import { LayoutAnimation } from "react-native";
import _ from "lodash";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";
import navigationService from "../Services/navigationService/navigationService";
import storeService from "../Services/storeService/storeService";
import { AsyncStorage } from "react-native";
import logOut from "../Services/logOut/logOut";
import isUserLoggedInCallback from "../Services/isUserLoggedInCallback/isUserLoggedInCallback";

const {
  conversionRateError,
  currencyDetailsError
} = constants.currencyConverterText;
const { logOutError } = constants.logOutText;

class AppState {
  @action
  reset = () => {
    this._tripMode = {
      status: false
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
  @observable _isConversionLoading = false;

  @computed
  get conversionRates() {
    return toJS(this._conversionRates);
  }

  @computed
  get isConversionLoading() {
    return this._isConversionLoading;
  }

  @action
  getConversionRates = () => {
    this._isConversionLoading = true;
    apiCall(constants.getCurrencyRates, {}, "GET")
      .then(response => {
        this._isConversionLoading = false;
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
        this._isConversionLoading = false;
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
          currencies[itineraryId] = _.compact(currencyArray);
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
    isUserLoggedInCallback(() => {
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
    });
  };

  removePushToken = callback => {
    const requestBody = {
      deviceToken: this._pushTokens.deviceToken
    };
    isUserLoggedInCallback(credentials => {
      try {
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
              callback();
            } else {
              if (response.status === "EXPIRED") {
                logOut(true);
              } else {
                logError("failed to remove device token during logOut");
                storeService.infoStore.setError(
                  logOutError.title,
                  logOutError.message,
                  constants.errorBoxIllus,
                  logOutError.actionText
                );
              }
            }
          })
          .catch(err => {
            logError(err, {
              eventType: "failed to remove device token during logOut"
            });
            storeService.infoStore.setError(
              logOutError.title,
              logOutError.message,
              constants.errorBoxIllus,
              logOutError.actionText
            );
          });
      } catch (e) {
        logError(e);
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
