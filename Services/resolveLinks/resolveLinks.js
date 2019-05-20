import _ from "lodash";
import navigationService from "../navigationService/navigationService";
import openCustomTab from "../openCustomTab/openCustomTab";
import storeService from "../storeService/storeService";
import { toastBottom } from "../toast/toast";
import constants from "../../constants/constants";
import directions from "../directions/directions";
import dialer from "../dialer/dialer";
import { logError } from "../errorLogger/errorLogger";
import { Platform } from "react-native";

/**
 * Voucher no longer needs validation since voucher screens should open
 * even when booking is incomplete
 * Old Logic to check if the booking is complete
 */
// const validateVoucher = voucher => !_.isEmpty(voucher) &&
// voucher.voucher &&
// (voucher.voucher.booked || voucher.free);

const isVoucherBooked = voucher =>
  !_.isEmpty(voucher) &&
  voucher.voucher &&
  (voucher.voucher.booked || voucher.free);

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
        case constants.flightVoucherType:
          const flight = storeService.itineraries.getFlightById(
            costingIdentifier
          );
          navigation.navigate("FlightVoucher", { flight });
          if (!isVoucherBooked(flight))
            toastBottom(constants.bookingProcessText.message);
          break;
        case constants.hotelVoucherType:
          const hotel = storeService.itineraries.getHotelById(
            costingIdentifier
          );
          navigation.navigate("HotelVoucher", { hotel });
          if (!isVoucherBooked(hotel))
            toastBottom(constants.bookingProcessText.message);
          break;
        case constants.activityVoucherType:
          const activity = storeService.itineraries.getActivityById(
            costingIdentifier
          );
          navigation.navigate("ActivityVoucher", { activity });
          if (!isVoucherBooked(activity))
            toastBottom(constants.bookingProcessText.message);
          break;
        case constants.transferVoucherType:
          const transfer = storeService.itineraries.getTransferById(
            costingIdentifier
          );
          navigation.navigate("TransferVoucher", { transfer });
          if (!isVoucherBooked(transfer))
            toastBottom(constants.bookingProcessText.message);
          break;
        case constants.rentalCarVoucherType:
          const rentalCar = storeService.itineraries.getRentalCarById(
            costingIdentifier
          );
          navigation.navigate("RentalCarVoucher", { rentalCar });
          if (!isVoucherBooked(rentalCar))
            toastBottom(constants.bookingProcessText.message);
          break;
        case constants.ferryVoucherType:
          const ferry = storeService.itineraries.getFerryById(
            costingIdentifier
          );
          navigation.navigate("TransferVoucher", {
            transfer: { ...ferry, vehicle: voucherType }
          });
          if (!isVoucherBooked(ferry))
            toastBottom(constants.bookingProcessText.message);
          break;
        case constants.trainVoucherType:
          const train = storeService.itineraries.getTrainById(
            costingIdentifier
          );
          navigation.navigate("TransferVoucher", {
            transfer: { ...train, vehicle: voucherType }
          });
          if (!isVoucherBooked(train))
            toastBottom(constants.bookingProcessText.message);
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
