import {observable, computed, action, toJS} from 'mobx';
import {persist} from 'mobx-persist';
import apiCall from '../Services/networkRequests/apiCall';
import constants from '../constants/constants';
import {CONSTANT_getCity} from '../constants/apiUrls';

class Cities {
  @persist('object')
  @observable
  _cities = [];

  reset = () => {
    this._cities = [];
  };

  @observable _isLoading = false;

  @observable _hasError = false;

  @computed
  get cities() {
    return toJS(this._cities);
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
  getCityList = requestBody => {
    this._isLoading = true;

    apiCall(`api/${CONSTANT_getCity}`, requestBody, 'GET', constants.productUrl)
      .then(response => {
        this._isLoading = false;
        if (response.status === 'SUCCESS') {
          this._hasError = false;
          const cityList = response.data.map(city => ({
            label: city.name,
            value: city.cityId,
          }));
          this._cities = cityList;
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

export default Cities;
