import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import _ from "lodash";
import moment from "moment";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";

class Itineraries {
  @observable _isLoading = false;

  @observable _loadingError = false;

  @persist("list")
  @observable
  _itineraries = [];

  @persist("object")
  @observable
  _selectedItinerary = {};

  @action
  reset = () => {
    this._isLoading = false;
    this._loadingError = false;
    this._itineraries = [];
    this._selectedItinerary = {};
  };

  @action
  selectItinerary = itineraryId => {
    const selectedItinerary = this._itineraries.find(itineraryDetail => {
      return itineraryDetail.itinerary.itineraryId === itineraryId;
    });
    if (selectedItinerary) {
      this._selectedItinerary = selectedItinerary;
      storeService.voucherStore.selectVoucher(this.selectedItineraryId);
      storeService.emergencyContactsStore.getEmergencyContacts(this.cities);
      storeService.passportDetailsStore.updatePassportDetails(
        this.selectedItineraryId
      );
      storeService.visaStore.getVisaDetails(this.selectedItineraryId);
    } else {
      this.getItineraryDetails(itineraryId);
    }
  };

  @action
  getItineraryDetails = itineraryId => {
    this._isLoading = true;
    const requestBody = {};
    apiCall(
      `${constants.getItineraryDetails}?itineraryId=${itineraryId}`,
      requestBody
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._loadingError = false;
          this._itineraries.push(response.data);
          this._selectedItinerary = response.data;
          storeService.voucherStore.selectVoucher(this.selectedItineraryId);
          storeService.emergencyContactsStore.getEmergencyContacts(this.cities);
          storeService.passportDetailsStore.updatePassportDetails(
            this.selectedItineraryId
          );
          storeService.visaStore.getVisaDetails(this.selectedItineraryId);
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
  updateItineraryDetails = itineraryId => {
    this._isLoading = true;
    const requestBody = {};
    apiCall(
      `${constants.getItineraryDetails}?itineraryId=${itineraryId}`,
      requestBody
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._selectedItinerary = response.data;
          for (let i = 0; i < this._itineraries.length; i++) {
            const itineraryDetail = this._itineraries[i];
            if (itineraryDetail.itinerary.itineraryId === itineraryId) {
              this._itineraries.splice(i, 1);
              this._itineraries.push(response.data);
              break;
            }
          }
          this._loadingError = false;
        } else {
          this._loadingError = true;
        }
      })
      .catch(error => {
        this._isLoading = false;
        this._loadingError = true;
      });
  };

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._loadingError;
  }

  @computed
  get selectedItineraryId() {
    if (_.isEmpty(this._selectedItinerary)) return "";

    try {
      return this._selectedItinerary.itinerary.itineraryId;
    } catch (e) {
      logError(e);
      return "";
    }
  }

  @computed
  get selectedItinerary() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    try {
      return toJS(this._selectedItinerary);
    } catch (e) {
      logError(e);
      return "";
    }
  }

  @computed
  get sortedDays() {
    try {
      const itineraryDayByKey = toJS(this._selectedItinerary.iterDayByKey);
      const days = Object.values(itineraryDayByKey);
      return _.sortBy(days, "dayNum");
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get startEndDates() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    try {
      const sortedDays = this.sortedDays;

      const startDay = sortedDays[0];
      const lastDay = sortedDays[sortedDays.length - 1];
      const startDate = startDay.dayTs
        ? moment(startDay.dayTs).toDate()
        : moment(
            `${startDay.day}-${startDay.mon}-${constants.currentYear}`,
            "DD-MMM-YYYY"
          ).toDate();
      const lastDate = lastDay.dayTs
        ? moment(lastDay.dayTs).toDate()
        : moment(
            `${lastDay.day}-${lastDay.mon}-${constants.currentYear}`,
            "DD-MMM-YYYY"
          ).toDate();

      const startWeek = moment(startDate).day();
      const endWeek = moment(lastDate).day();

      const startBuffer = startWeek;
      const endBuffer = 6 - endWeek;

      const calendarStartDate = moment(startDate)
        .subtract(startBuffer, "days")
        .toDate();
      const calendarLastDate = moment(lastDate)
        .add(endBuffer, "days")
        .toDate();

      const numberOfDays =
        moment(calendarLastDate).diff(calendarStartDate, "days") + 1;

      return {
        calendarStartDate,
        calendarLastDate,
        startDate,
        lastDate,
        numberOfDays
      };
    } catch (e) {
      logError(e);
      return {};
    }
  }

  @computed
  get hotels() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    try {
      let hotels;
      try {
        const hotelRefs = this._selectedItinerary.allHotelCostingRefs;
        hotels = hotelRefs.reduce((hotelArray, ref) => {
          const hotel = toJS(
            this._selectedItinerary.hotelCostings.hotelCostingById[ref]
          );

          if (hotel.status === "SUCCESS") {
            hotel.voucher =
              storeService.voucherStore.getHotelVoucherById(hotel.costingId) ||
              {};
            hotelArray.push(hotel);
          }

          return hotelArray;
        }, []);
      } catch (e) {
        hotels = [];
      }
      return hotels;
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get activities() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    try {
      let activities;
      try {
        activities = Object.values(this._selectedItinerary.activityById);
        const activityRefs = this._selectedItinerary.allActivityCostingRefs;
        /**
         * TODO: Multiple maps (needs optimization)
         */
        const activitiesCosting = activityRefs.map(ref => {
          return toJS(
            this._selectedItinerary.activityCostings.activityCostingById[ref]
          );
        });
        activities = activities.map(activity => {
          activity = toJS(activity);
          const costing = _.find(activitiesCosting, {
            activityId: JSON.stringify(activity.planningToolId)
          });
          return {
            ...activity,
            costing,
            voucher:
              storeService.voucherStore.getActivityVoucherById(
                costing.activityCostingId
              ) || {}
          };
        });
        return activities.filter(
          activity => activity.costing.status === "SUCCESS"
        );
      } catch (e) {
        activities = [];
      }
      return activities;
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get flights() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let flights;
    try {
      const flightRefs = this._selectedItinerary.allFlightCostingRefs;
      flights = flightRefs.reduce((flightArray, ref) => {
        const flight = toJS(
          this._selectedItinerary.flightCostings.flightCostingById[ref]
        );

        if (flight.status === "SUCCESS") {
          flight.voucher =
            storeService.voucherStore.getFlightVoucherById(flight.dbFlightId) ||
            {};
          flightArray.push(flight);
        }

        return flightArray;
      }, []);
    } catch (e) {
      logError(e);
      flights = [];
    }
    return flights;
  }

  @computed
  get transfers() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let transfers;
    try {
      const transferRefs = this._selectedItinerary.allTransferCostingRefs;
      transfers = transferRefs.reduce((transferArray, ref) => {
        const transfer = toJS(
          this._selectedItinerary.transferCostings.transferCostingById[ref]
        );

        if (transfer.status === "SUCCESS") {
          transfer.voucher =
            storeService.voucherStore.getTransferVoucherById(
              transfer.transferCostingId
            ) || {};
          transferArray.push(transfer);
        }

        return transferArray;
      }, []);
    } catch (e) {
      logError(e);
      transfers = [];
    }
    return transfers;
  }

  @computed
  get trains() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let trains;
    try {
      const trainRefs = this._selectedItinerary.allTrainCostingRefs;
      trains = trainRefs.map(ref => {
        const trainCosting = toJS(
          this._selectedItinerary.trainCostings.trainCostingById[ref]
        );
        trainCosting.voucher =
          storeService.voucherStore.getTrainVoucherById(
            trainCosting.costingId
          ) || {};
        return trainCosting;
      });
    } catch (e) {
      logError(e);
      trains = [];
    }
    return trains;
  }

  @computed
  get ferries() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let ferries;
    try {
      const ferryRefs = this._selectedItinerary.allFerryCostingRefs;
      ferries = ferryRefs.map(ref => {
        const ferry = toJS(
          this._selectedItinerary.ferryCostings.ferryCostingById[ref]
        );
        ferry.voucher =
          storeService.voucherStore.getFerryVoucherById(ferry.costingId) || {};
        return ferry;
      });
    } catch (e) {
      logError(e);
      ferries = [];
    }
    return ferries;
  }

  @computed
  get visa() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let visa;
    try {
      const visaRefs = this._selectedItinerary.allVisaCostingRefs;
      visa = visaRefs.map(ref => {
        return toJS(this._selectedItinerary.visaCostings.visaCostingById[ref]);
      });
    } catch (e) {
      logError(e);
      visa = [];
    }
    return visa;
  }

  @computed
  get passes() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let passes;
    try {
      const passRefs = this._selectedItinerary.allPassCostingRefs;
      passes = passRefs.map(ref => {
        return toJS(this._selectedItinerary.passCostings.passCostingById[ref]);
      });
    } catch (e) {
      logError(e);
      passes = [];
    }
    return passes;
  }

  @computed
  get rentals() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    let rentals;
    try {
      const rentalRefs = this._selectedItinerary.allRentalCostingRefs;
      rentals = rentalRefs.map(ref => {
        return toJS(
          this._selectedItinerary.rentalCostings.rentalCostingById[ref]
        );
      });
    } catch (e) {
      logError(e);
      rentals = [];
    }
    return rentals;
  }

  @computed
  get days() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    try {
      return this.sortedDays.map(day => {
        return day.dayTs
          ? moment(day.dayTs).toDate()
          : moment(
              `${day.day}-${day.mon}-${constants.currentYear}`,
              "DD-MMM-YYYY"
            ).toDate();
      });
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get slots() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    try {
      return this.sortedDays.reduce((slots, day) => {
        return slots.concat([
          day.allSlotKeys.map(slotKey => {
            const slot = toJS(this._selectedItinerary.iterSlotByKey[slotKey]);
            if (slot.type === "ACTIVITY") {
              slot.activitySlotDetail = {
                ...slot.activitySlotDetail,
                ...this.getActivityById(slot.activitySlotDetail.activityId)
              };
            }
            return slot;
          })
        ]);
      }, []);
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get cities() {
    if (_.isEmpty(this._selectedItinerary)) return [];
    try {
      const cityKeys = this._selectedItinerary.itinerary.allCityKeys;
      return cityKeys.map(key => {
        const cityKeyObject = this._selectedItinerary.iterCityByKey[key];
        const cityId = cityKeyObject.cityId;
        const startDayId = cityKeyObject.allDayKeys[0];
        const endDayId =
          cityKeyObject.allDayKeys[cityKeyObject.allDayKeys.length - 1];

        const cityObject = this._selectedItinerary.cityById[cityId];
        const startDayObject = this._selectedItinerary.iterDayByKey[startDayId];
        const endDayObject = this._selectedItinerary.iterDayByKey[endDayId];

        const city = cityObject.cityName;
        /**
         * TODO: Need date in milliseconds
         */
        const startDay = startDayObject.dayTs
          ? moment(startDayObject.dayTs).toDate()
          : moment(
              `${startDayObject.day}-${startDayObject.mon}-${
                constants.currentYear
              }`,
              "DD-MMM-YYYY"
            ).toDate();
        const endDay = endDayObject.dayTs
          ? moment(endDayObject.dayTs).toDate()
          : moment(
              `${endDayObject.day}-${endDayObject.mon}-${
                constants.currentYear
              }`,
              "DD-MMM-YYYY"
            ).toDate();

        return { city, startDay, endDay, cityObject };
      });
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get countries() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    try {
      const countries = this._selectedItinerary.itinerary.countries;
      return toJS(countries);
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get defaultCurrency() {
    return "INR";
  }

  getCityById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) return {};

    try {
      const cityObject = this._selectedItinerary.cityById[id];
      return toJS(cityObject);
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getHotelByDate = createTransformer(date => {
    if (_.isEmpty(this._selectedItinerary)) return {};

    try {
      const hotelCostings = toJS(
        this._selectedItinerary.hotelCostings.hotelCostingById
      );
      for (const key in hotelCostings) {
        if (hotelCostings.hasOwnProperty(key)) {
          const hotel = hotelCostings[key];
          const hotelDate = moment(hotel.checkInTs).format("DDMMYYYY");
          if (hotelDate === date) return hotel;
        }
      }
      logError("No Hotel found for the given date...");
      return {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getActivityById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) return {};

    return this.activities.find(activity => id === activity.costing.key);
  });

  getFlightById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) return {};

    return toJS(this._selectedItinerary.flightCostings.flightCostingById[id]);
  });

  getHotelById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) return {};

    return toJS(this._selectedItinerary.hotelCostings.hotelCostingById[id]);
  });

  getDateSelectionMatrixSingle = createTransformer(index => {
    try {
      let dayKey;

      for (let key in this._selectedItinerary.iterDayByKey) {
        if (this._selectedItinerary.iterDayByKey[key].dayNum === index + 1) {
          dayKey = key;
          break;
        }
      }

      for (let key in this._selectedItinerary.iterCityByKey) {
        const datesArray = this._selectedItinerary.iterCityByKey[key]
          .allDayKeys;
        for (let i = 0; i < datesArray.length; i++) {
          if (dayKey === datesArray[i]) {
            const selection = [];
            if (i === 0) {
              selection.push(0);
            } else {
              selection.push(1);
            }
            selection.push(1);
            if (i === datesArray.length - 1) {
              selection.push(0);
            } else {
              selection.push(1);
            }
            return selection;
          }
        }
      }
    } catch (e) {
      logError(e);
      return [0, 0, 0];
    }
  });

  numOfActivitiesByDay = createTransformer(index => {
    try {
      for (let key in this._selectedItinerary.iterDayByKey) {
        if (this._selectedItinerary.iterDayByKey[key].dayNum === index + 1) {
          const slotKeys = this._selectedItinerary.iterDayByKey[key]
            .allSlotKeys;
          let activityCount = 0;
          for (let i = 0; i < slotKeys.length; i++) {
            if (
              this._selectedItinerary.iterSlotByKey[slotKeys[i]].type ===
              "ACTIVITY"
            ) {
              activityCount++;
            }
          }
          return activityCount;
        }
      }
    } catch (e) {
      return 0;
    }
  });

  getTransferTypeByDay = createTransformer(index => {
    try {
      for (let key in this._selectedItinerary.iterDayByKey) {
        if (this._selectedItinerary.iterDayByKey[key].dayNum === index + 1) {
          const slotKeys = this._selectedItinerary.iterDayByKey[key]
            .allSlotKeys;
          for (let i = 0; i < slotKeys.length; i++) {
            const activity = this._selectedItinerary.iterSlotByKey[slotKeys[i]];
            if (activity.type === "INTERCITY_TRANSFER") {
              return {
                mode:
                  activity.intercityTransferSlotDetailVO.directTransferDetail
                    .transferMode,
                type: activity.type
              };
            } else if (
              activity.type === "INTERNATIONAL_ARRIVE" ||
              activity.type === "INTERNATIONAL_DEPART"
            ) {
              return { mode: "FLIGHT", type: activity.type };
            }
          }
        }
      }
      return { mode: "NONE", type: "NONE" };
    } catch (e) {
      logError(e);
      return { mode: "NONE", type: "NONE" };
    }
  });

  constructor() {
    // setTimeout(() => {
    //   console.log(JSON.stringify(toJS(this._selectedItinerary)));
    // }, 3000);
  }
}

export default Itineraries;
