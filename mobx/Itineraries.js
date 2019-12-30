import { action, computed, observable, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import _ from "lodash";
import moment from "moment";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import { LayoutAnimation, Platform } from "react-native";
import { hydrate } from "./Store";
import itineraryConstructor from "../Services/appLauncher/itineraryConstructor";
import debouncer from "../Services/debouncer/debouncer";

/**
 * Itinerary date object does not have a year hence this function
 * will use the milliseconds data from `dayTs` to calculate
 * the year string in `YYYY` format
 */
const getYearFromItineraryDateObject = dateObject => {
  if (dateObject.dayTs) {
    return moment(dateObject.dayTs).format("YYYY");
  } else {
    return constants.currentYear;
  }
};

/**
 * This function will use the itinerary date object from the
 * `iterDayByKey` of the costing object and returns the
 * corresponding Javascript Date object
 */
const getJsDateFromItineraryDateObject = dateObject => {
  return moment(
    `${dateObject.day}-${dateObject.mon}-${getYearFromItineraryDateObject(
      dateObject
    )}`,
    "DD-MMM-YYYY"
  ).toDate();
};

class Itineraries {
  static hydrator = storeInstance => {
    hydrate("_itineraries", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_selectedItinerary", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_voucherDownloadMap", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  @observable _isLoading = false;

  @observable _loadingError = false;

  @persist("list")
  @observable
  _itineraries = [];

  @persist("object")
  @observable
  _selectedItinerary = {};

  @persist("object")
  @observable
  _voucherDownloadMap = {};

  @action
  reset = () => {
    this._isLoading = false;
    this._loadingError = false;
    this._itineraries = [];
    this._selectedItinerary = {};
  };

  @action
  selectItinerary = (itineraryId, callback = () => null) => {
    const selectedItinerary = this._itineraries.find(itineraryDetail => {
      return itineraryDetail.itinerary.itineraryId === itineraryId;
    });
    if (selectedItinerary) {
      if (Platform.OS === "ios") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      this._selectedItinerary = selectedItinerary;
      debouncer(() => {
        if (this.selectedItineraryId) {
          itineraryConstructor({
            itineraryId: this.selectedItineraryId,
            cities: this.cities
          });
        }
      });
      callback();
    } else {
      this.getItineraryDetails(itineraryId, callback);
    }
  };

  @action
  getItineraryDetails = (itineraryId, callback = () => null) => {
    this._isLoading = true;
    const requestBody = {};
    apiCall(
      `${constants.getItineraryDetails}?itineraryId=${itineraryId}`,
      requestBody
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._loadingError = false;
          this._itineraries.push(response.data);
          if (Platform.OS === "ios") {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
          }
          this._selectedItinerary = response.data;
          debouncer(() => {
            if (this.selectedItineraryId) {
              itineraryConstructor({
                itineraryId: this.selectedItineraryId,
                cities: this.cities
              });
            }
          });
          callback();
        } else {
          this._loadingError = true;
        }
      })
      .catch(() => {
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
        if (response.status === constants.responseSuccessStatus) {
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
      .catch(() => {
        this._isLoading = false;
        this._loadingError = true;
      });
  };

  /**
   * _voucherDownloadMap is a json object that is used to keep
   * track of all the vouchers downloaded along with the
   * url from which they are downloaded.
   */
  @action
  updateVoucherDownloadMap = (url, fileName) => {
    const voucherDownloadMap = toJS(this._voucherDownloadMap);
    voucherDownloadMap[url] = fileName;
    this._voucherDownloadMap = voucherDownloadMap;
  };

  /**
   * This will retrieve a voucher which is already downloaded
   * using the downloaded source url
   */
  getDownloadedVoucherByUrl = createTransformer(url => {
    return this._voucherDownloadMap[url];
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
  get selectedItineraryId() {
    if (_.isEmpty(this._selectedItinerary)) {
      return "";
    }

    try {
      return this._selectedItinerary.itinerary.itineraryId;
    } catch (e) {
      logError(e);
      return "";
    }
  }

  @computed
  get regionName() {
    if (_.isEmpty(this._selectedItinerary)) {
      return "";
    }

    try {
      return this._selectedItinerary.itinerary.regionName;
    } catch (e) {
      logError(e);
      return "";
    }
  }

  @computed
  get selectedItinerary() {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      return toJS(this._selectedItinerary);
    } catch (e) {
      logError(e);
      return "";
    }
  }

  /**
   * Returns the itinerary date objects obtained from `iterDayByKey`
   * as a day wise sorted array
   */
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

  /**
   * Method for the calendar component on the booking screen
   * This method will return the start date and the end date of the itinerary
   * along with the number of days and the calendar start & end dates
   *
   * The calendar start and end dates are used to render the calendar rows on which
   * the itinerary dates are highlighted for the user
   *
   * @returns {{}|{calendarStartDate: *, numberOfDays: *, calendarLastDate: *, startDate: *, lastDate: *}}
   */
  @computed
  get startEndDates() {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const sortedDays = this.sortedDays;

      const startDay = sortedDays[0];
      const lastDay = sortedDays[sortedDays.length - 1];

      const startDate = getJsDateFromItineraryDateObject(startDay);
      const lastDate = getJsDateFromItineraryDateObject(lastDay);

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
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    try {
      let hotels;
      try {
        const hotelRefs = this._selectedItinerary.allHotelCostingRefs;
        hotels =
          hotelRefs && hotelRefs.length
            ? hotelRefs.reduce((hotelArray, ref) => {
                const hotel = toJS(
                  this._selectedItinerary.hotelCostings.hotelCostingById[ref]
                );

                if (hotel && hotel.status === constants.voucherSuccessStatus) {
                  hotel.voucher =
                    storeService.voucherStore.getHotelVoucherById(
                      hotel.costingId
                    ) || {};
                  hotelArray.push(hotel);
                }

                return hotelArray;
              }, [])
            : [];
      } catch (e) {
        logError(e);
        hotels = [];
      }
      return hotels;
    } catch (e) {
      logError(e);
      return [];
    }
  }

  /**
   * Will fetch all the activity details from the itinerary
   * along with the costing information and voucher information
   */
  @computed
  get activities() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    try {
      let activities;
      try {
        const activitiesList = this._selectedItinerary.activityById
          ? toJS(Object.values(this._selectedItinerary.activityById))
          : [];
        const activityRefs = this._selectedItinerary.allActivityCostingRefs;
        /**
         * TODO: Multiple maps (needs optimization)
         */
        const activitiesCosting =
          activityRefs && activityRefs.length
            ? activityRefs.map(ref => {
                return toJS(
                  this._selectedItinerary.activityCostings.activityCostingById[
                    ref
                  ]
                );
              })
            : [];
        activities = activitiesCosting.map(costing => {
          const activity = _.find(activitiesList, {
            planningToolId: parseInt(costing.activityId, 10)
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
        activities = activities.filter(
          activity => activity.costing.status === constants.voucherSuccessStatus
        );
        return activities;
      } catch (e) {
        logError(e);
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
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let flights;
    try {
      const flightRefs = this._selectedItinerary.allFlightCostingRefs;
      flights =
        flightRefs && flightRefs.length
          ? flightRefs.reduce((flightArray, ref) => {
              const flight = toJS(
                this._selectedItinerary.flightCostings.flightCostingById[ref]
              );

              if (flight && flight.status === constants.voucherSuccessStatus) {
                flight.voucher =
                  storeService.voucherStore.getFlightVoucherById(
                    flight.dbFlightId
                  ) || {};
                flightArray.push(flight);
              }

              return flightArray;
            }, [])
          : [];
    } catch (e) {
      logError(e);
      flights = [];
    }
    return flights;
  }

  @computed
  get transfers() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let transfers;
    try {
      const transferRefs = this._selectedItinerary.allTransferCostingRefs;
      transfers =
        transferRefs && transferRefs.length
          ? transferRefs.reduce((transferArray, ref) => {
              const transfer = toJS(
                this._selectedItinerary.transferCostings.transferCostingById[
                  ref
                ]
              );

              if (
                transfer &&
                transfer.status === constants.voucherSuccessStatus
              ) {
                transfer.voucher =
                  storeService.voucherStore.getTransferVoucherById(
                    transfer.transferCostingId
                  ) || {};
                transferArray.push(transfer);
              }

              return transferArray;
            }, [])
          : [];
    } catch (e) {
      logError(e);
      transfers = [];
    }
    return transfers;
  }

  @computed
  get trains() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let trains;
    try {
      const trainRefs = this._selectedItinerary.allTrainCostingRefs;
      trains =
        trainRefs && trainRefs.length
          ? trainRefs.reduce((trainsArray, ref) => {
              const trainCosting = toJS(
                this._selectedItinerary.trainCostings.trainCostingById[ref]
              );
              if (
                trainCosting &&
                trainCosting.status === constants.voucherSuccessStatus
              ) {
                trainCosting.voucher =
                  storeService.voucherStore.getTrainVoucherById(
                    trainCosting.costingId
                  ) || {};
                trainsArray.push(trainCosting);
              }
              return trainsArray;
            }, [])
          : [];
    } catch (e) {
      logError(e);
      trains = [];
    }
    return trains;
  }

  @computed
  get ferries() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let ferries;
    try {
      const ferryRefs = this._selectedItinerary.allFerryCostingRefs;
      ferries =
        ferryRefs && ferryRefs.length
          ? ferryRefs.reduce((ferriesArray, ref) => {
              const ferry = toJS(
                this._selectedItinerary.ferryCostings.ferryCostingById[ref]
              );
              if (ferry && ferry.status === constants.voucherSuccessStatus) {
                ferry.voucher =
                  storeService.voucherStore.getFerryVoucherById(
                    ferry.costingId
                  ) || {};
                ferriesArray.push(ferry);
              }
              return ferriesArray;
            }, [])
          : [];
    } catch (e) {
      logError(e);
      ferries = [];
    }
    return ferries;
  }

  @computed
  get visa() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let visa;
    try {
      const visaRefs = this._selectedItinerary.allVisaCostingRefs;
      visa =
        visaRefs && visaRefs.length
          ? visaRefs.reduce((visaArray, ref) => {
              const visaObject = toJS(
                this._selectedItinerary.visaCostings.visaCostingById[ref]
              );
              /**
               * On arrival visa usually wouldn't be shown in the
               * bookings accordion,
               * However, Since visa is following visa assistance flow, we need
               * the on arrival visa's to be displayed
               * `visaObject.onArrival`
               */
              if (visaObject) {
                visaArray.push(visaObject);
              }
              return visaArray;
            }, [])
          : [];
    } catch (e) {
      logError(e);
      visa = [];
    }
    return visa;
  }

  @computed
  get insurance() {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const insuranceCosting = this._selectedItinerary.insuranceCosting
        ? toJS(this._selectedItinerary.insuranceCosting.insuranceCostingById)
        : {};
      if (insuranceCosting && insuranceCosting.plan) {
        insuranceCosting.voucher =
          storeService.voucherStore.getInsuranceVoucherById(
            insuranceCosting.costingId
          ) || {};
        return insuranceCosting;
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
    }
  }

  @computed
  get passes() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let passes;
    try {
      const passRefs = this._selectedItinerary.allPassCostingRefs;
      passes =
        passRefs && passRefs.length
          ? passRefs.map(ref => {
              return toJS(
                this._selectedItinerary.passCostings.passCostingById[ref]
              );
            })
          : [];
    } catch (e) {
      logError(e);
      passes = [];
    }
    return passes;
  }

  @computed
  get rentals() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let rentals;
    try {
      const rentalRefs = this._selectedItinerary.allRentalCostingRefs;
      rentals =
        rentalRefs && rentalRefs.length
          ? rentalRefs.reduce((rentalsArray, ref) => {
              const rental = toJS(
                this._selectedItinerary.rentalCarCostings.rentalCostingById[ref]
              );
              if (rental && rental.status === constants.voucherSuccessStatus) {
                rental.voucher =
                  storeService.voucherStore.getRentalCarVoucherById(
                    rental.rcCostingId || rental.dbRef
                  ) || {};
                rentalsArray.push(rental);
              }
              return rentalsArray;
            }, [])
          : [];
    } catch (e) {
      logError(e);
      rentals = [];
    }
    return rentals;
  }

  @computed
  get customCostings() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    let customCostingsArray = [];
    try {
      const { customCostings = [] } = this._selectedItinerary;
      customCostingsArray = toJS(customCostings);
    } catch (e) {
      logError(e);
    }
    return customCostingsArray;
  }

  getRentalCarByCityOrder = createTransformer(
    ({ fromCityOrder, toCityOrder }) => {
      if (_.isEmpty(this._selectedItinerary)) {
        return {};
      }
      try {
        const rental = this.rentals.find(rentalCar => {
          const { key } = rentalCar;
          const rentalKeyArray = key.split(/#|_/);
          const pickUpCityOrder = parseInt(rentalKeyArray[1], 10);
          const dropCityOrder = parseInt(rentalKeyArray[3], 10);
          return (
            pickUpCityOrder <= fromCityOrder && dropCityOrder <= toCityOrder
          );
        });
        if (rental) {
          return rental;
        } else {
          return {};
        }
      } catch (e) {
        logError(e);
        return {};
      }
    }
  );

  getCityOrderById = createTransformer(cityId => {
    if (_.isEmpty(this._selectedItinerary)) {
      return "";
    }
    try {
      return this._selectedItinerary.itinerary.cityWiseOrderMap[cityId];
    } catch (e) {
      logError(e);
      return "";
    }
  });

  /**
   * From the sorted itinerary date object array created using
   * `sortedDays` method, this will return the corresponding moment object array
   * in the same sorted order
   *
   * @returns {Date[]|Array}
   */
  @computed
  get days() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

    try {
      return this.sortedDays.map(day => {
        return getJsDateFromItineraryDateObject(day);
      });
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get slots() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

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

  /**
   * Returns an array of city list with contains
   * city name - city
   * the day user starts his trip on the city - startDay
   * the day user completes his trip on the city - endDay
   * city details - cityObject
   */
  @computed
  get cities() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }
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
        const startDay = getJsDateFromItineraryDateObject(startDayObject);
        const endDay = getJsDateFromItineraryDateObject(endDayObject);

        return { city, startDay, endDay, cityObject };
      });
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get countries() {
    if (_.isEmpty(this._selectedItinerary)) {
      return [];
    }

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

  /**
   * Returns the first day of the itinerary as a JS Date object
   */
  @computed
  get firstDay() {
    if (_.isEmpty(this._selectedItinerary)) {
      return moment();
    }

    try {
      const iterDayByKey = toJS(this._selectedItinerary.iterDayByKey);
      for (const key in iterDayByKey) {
        if (iterDayByKey.hasOwnProperty(key)) {
          const dayObject = iterDayByKey[key];
          if (dayObject.dayNum === 1) {
            return moment(getJsDateFromItineraryDateObject(dayObject));
          }
        }
      }
      return moment();
    } catch (e) {
      logError(e);
      return moment();
    }
  }

  /**
   * Given a city ID, finds all details regarding that city.
   *
   * This also includes the startDay and endDay of the city which is calculated
   * using the cities() method.
   *
   * This is needed for checking if the user is currently in that city in the
   * NearBy screen
   */
  getCityById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }
    if (!id) {
      return {};
    }

    try {
      // City Object needs to be modified hence the observable should be converted to plain JS
      const cityObject = toJS(this._selectedItinerary.cityById[id]);
      const cityList = this.cities;
      const requiredCity = cityList.find(city => {
        return city.cityObject.cityId === id;
      });
      cityObject.startDay = requiredCity.startDay;
      cityObject.endDay = requiredCity.endDay;
      return toJS(cityObject);
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getHotelByDate = createTransformer(date => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const hotelCostings = toJS(
        this._selectedItinerary.hotelCostings.hotelCostingById
      );
      for (const key in hotelCostings) {
        if (hotelCostings.hasOwnProperty(key)) {
          const hotel = hotelCostings[key];
          const hotelDate = moment(hotel.checkInTs).format("DDMMYYYY");
          if (hotelDate === date) {
            return hotel;
          }
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
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      return this.activities.find(
        activity =>
          id === activity.costing.key ||
          id === activity.costing.activityCostingId
      );
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getFlightById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const flight = toJS(
        this._selectedItinerary.flightCostings.flightCostingById[id]
      );
      if (flight && flight.key) {
        flight.voucher =
          storeService.voucherStore.getFlightVoucherById(flight.key) || {};
        return flight;
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getTransferFromAllById = createTransformer(id => {
    try {
      let transfer = this.getTransferById(id);
      if (_.isEmpty(transfer)) {
        transfer = this.getFerryById(id);
        if (_.isEmpty(transfer)) {
          transfer = this.getTrainById(id);
          if (_.isEmpty(transfer)) {
            transfer = this.getFlightById(id);
            if (_.isEmpty(transfer)) {
              transfer = this.getRentalCarById(id);
            }
          }
        }
      }
      return transfer;
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getTransferById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const transfer = toJS(
        this._selectedItinerary.transferCostings.transferCostingById[id]
      );
      if (transfer) {
        transfer.voucher =
          storeService.voucherStore.getTransferVoucherById(transfer.key) || {};
        return transfer;
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getFerryById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const ferry = toJS(
        this._selectedItinerary.ferryCostings.ferryCostingById[id]
      );
      if (ferry) {
        ferry.voucher =
          storeService.voucherStore.getFerryVoucherById(ferry.key) || {};
        return ferry;
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getRentalCarById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const rentalCar = toJS(
        this._selectedItinerary.rentalCarCostings.rentalCostingById[id]
      );
      if (rentalCar) {
        rentalCar.voucher =
          storeService.voucherStore.getRentalCarVoucherById(
            rentalCar.rcCostingId || rentalCar.dbRef
          ) || {};
        return rentalCar;
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getTrainById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const train = toJS(
        this._selectedItinerary.trainCostings.trainCostingById[id]
      );
      if (train) {
        train.voucher =
          storeService.voucherStore.getTrainVoucherById(train.key) || {};
        return train;
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getHotelById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      const hotel =
        this._selectedItinerary.hotelCostings.hotelCostingById[id] || {};
      hotel.voucher =
        storeService.voucherStore.getHotelVoucherById(hotel.costingId) || {};
      return hotel;
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getCustomCostingsById = createTransformer(id => {
    if (_.isEmpty(this._selectedItinerary)) {
      return {};
    }

    try {
      return this.customCostings.find(costing => id === costing._id) || {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

  /**
   * Method for the calendar component on the booking screen
   * This method is used to decide what kind of highlight should be made on
   * each date component in the calendar's row.
   *
   * This will return an array of 3 rows in the form [0, 0, 0]
   *
   * In a 3 day trip,
   *
   * For the first day it will return array of form [0, 1, 1]
   * which means there are no dates on the left side of the current date
   * (also means the date is a left corner)
   *
   * For the second day it will return array of form [1, 1, 1]
   * which means there are dates on both left and right side of the current date
   * (also means the date is in between two trip dates)
   *
   * For the third day it will return array of form [1, 1, 0]
   * which means there are no dates on the right side of the current date
   * (also means the date is a right corner)
   */
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
      logError(e);
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
            if (_.toUpper(activity.type) === "INTERCITY_TRANSFER") {
              return {
                mode:
                  activity.intercityTransferSlotDetailVO.directTransferDetail
                    .transferMode,
                type: activity.type
              };
            } else if (
              _.toUpper(activity.type) === "INTERNATIONAL_ARRIVE" ||
              _.toUpper(activity.type) === "INTERNATIONAL_DEPART"
            ) {
              return { mode: "FLIGHT", type: activity.type };
            } else if (activity.type === "ACTIVITY_WITH_TRANSFER") {
              let transferMode;
              const { intercityTransferSlotDetailVO } = activity;
              /**
               * Activity with transfer will have two types of transfers
               * - Direct
               * - Transit
               */
              if (
                _.toUpper(intercityTransferSlotDetailVO.transferType) ===
                "DIRECT"
              ) {
                transferMode =
                  intercityTransferSlotDetailVO.directTransferDetail
                    .transferMode;
              } else if (
                _.toUpper(intercityTransferSlotDetailVO.transferType) ===
                "TRANSIT"
              ) {
                transferMode =
                  intercityTransferSlotDetailVO.transitTransferDetail
                    .arriveTransit.transitMode;
              }
              return {
                mode: transferMode,
                type: activity.type
              };
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
