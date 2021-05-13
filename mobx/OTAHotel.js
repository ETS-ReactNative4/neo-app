import {observable, computed, action, toJS} from 'mobx';
import {createTransformer} from 'mobx-utils';
import {persist} from 'mobx-persist';
import apiCall from '../Services/networkRequests/apiCall';
import constants from '../constants/constants';

class OTAHotel {
  @persist('object')
  @observable
  _hotels = {};

  reset = () => {
    this._hotels = {};
  };

  @observable _hotelSearchRequest = {};

  @observable _isLoading = false;

  @observable _hasError = false;

  @observable _displayCurrency = 'INR';

  @computed
  get hotels() {
    return toJS(this._hotels);
  }

  @computed
  get displayCurrency() {
    return this._displayCurrency;
  }

  @computed
  get hotelSearchRequest() {
    return toJS(this._hotelSearchRequest);
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  @action
  getHotelList = requestBody => {
    this._isLoading = true;

    this._hotelSearchRequest = requestBody;
    if (requestBody.filters) {
      requestBody.filters.sortingCategory = 'SOURCEPROVIDER';
    } else {
      requestBody.filters = {
        sortingCategory: 'SOURCEPROVIDER',
      };
    }
    apiCall(
      `${constants.getHotelList}`,
      requestBody,
      'POST',
      constants.productUrl,
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === 'SUCCESS') {
          this._hasError = false;
          this._hotels = response.data;
          this._displayCurrency = response.displayCurrency || 'INR';
        } else {
          this._hasError = true;
        }
      })
      .catch(error => {
        this._isLoading = false;
        this._hasError = true;
      });
  };
}

export default OTAHotel;
