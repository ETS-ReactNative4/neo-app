import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import { createTransformer } from "mobx-utils";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class AppState {
  /**
   * Trip Toggle Button
   */
  @action
  reset = () => {
    this._tripMode = {
      status: false
    };
  };

  @persist("object")
  @observable
  _tripMode = {
    status: false
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
    apiCall(constants.getCurrencyRates, {}, "GET", "http://www.apilayer.net/")
      .then(response => {
        this._conversionRates = response;
      })
      .catch(e => {
        console.error(e);
      });
  };

  currencyConverter = createTransformer(({ amount, from, to }) => {
    const quotes = this.conversionRates.quotes;

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
}

export default AppState;
