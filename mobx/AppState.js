import { observable, computed, action, set, toJS } from "mobx";
import { persist } from "mobx-persist";
import { createTransformer } from "mobx-utils";
import uuidv4 from "uuid/v4";
import { NavigationActions } from "react-navigation";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";
import navigationService from "../Services/navigationService/navigationService";
import DebouncedAlert from "../CommonComponents/DebouncedAlert/DebouncedAlert";
import storeService from "../Services/storeService/storeService";
import * as Keychain from "react-native-keychain";

class AppState {
  @action
  reset = () => {
    this._tripMode = {
      status: true
    };
    this._pushTokens = {
      uid: uuidv4(),
      deviceToken: ""
    };
    this._currencies = {};
    this._isChatNotificationActive = false;
  };

  /**
   * Trip Toggle Button
   */
  /**
   * TODO: Status true by default for development
   */
  @persist("object")
  @observable
  _tripMode = {
    status: true
  };

  @action
  setTripMode = status => {
    this._tripMode.status = status;
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
          DebouncedAlert("Unable to get conversion rates!");
        }
      })
      .catch(e => {
        console.error(e);
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
      return toJS(this._currencies[itineraryId]);
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
          DebouncedAlert("Error!", "Unable to retrieve currency details!");
        }
      })
      .catch(err => {
        DebouncedAlert("Error!", "Unable to retrieve currency details!");
      });
  };

  /**
   * Push notification tokens
   */
  @persist("object")
  @observable
  _pushTokens = {
    uid: uuidv4(),
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
      uid: this._pushTokens.uid,
      deviceToken
    };
    Keychain.getGenericPassword().then(credentials => {
      if (credentials && credentials.password) {
        apiCall(constants.registerDeviceToken, requestBody)
          .then(response => {
            if (response.status === "SUCCESS") {
              this._pushTokens.deviceToken = deviceToken;
            } else {
              this._pushTokens = {
                uid: uuidv4(),
                deviceToken: ""
              };
            }
          })
          .catch(err => {
            this._pushTokens = {
              uid: uuidv4(),
              deviceToken: ""
            };
            logError(err, { eventType: "Device token Failed to register" });
          });
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
