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
  @observable _textSearches = {};
  @observable _locationSearches = {};
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
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const textSearches = toJS(this._textSearches);
          textSearches[text] = {
            searchResults: response.data.results,
            token: response.data.nextPageToken
          };
          this._textSearches = textSearches;
          this._isLoading = false;
        } else {
          this._isLoading = false;
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
    if (token) {
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
          if (response.status === "SUCCESS") {
            this._hasError = false;
            const textSearches = toJS(this._textSearches);
            const oldResults = textSearches[text].searchResults;
            const oldToken = textSearches[text].token;
            const newToken = response.data.nextPageToken;
            textSearches[text] = {
              searchResults: [...oldResults, ...response.data.results],
              token: oldToken !== newToken ? newToken : null
            };
            this._textSearches = textSearches;
            this._isNextPageLoading = false;
          } else {
            this._isNextPageLoading = false;
            this._hasError = true;
          }
        })
        .catch(err => {
          this._isNextPageLoading = false;
          this._hasError = true;
        });
    }
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
  loadLocationSearch = ({ lat, lng, keyword, token }) => {
    this._isLoading = true;
    const requestObject = {
      location: {
        lat,
        lng
      },
      keyword,
      rankBy: true
    };
    if (token) requestObject.token = token;
    apiCall(constants.googleNearBySearch, requestObject)
      .then(response => {
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const locationSearches = toJS(this._locationSearches);
          const key = `${lat},${lng}`;
          locationSearches[key] = {
            searchResults: response.data.results,
            token: response.data.nextPageToken
          };
          this._locationSearches = locationSearches;
          this._isLoading = false;
        } else {
          this._isLoading = false;
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isLoading = false;
        this._hasError = true;
      });
  };

  @action
  paginateLocationSearch = ({ lat, lng, keyword, token }) => {
    if (token) {
      this._isNextPageLoading = true;
      const requestObject = {
        location: {
          lat,
          lng
        },
        keyword,
        token,
        rankBy: true
      };
      apiCall(constants.googleNearBySearch, requestObject)
        .then(response => {
          if (response.status === "SUCCESS") {
            this._hasError = false;
            const locationSearches = toJS(this._locationSearches);
            const key = `${lat},${lng}`;
            const oldResults = locationSearches[key].searchResults;
            const oldToken = locationSearches[key].token;
            const newToken = response.data.nextPageToken;
            locationSearches[key] = {
              searchResults: [...oldResults, ...response.data.results],
              token: oldToken !== newToken ? newToken : null
            };
            this._locationSearches = locationSearches;
            this._isNextPageLoading = false;
          } else {
            this._isNextPageLoading = false;
            this._hasError = true;
          }
        })
        .catch(err => {
          this._isNextPageLoading = false;
          this._hasError = true;
        });
    }
  };

  getSearchResultsByLocation = createTransformer(({ lat, lng }) => {
    const key = `${lat},${lng}`;
    if (this._locationSearches[key]) {
      return toJS(this._locationSearches[key]);
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
