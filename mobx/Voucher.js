import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { createTransformer } from "mobx-utils";
import { logError } from "../Services/errorLogger/errorLogger";
import _ from "lodash";

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
  reset = () => {
    this._isLoading = false;
    this._loadingError = false;
    this._vouchers = [];
    this._selectedVoucher = {};
  };

  @action
  getVouchers = itineraryId => {
    return new Promise((resolve, reject) => {
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
            resolve(newVoucher);
          } else {
            this._loadingError = true;
            reject();
          }
        })
        .catch(error => {
          this._isLoading = false;
          this._loadingError = true;
          reject(error);
        });
    });
  };

  @action
  selectVoucher = itineraryId => {
    return new Promise((resolve, reject) => {
      const selectedVoucher = this._vouchers.find(
        voucher => voucher.itineraryId === itineraryId
      );
      if (selectedVoucher) {
        this._selectedVoucher = selectedVoucher;
        resolve(selectedVoucher);
      } else {
        this.getVouchers(itineraryId)
          .then(newVoucher => {
            resolve(newVoucher);
          })
          .catch(reject);
      }
    });
  };

  @action
  updateVoucher = itineraryId => {
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
          this._selectedVoucher = newVoucher;
          for (let i = 0; i < this._vouchers.length; i++) {
            const voucher = this._vouchers[i];
            if (voucher.itineraryId === itineraryId) {
              this._vouchers.splice(i, 1);
              this._vouchers.push(newVoucher);
              break;
            }
          }
        } else {
          this._loadingError = true;
        }
      })
      .catch(() => {
        this._isLoading = false;
        this._loadingError = true;
      });
  };

  getHotelVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.hotelVouchers
        ? toJS(
            this._selectedVoucher.hotelVouchers.find(
              hotel => id === hotel.hotelCostingId || id === hotel.identifier
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getFlightVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.flightVouchers
        ? toJS(
            this._selectedVoucher.flightVouchers.find(
              flight =>
                id === flight.flightCostingId || id === flight.identifier
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getActivityVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.activityVouchers
        ? toJS(
            this._selectedVoucher.activityVouchers.find(
              activity =>
                id === activity.identifier || id === activity.activityCostingId
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getTransferVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.transferVouchers
        ? toJS(
            this._selectedVoucher.transferVouchers.find(
              transfer =>
                id === transfer.transferCostingId || id === transfer.identifier
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getRentalCarVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.rentalCarVouchers
        ? toJS(
            this._selectedVoucher.rentalCarVouchers.find(
              rentalCar =>
                id === rentalCar.identifier || id === rentalCar.rcCostingId
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getFerryVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.ferryVouchers
        ? toJS(
            this._selectedVoucher.ferryVouchers.find(
              ferry => id === ferry.identifier || id === ferry.ferryCostingId
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getTrainVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.trainVouchers
        ? toJS(
            this._selectedVoucher.trainVouchers.find(
              train => id === train.identifier || id === train.trainCostingId
            )
          )
        : [];
    } catch (e) {
      logError(e);
      return {};
    }
  });

  /**
   * This will retrieve the voucher url details of the insurance
   * Requires costing id of the voucher and costing to match.
   */
  getInsuranceVoucherById = createTransformer(id => {
    if (_.isEmpty(this._selectedVoucher)) {
      return {};
    }
    try {
      return this._selectedVoucher.insuranceVoucher
        ? this._selectedVoucher.insuranceVoucher.costingId === id
          ? toJS(this._selectedVoucher.insuranceVoucher)
          : {}
        : {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

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
