import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import storeService from "../Services/storeService/storeService";

class DataRefresh {
  _timeConfig = {
    itineraries: 1800000, // 30 mins
    voucher: 1800000, // 30 mins
    emergencyContacts: 86400000, // 1 day
    passportDetails: 86400000, // 1 day
    commonPhrases: 86400000, // 1 day
    visa: 86400000, // 1 day
    faq: 86400000 // 1 day
  };

  @persist("object")
  @observable
  _lastUpdated = {
    itineraries: 0,
    voucher: 0,
    emergencyContacts: 0,
    passportDetails: 0,
    commonPhrases: 0,
    visa: 0,
    faq: 0
  };

  @computed
  get lastUpdated() {
    return this._lastUpdated;
  }

  get timeConfig() {
    return toJS(this._timeConfig);
  }

  @action
  updateData = () => {
    const currentTime = Date.now();

    const { selectedItineraryId } = storeService.itineraries;

    if (!this._lastUpdated) this._lastUpdated = {};

    const isExpired = key => {
      return (
        !this.lastUpdated[key] ||
        currentTime - this.lastUpdated[key] > this.timeConfig[key]
      );
    };

    if (selectedItineraryId) {
      if (isExpired("itineraries")) {
        storeService.itineraries.updateItineraryDetails(selectedItineraryId);
        this._lastUpdated.itineraries = Date.now();
      }

      if (isExpired("voucher")) {
        storeService.voucherStore.updateVoucher(selectedItineraryId);
        this._lastUpdated.voucher = Date.now();
      }

      if (isExpired("emergencyContacts")) {
        storeService.emergencyContactsStore.getEmergencyContactsFromAPI(
          storeService.itineraries.cities
        );
        this._lastUpdated.emergencyContacts = Date.now();
      }

      if (isExpired("passportDetails")) {
        storeService.passportDetailsStore.updatePassportDetails(
          selectedItineraryId
        );
        this._lastUpdated.passportDetails = Date.now();
      }

      /**
       * TODO: Common phrases need a change in store structure to refresh data
       */

      if (isExpired("visa")) {
        storeService.visaStore.getVisaDetailsFromAPI(selectedItineraryId);
        this._lastUpdated.visa = Date.now();
      }

      if (isExpired("faq")) {
        storeService.supportStore.loadFaqDetails();
        this._lastUpdated.faq = Date.now();
      }
    }
  };
}

export default DataRefresh;
