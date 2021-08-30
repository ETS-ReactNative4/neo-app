import _ from 'lodash';
import openCustomTab from '../openCustomTab/openCustomTab';
import storeService from '../storeService/storeService';
import {toastBottom} from '../toast/toast';
import directions from '../directions/directions';
import dialer from '../dialer/dialer';
import {logError} from '../errorLogger/errorLogger';
import {Linking, Platform} from 'react-native';
import OpenAppSettingsAndroid from 'react-native-app-settings';
import navigationServiceV2 from '../navigationService/navigationServiceV2';
import {
  SCREEN_MODAL_STACK,
  SCREEN_FLIGHT_VOUCHER,
  SCREEN_HOTEL_VOUCHER,
  SCREEN_ACTIVITY_VOUCHER,
  SCREEN_TRANSFER_VOUCHER,
  SCREEN_RENTAL_CAR_VOUCHER,
} from '../../NavigatorsV2/ScreenNames';
import {modalStackData} from '../../NavigatorsV2/ModalStack';
import {
  CONSTANT_platformIos,
  CONSTANT_voucherErrorStatus,
  CONSTANT_flightVoucherType,
  CONSTANT_hotelVoucherType,
  CONSTANT_activityVoucherType,
  CONSTANT_transferVoucherType,
  CONSTANT_rentalCarVoucherType,
  CONSTANT_ferryVoucherType,
  CONSTANT_trainVoucherType,
} from '../../constants/stringConstants';
import {
  CONSTANT_voucherText,
  CONSTANT_bookingProcessText,
  CONSTANT_bookingFailedText,
} from '../../constants/appText';

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
  voucher && voucher.status !== CONSTANT_voucherErrorStatus;

const isDataSkipped = voucher => _.get(voucher, 'voucher.skipVoucher');

/**
 * Voucher has skipped data,
 * Open the voucher directly in custom tab using voucher url
 */
const skipData = voucher => {
  const url = _.get(voucher, 'voucher.voucherUrl');
  if (url) {
    openCustomTab(url);
  } else {
    toastBottom(CONSTANT_voucherText.voucherUnavailable);
  }
};

/**
 * PT TODO: Remove all the old navigation and replace it with new navigation service
 */
const resolveLinks = (link = '', screenProps = {}, deepLink = {}) => {
  try {
    if (link) {
      /**
       * If link is a webpage, open customTab
       */
      if (
        link.includes('http://') ||
        link.includes('https://') ||
        link.includes('mailto:')
      ) {
        openCustomTab(link);
      } else if (link === 'InfoCardModal') {
        /**
         * If link is `InfoCardModal` open the modal
         */
        navigationServiceV2('TripFeed');
        storeService.tripFeedStore.openInfoCardModal(screenProps);
      } else if (link === 'SystemSettings') {
        /**
         * If link is `SystemSettings` open the system settings page of the app
         */
        if (Platform.OS === CONSTANT_platformIos) {
          Linking.canOpenURL('app-settings:')
            .then(supported => {
              if (!supported) {
                logError('Failed to open iOS app settings');
              } else {
                return Linking.openURL('app-settings:');
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
        const isModalStack = Object.keys(modalStackData).includes(link);
        if (isModalStack) {
          navigationServiceV2(SCREEN_MODAL_STACK, {
            screen: link,
            params: screenProps,
          });
        } else {
          navigationServiceV2(link, screenProps);
        }
      }
    } else if (!_.isEmpty(deepLink)) {
      const {
        voucherType,
        costingIdentifier,
        location = {},
        contactNumber,
      } = deepLink;
      const {latitude, longitude} = location || {};
      /**
       * If `voucherType` and `costingIdentifier` are present in the deeplink,
       * open the respective voucher
       */
      /**
       * Voucher conditions
       * - If voucher has `skipVoucher` set to true, should directly open the voucher url in custom tab
       * - If voucher is free or booked just open the voucher screen
       * - If the voucher is not yet booked, open the voucher screen with incomplete data but also show
       * a toast message saying it's under processing
       */
      if (voucherType && costingIdentifier) {
        const {
          openDate,
          orderId,
        } = storeService.itineraries.selectedItinerary?.itinerary;
        switch (
          _.toUpper(voucherType) // make sure voucher type is case insensitive
        ) {
          case CONSTANT_flightVoucherType:
            const flight = storeService.itineraries.getFlightById(
              costingIdentifier,
            );
            if (isVoucherAvailable(flight)) {
              if (isDataSkipped(flight)) {
                skipData(flight);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_FLIGHT_VOUCHER,
                  params: {flight},
                });
                if (!isVoucherBooked(flight)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;
          case CONSTANT_hotelVoucherType:
            const hotel = storeService.itineraries.getHotelById(
              costingIdentifier,
            );
            if (isVoucherAvailable(hotel)) {
              if (isDataSkipped(hotel)) {
                skipData(hotel);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_HOTEL_VOUCHER,
                  params: {hotel, openDate, orderId},
                });
                if (!isVoucherBooked(hotel)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;
          case CONSTANT_activityVoucherType:
            const activity = storeService.itineraries.getActivityById(
              costingIdentifier,
            );
            if (isVoucherAvailable(activity)) {
              if (isDataSkipped(activity)) {
                skipData(activity);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_ACTIVITY_VOUCHER,
                  params: {activity, openDate},
                });
                if (!isVoucherBooked(activity)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;
          case CONSTANT_transferVoucherType:
            const transfer = storeService.itineraries.getTransferById(
              costingIdentifier,
            );
            if (isVoucherAvailable(transfer)) {
              if (isDataSkipped(transfer)) {
                skipData(transfer);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_TRANSFER_VOUCHER,
                  params: {transfer},
                });
                if (!isVoucherBooked(transfer)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;
          case CONSTANT_rentalCarVoucherType:
            const rentalCar = storeService.itineraries.getRentalCarById(
              costingIdentifier,
            );
            if (isVoucherAvailable(rentalCar)) {
              if (isDataSkipped(rentalCar)) {
                skipData(rentalCar);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_RENTAL_CAR_VOUCHER,
                  params: {rentalCar},
                });
                if (!isVoucherBooked(rentalCar)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;
          case CONSTANT_ferryVoucherType:
            const ferry = storeService.itineraries.getFerryById(
              costingIdentifier,
            );
            if (isVoucherAvailable(ferry)) {
              if (isDataSkipped(ferry)) {
                skipData(ferry);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_TRANSFER_VOUCHER,
                  params: {transfer: {...ferry, vehicle: voucherType}},
                });
                if (!isVoucherBooked(ferry)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;
          case CONSTANT_trainVoucherType:
            const train = storeService.itineraries.getTrainById(
              costingIdentifier,
            );
            if (isVoucherAvailable(train)) {
              if (isDataSkipped(train)) {
                skipData(train);
              } else {
                navigationServiceV2(SCREEN_MODAL_STACK, {
                  screen: SCREEN_TRANSFER_VOUCHER,
                  params: {transfer: {...train, vehicle: voucherType}},
                });
                if (!isVoucherBooked(train)) {
                  toastBottom(CONSTANT_bookingProcessText.message);
                }
              }
            } else {
              toastBottom(CONSTANT_bookingFailedText);
            }
            break;

          default:
            toastBottom(CONSTANT_bookingProcessText.message);
            break;
        }
        return;
      }
      /**
       * if `latitude` and `longitude` are present in the deeplink,
       * open the google maps app
       */
      if (latitude && longitude) {
        directions({latitude, longitude});
        return;
      }
      /**
       * if `contactNumber` is present, open the system dialer
       */
      if (contactNumber) {
        dialer(contactNumber);
        return;
      }
    }
  } catch (err) {
    logError('Unable to execute a deep link', {
      err,
      link,
      screenProps,
      deepLink,
    });
  }
};

export default resolveLinks;
