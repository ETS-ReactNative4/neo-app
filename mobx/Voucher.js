import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Voucher {
  @observable _isLoading = false;

  @observable _loadingError = false;

  @persist("list")
  @observable
  _vouchers = [];

  @persist("object")
  @observable
  _selectedVoucher = {};

  @action
  getVouchers(itineraryId) {
    const requestBody = {
      itineraryId
    };
    this._isLoading = true;
    apiCall(constants.voucherDetails, requestBody)
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._loadingError = false;
          const newVoucher = {
            itineraryId,
            ...response.data
          };
          this._vouchers.push(newVoucher);
          this._selectedVoucher = newVoucher;
        } else {
          this._loadingError = true;
        }
      })
      .catch(error => {
        this._isLoading = false;
        this._loadingError = true;
      });
  }

  @action
  selectVoucher(itineraryId) {
    const selectedVoucher = this._vouchers.find(
      voucher => voucher.itineraryId === itineraryId
    );
    if (selectedVoucher) {
      this._selectedVoucher = selectedVoucher;
    } else {
      this.getVouchers(itineraryId);
    }
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._loadingError;
  }

  @computed
  get selectedVoucher() {
    return toJS(this._selectedVoucher);
  }
}

export default Voucher;
