import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { createTransformer } from "mobx-utils";

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
  };

  @action
  selectVoucher = itineraryId => {
    const selectedVoucher = this._vouchers.find(
      voucher => voucher.itineraryId === itineraryId
    );
    if (selectedVoucher) {
      this._selectedVoucher = selectedVoucher;
    } else {
      this.getVouchers(itineraryId);
    }
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
      .catch(error => {
        this._isLoading = false;
        this._loadingError = true;
      });
  };

  getHotelVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.hotelVouchers.find(
        hotel => id === hotel.hotelCostingId || id === hotel.identifier
      )
    )
  );

  getFlightVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.flightVouchers.find(
        flight => id === flight.flightCostingId || id === flight.identifier
      )
    )
  );

  getActivityVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.activityVouchers.find(
        activity =>
          id === activity.identifier || id === activity.activityCostingId
      )
    )
  );

  getTransferVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.transferVouchers.find(
        transfer =>
          id === transfer.transferCostingId || id === transfer.identifier
      )
    )
  );

  getRentalCarVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.rentalCarVouchers.find(
        rentalCar => id === rentalCar.identifier || id === rentalCar.rcCostingId
      )
    )
  );

  getFerryVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.ferryVouchers.find(
        ferry => id === ferry.identifier || id === ferry.ferryCostingId
      )
    )
  );

  getTrainVoucherById = createTransformer(id =>
    toJS(
      this._selectedVoucher.trainVouchers.find(
        train => id === train.identifier || id === train.trainCostingId
      )
    )
  );

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
