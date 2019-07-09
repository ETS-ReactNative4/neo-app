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
  voucher &&
  !_.isEmpty(voucher) &&
  voucher.voucher &&
  (voucher.voucher.booked || voucher.free);

const isVoucherAvailable = voucher =>
  voucher && voucher.status !== constants.voucherErrorStatus;

const isDataSkipped = voucher => _.get(voucher, "voucher.skipData");

/**
 * Voucher has skipped data,
 * Open the voucher directly in custom tab using voucher url
 */
const skipData = voucher => {
  const url = _.get(voucher, "voucher.voucherUrl");
  if (url) openCustomTab(url);
  else toastBottom(constants.voucherText.voucherUnavailable);
};

const resolveLinks = (link = "", screenProps = {}, deepLink = {}) => {
  try {
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
      /**
       * Voucher conditions
       * - If voucher has `skipData` set to true, should directly open the voucher url in custom tab
       * - If voucher is free or booked just open the voucher screen
       * - If the voucher is not yet booked, open the voucher screen with incomplete data but also show
       * a toast message saying it's under processing
       */
      if (voucherType && costingIdentifier) {
        switch (voucherType) {
          case constants.flightVoucherType:
            const flight = storeService.itineraries.getFlightById(
              costingIdentifier
            );
            if (isVoucherAvailable(flight)) {
              if (isDataSkipped(flight)) {
                skipData(flight);
              } else {
                navigation.navigate("FlightVoucher", { flight });
                if (!isVoucherBooked(flight))
                  toastBottom(constants.bookingProcessText.message);
              }
            } else {
              toastBottom(constants.bookingFailedText);
            }
            break;
          case constants.hotelVoucherType:
            const hotel = storeService.itineraries.getHotelById(
              costingIdentifier
            );
            if (isVoucherAvailable(hotel)) {
              if (isDataSkipped(hotel)) {
                skipData(hotel);
              } else {
                navigation.navigate("HotelVoucher", { hotel });
                if (!isVoucherBooked(hotel))
                  toastBottom(constants.bookingProcessText.message);
              }
            } else {
              toastBottom(constants.bookingFailedText);
            }
            break;
          case constants.activityVoucherType:
            const activity = storeService.itineraries.getActivityById(
              costingIdentifier
            );
            if (isVoucherAvailable(activity)) {
              if (isDataSkipped(activity)) {
                skipData(activity);
              } else {
                navigation.navigate("ActivityVoucher", { activity });
                if (!isVoucherBooked(activity))
                  toastBottom(constants.bookingProcessText.message);
              }
            } else {
              toastBottom(constants.bookingFailedText);
            }
            break;
          case constants.transferVoucherType:
            const transfer = storeService.itineraries.getTransferById(
              costingIdentifier
            );
            if (isVoucherAvailable(transfer)) {
              if (isDataSkipped(transfer)) {
                skipData(transfer);
              } else {
                navigation.navigate("TransferVoucher", { transfer });
                if (!isVoucherBooked(transfer))
                  toastBottom(constants.bookingProcessText.message);
              }
            } else {
              toastBottom(constants.bookingFailedText);
            }
            break;
          case constants.rentalCarVoucherType:
            const rentalCar = storeService.itineraries.getRentalCarById(
              costingIdentifier
            );
            if (isVoucherAvailable(rentalCar)) {
              if (isDataSkipped(rentalCar)) {
                skipData(rentalCar);
              } else {
                navigation.navigate("RentalCarVoucher", { rentalCar });
                if (!isVoucherBooked(rentalCar))
                  toastBottom(constants.bookingProcessText.message);
              }
            } else {
              toastBottom(constants.bookingFailedText);
            }
            break;
          case constants.ferryVoucherType:
            const ferry = storeService.itineraries.getFerryById(
              costingIdentifier
            );
            if (isVoucherAvailable(ferry)) {
              if (isDataSkipped(ferry)) {
                skipData(ferry);
              } else {
                navigation.navigate("TransferVoucher", {
                  transfer: { ...ferry, vehicle: voucherType }
                });
                if (!isVoucherBooked(ferry))
                  toastBottom(constants.bookingProcessText.message);
              }
            } else {
              toastBottom(constants.bookingFailedText);
            }
            break;
          case constants.trainVoucherType:
            const train = storeService.itineraries.getTrainById(
              costingIdentifier
            );
            if (isVoucherAvailable(train)) {
              if (isDataSkipped(train)) {
                skipData(train);
              } else {
                navigation.navigate("TransferVoucher", {
                  transfer: { ...train, vehicle: voucherType }
                });
                if (!isVoucherBooked(train))
                  toastBottom(constants.bookingProcessText.message);
              }
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
  } catch (err) {
    logError("Unable to execute a deep link", {
      err,
      link,
      screenProps,
      deepLink
    });
  }
};

export default resolveLinks;
