import _ from "lodash";
import navigationService from "../navigationService/navigationService";
import openCustomTab from "../openCustomTab/openCustomTab";
import storeService from "../storeService/storeService";
import { toastBottom } from "../toast/toast";
import constants from "../../constants/constants";
import directions from "../directions/directions";
import dialer from "../dialer/dialer";

const validateVoucher = voucher =>
  !_.isEmpty(voucher) &&
  voucher.voucher &&
  (voucher.voucher.booked || voucher.voucher.free);

const resolveLinks = (link = "", screenProps = {}, deepLink = {}) => {
  const { _navigation: navigation } = navigationService.navigation;
  if (link) {
    if (link.includes("http://") || link.includes("https://")) {
      openCustomTab(link);
    } else if (link === "InfoCardModal") {
      navigation.navigate("TripFeed");
      storeService.tripFeedStore.openInfoCardModal(screenProps);
    } else {
      navigation.navigate(link, {
        ...screenProps,
        parentScreen: "TripFeed"
      });
    }
  } else if (!_.isEmpty(deepLink)) {
    const {
      voucherType,
      costingIdentifier,
      location = {},
      contactNumber
    } = deepLink;
    const { latitude, longitude } = location || {};
    if (voucherType && costingIdentifier) {
      /**
       * TODO: use a common function for toastBottom message
       */
      switch (voucherType) {
        case "FLIGHT":
          const flight = storeService.itineraries.getFlightById(
            costingIdentifier
          );
          if (validateVoucher(flight)) {
            navigation.navigate("FlightVoucher", { flight });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;
        case "HOTEL":
          const hotel = storeService.itineraries.getHotelById(
            costingIdentifier
          );
          if (validateVoucher(hotel)) {
            navigation.navigate("HotelVoucher", { hotel });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;
        case "ACTIVITY":
          const activity = storeService.itineraries.getActivityById(
            costingIdentifier
          );
          if (validateVoucher(activity)) {
            navigation.navigate("ActivityVoucher", { activity });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;
        case "TRANSFER":
          const transfer = storeService.itineraries.getTransferById(
            costingIdentifier
          );
          if (validateVoucher(transfer)) {
            navigation.navigate("TransferVoucher", { transfer });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;
        case "RENTAL_CAR":
          const rentalCar = storeService.itineraries.getRentalCarById(
            costingIdentifier
          );
          if (validateVoucher(rentalCar)) {
            navigation.navigate("TransferVoucher", { transfer: rentalCar });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;
        case "FERRY":
          const ferry = storeService.itineraries.getFerryById(
            costingIdentifier
          );
          if (validateVoucher(ferry)) {
            navigation.navigate("TransferVoucher", { transfer: ferry });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;
        case "TRAIN":
          const train = storeService.itineraries.getTrainById(
            costingIdentifier
          );
          if (validateVoucher(train)) {
            navigation.navigate("TransferVoucher", { transfer: train });
          } else {
            toastBottom(constants.bookingProcessText.message);
          }
          break;

        default:
          toastBottom(constants.bookingProcessText.message);
          break;
      }
      return;
    }
    if (latitude && longitude) {
      directions({ latitude, longitude });
      return;
    }
    if (contactNumber) {
      dialer(contactNumber);
    }
  }
};

export default resolveLinks;
