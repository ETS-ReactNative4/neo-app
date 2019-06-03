import _ from "lodash";
import navigationService from "../navigationService/navigationService";
import openCustomTab from "../openCustomTab/openCustomTab";
import storeService from "../storeService/storeService";
import { toastBottom } from "../toast/toast";
import constants from "../../constants/constants";
import directions from "../directions/directions";
import dialer from "../dialer/dialer";
import { logError } from "../errorLogger/errorLogger";
import { Linking, Platform } from "react-native";
import OpenAppSettingsAndroid from "react-native-app-settings";

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

const isVoucherAvailable = voucher =>
  voucher.status !== constants.voucherErrorStatus;

const resolveLinks = (link = "", screenProps = {}, deepLink = {}) => {
  const { _navigation: navigation } = navigationService.navigation;
  if (link) {
    /**
     * If link is a webpage, open customTab
     */
    if (link.includes("http://") || link.includes("https://")) {
      openCustomTab(link);
    } else if (link === "InfoCardModal") {
      /**
       * If link is `InfoCardModal` open the modal
       */
      navigation.navigate("TripFeed");
      storeService.tripFeedStore.openInfoCardModal(screenProps);
    } else if (link === "SystemSettings") {
      /**
       * If link is `SystemSettings` open the system settings page of the app
       */
      if (Platform.OS === constants.platformIos) {
        Linking.canOpenURL("app-settings:")
          .then(supported => {
            if (!supported) {
              logError("Failed to open iOS app settings");
            } else {
              return Linking.openURL("app-settings:");
            }
          })
          .catch(settingsErr => {
            logError(settingsErr);
          });
      } else {
        OpenAppSettingsAndroid.open();
      }
    } else {
      /**
       * Otherwise, open the app's screen defined by the link
       */
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
    /**
     * If `voucherType` and `costingIdentifier` are present in the deeplink,
     * open the respective voucher
     */
    if (voucherType && costingIdentifier) {
      switch (voucherType) {
        case constants.flightVoucherType:
          const flight = storeService.itineraries.getFlightById(
            costingIdentifier
          );
          if (isVoucherAvailable(flight)) {
            navigation.navigate("FlightVoucher", { flight });
            if (!isVoucherBooked(flight))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;
        case constants.hotelVoucherType:
          const hotel = storeService.itineraries.getHotelById(
            costingIdentifier
          );
          if (isVoucherAvailable(hotel)) {
            navigation.navigate("HotelVoucher", { hotel });
            if (!isVoucherBooked(hotel))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;
        case constants.activityVoucherType:
          const activity = storeService.itineraries.getActivityById(
            costingIdentifier
          );
          if (isVoucherAvailable(activity)) {
            navigation.navigate("ActivityVoucher", { activity });
            if (!isVoucherBooked(activity))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;
        case constants.transferVoucherType:
          const transfer = storeService.itineraries.getTransferById(
            costingIdentifier
          );
          if (isVoucherAvailable(transfer)) {
            navigation.navigate("TransferVoucher", { transfer });
            if (!isVoucherBooked(transfer))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;
        case constants.rentalCarVoucherType:
          const rentalCar = storeService.itineraries.getRentalCarById(
            costingIdentifier
          );
          if (isVoucherAvailable(rentalCar)) {
            navigation.navigate("RentalCarVoucher", { rentalCar });
            if (!isVoucherBooked(rentalCar))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;
        case constants.ferryVoucherType:
          const ferry = storeService.itineraries.getFerryById(
            costingIdentifier
          );
          if (isVoucherAvailable(ferry)) {
            navigation.navigate("TransferVoucher", {
              transfer: { ...ferry, vehicle: voucherType }
            });
            if (!isVoucherBooked(ferry))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;
        case constants.trainVoucherType:
          const train = storeService.itineraries.getTrainById(
            costingIdentifier
          );
          if (isVoucherAvailable(train)) {
            navigation.navigate("TransferVoucher", {
              transfer: { ...train, vehicle: voucherType }
            });
            if (!isVoucherBooked(train))
              toastBottom(constants.bookingProcessText.message);
          } else {
            toastBottom(constants.bookingFailedText);
          }
          break;

        default:
          toastBottom(constants.bookingProcessText.message);
          break;
      }
      return;
    }
    /**
     * if `latitude` and `longitude` are present in the deeplink,
     * open the google maps app
     */
    if (latitude && longitude) {
      directions({ latitude, longitude });
      return;
    }
    /**
     * if `contactNumber` is present, open the system dialer
     */
    if (contactNumber) {
      dialer(contactNumber);
    }
  }
};

export default resolveLinks;
