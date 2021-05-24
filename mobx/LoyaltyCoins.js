import {observable, computed, action, toJS} from 'mobx';
import {persist} from 'mobx-persist';
import apiCall from '../Services/networkRequests/apiCall';
import constants from '../constants/constants';
import {CONSTANT_LOYALTY_CREDITS} from '../constants/apiUrls';

class LoyaltyCoins {
  @persist('object')
  @observable
  _loyaltyCoins = {};

  reset = () => {
    this._loyaltyCoins = {};
  };

  @observable _isLoading = false;

  @observable _hasError = false;

  @computed
  get loyaltyCoins() {
    return toJS(this._loyaltyCoins);
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
  getLoyaltyCoins = userId => {
    this._isLoading = true;
    apiCall(
      CONSTANT_LOYALTY_CREDITS({userId, includeReferral: true}),
      {},
      'GET',
      constants.productUrl,
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === 'SUCCESS') {
          this._hasError = false;
          this._loyaltyCoins = response.data;
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

export default LoyaltyCoins;
