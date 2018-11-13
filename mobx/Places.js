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
  // @persist("object")
  @observable _textSearches = {};
  // @persist("object")
  @observable _placesList = {};
  @observable _selectedPlace = "";
  @observable _isLoading = false;
  @observable _isPlaceLoading = false;
  @observable _isNextPageLoading = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._selectedCity = {};
    this._cityCategories = {};
    this._textSearches = {};
    this._placesList = {};
    this._selectedPlace = "";
    this._isLoading = false;
    this._hasError = false;
  };

  @computed
  get selectedCity() {
    return this._selectedCity;
  }

  @computed
  get selectedPlace() {
    return this._selectedPlace;
  }

  @computed
  get isNextPageLoading() {
    return this._isNextPageLoading;
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
  get isPlaceLoading() {
    return this._isPlaceLoading;
  }

  /**
   * TODO: Better way to use empty objects instead of try-catch (creates sentry entry)
   */
  @computed
  get categories() {
    try {
      const category = get(
        this._cityCategories,
        this._selectedCity.cityObject.cityId
      );
      if (category) return toJS(category);
      else return {};
    } catch (e) {
      // logError(e);
      return {};
    }
  }

  @action
  selectPlace = place => {
    this._selectedPlace = place.placeId;
    this.loadPlace(place);
  };

  @action
  unSelectPlace = () => {
    this._selectedPlace = "";
  };

  @action
  loadPlace = place => {
    if (!this._placesList[place.placeId]) {
      this._isPlaceLoading = true;
      apiCall(
        constants.getPlaceDetails.replace(":placeId", place.placeId),
        {},
        "GET"
      )
        .then(response => {
          this._isPlaceLoading = false;
          if (response.status === "SUCCESS") {
            this._hasError = false;
            const placesList = toJS(this._placesList);
            placesList[place.placeId] = {
              ...response.data.result,
              ...place,
              photos: response.data.result.photos
            };
            this._placesList = placesList;
          } else {
            this._hasError = true;
          }
        })
        .catch(err => {
          this._isPlaceLoading = false;
          this._hasError = true;
        });
    }
  };

  getPlaceById = createTransformer(placeId => {
    if (this._placesList[placeId]) {
      return toJS(this._placesList[placeId]);
    } else {
      return {};
    }
  });

  @action
  loadTextSearch = text => {
    this._isLoading = true;
    apiCall(
      constants.googleTextSearch.replace(":keyword", encodeURIComponent(text)),
      {},
      "GET"
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const textSearches = toJS(this._textSearches);
          textSearches[text] = {
            searchResults: response.data.results,
            token: response.data.nextPageToken
          };
          this._textSearches = textSearches;
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
  paginateTextSearch = (text, token) => {
    this._isNextPageLoading = true;
    apiCall(
      `${constants.googleTextSearch.replace(
        ":keyword",
        encodeURIComponent(text)
      )}?pageToken=${token}`,
      {},
      "GET"
    )
      .then(response => {
        this._isNextPageLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const textSearches = toJS(this._textSearches);
          const oldResults = textSearches[text].searchResults;
          textSearches[text] = {
            searchResults: [...oldResults, ...response.data.results],
            token: response.data.nextPageToken
          };
          this._textSearches = textSearches;
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isNextPageLoading = false;
        this._hasError = true;
      });
  };

  getSearchResultsByText = createTransformer(text => {
    if (this._textSearches[text]) {
      return toJS(this._textSearches[text]);
    } else {
      return {
        searchResults: [],
        token: ""
      };
    }
  });

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
          const cityCategories = toJS(this._cityCategories);
          cityCategories[cityId] = response.data;
          this._cityCategories = cityCategories;
          // set(this._cityCategories, `${cityId}`, response.data);
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._hasError = true;
        this._isLoading = false;
      });
  };
}

export default Places;
