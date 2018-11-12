import { observable, computed, action, toJS, set, get } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";

class Places {
  @observable _selectedCity = {};
  @persist("object")
  @observable
  _cityCategories = {};
  @observable _isLoading = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._selectedCity = {};
    this._cityCategories = {};
    this._isLoading = false;
    this._hasError = false;
  };

  @computed
  get selectedCity() {
    return this._selectedCity;
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  @computed
  get categories() {
    try {
      return toJS(
        get(this._cityCategories, this._selectedCity.cityObject.cityId)
      );
    } catch (e) {
      logError(e);
      return {};
    }
  }

  @action
  selectCity = city => {
    this._selectedCity = city;
    this.loadCityCategory(city.cityObject.cityId);
  };

  @action
  loadCityCategory = cityId => {
    if (!this._cityCategories[cityId]) this._loadCityCategoryFromAPI(cityId);
  };

  @action
  _loadCityCategoryFromAPI = cityId => {
    this._isLoading = true;
    apiCall(`${constants.getCityPlaceCategory}?city=${cityId}`, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          // TODO: Handle Success
        } else {
          this._hasError = true;
          set(this._cityCategories, `${cityId}`, {
            Shopping: [
              {
                category: "Malls",
                image: ""
              },
              {
                category: "abc",
                image: "abc"
              }
            ],
            Food: [
              {
                category: "Indian",
                image: ""
              }
            ]
          });
        }
      })
      .catch(err => {
        this._hasError = true;
        this._isLoading = false;
      });
  };
}

export default Places;
