import { Platform } from "react-native";

const stringConstants = {
  customCheckListName: "Your list",
  defaultSupportType: "GENERAL",
  hotelVoucher: "hotel",
  flightVoucher: "flight",
  activityVoucher: "activity",
  transferVoucher: "transfer",

  noTransferStatus: "NOTRANSFER",
  onArrivalVisaType: "ON_ARRIVAL",
  visaWindowNotOpenedStatus: "WINDOW_NOT_OPENED",

  /**
   * Product APIs
   */
  getPackagesListFromProduct: "api/packages/itineraries",
  productCustomizePage: "customize",
  leadSourceMappingQueryParams: `?cpid=mobile-app&platform=${Platform.OS}-app`,

  /**
   * Static Page Urls
   */
  aboutUs: "about-us",
  termsAndConditions: "terms-and-conditions",
  privacyPolicy: "privacy-policy",
  cancellationPolicy: "cancellation-policy",
  careers: "careers",

  platformIos: "ios",
  platformAndroid: "android",
  httpPrefix: "http://",
  httpsPrefix: "https://",
  responseSuccessStatus: "SUCCESS",

  /**
   * Payment form used to initialize payments
   */
  paymentFormHtml: `
    <form id="voyager-paymentForm" method="post" name="paymentForm">
      <input type="submit" style="display: none;" />
    </form>
  `,

  /**
   * minimum iOS version for custom tabs
   */
  customTabSupportIos: 11.5,

  /**
   * Forex Screen options
   */
  forexProduct: {
    cash: "CASH",
    card: "CARD",
    singleCurrencyCard: "ONE_CURRENCY_CARD",
    multiCurrencyCard: "MULTI_CURRENCY_CARD"
  },

  /**
   * Voucher Type Constants
   */
  flightVoucherType: "FLIGHT",
  hotelVoucherType: "HOTEL",
  trainVoucherType: "TRAIN",
  ferryVoucherType: "FERRY",
  rentalCarVoucherType: "RENTAL_CAR",
  activityVoucherType: "ACTIVITY",
  transferVoucherType: "TRANSFER",

  voucherErrorStatus: "ERROR",

  /**
   * Error Logger constants
   */
  errorLoggerEvents: {
    levels: {
      info: "info"
    },
    categories: {
      pushNotif: "push-notification",
      networkRequest: `network-request`,
      navigation: `navigation`,
      errorData: "error-data",
      analytics: "analytics-data"
    },
    messages: {
      notifReceived: "notification-received",
      notifClicked: "notification-clicked",
      analyticsEvent: "analytics-event",
      errorDetails: "error-details"
    }
  },

  /**
   * Vehicle Types
   */
  vehicleTypes: {
    ferry: "FERRY",
    train: "TRAIN",
    car: "CAR",
    flight: "FLIGHT"
  },

  reservedTrainTicketType: "Reservation",
  openTrainTicketType: "Open",

  /**
   * Transfer Modes
   * used to detect `transferMode` in `intercityTransferSlotDetailVO`
   */
  flightTransferMode: "FLIGHT",
  trainTransferMode: "TRAIN",
  ferryTransferMode: "FERRY",
  rentalCarTransferMode: "RENTALCAR",

  /**
   * Payment Status Strings
   */
  paymentStatusSuccess: "SUCCESS",
  paymentStatusExpired: "EXPIRED",

  /**
   * Voucher Success Status
   */
  voucherSuccessStatus: "SUCCESS",

  /**
   * Hotel Default checkin/checkout time
   */
  hotelDefaultCheckOutTime: "11:00 am",
  hotelDefaultCheckInTime: "02:00 pm",

  /**
   * Text Editor Controls
   */
  textEditorControlBold: "BOLD",
  textEditorControlHeading: "header-two",
  textEditorControlUnordered: "unordered-list-item",
  textEditorControlUnderline: "UNDERLINE",

  tripToggleStatusStorageKey: "@Pickyourtrail/tripToggleStatus",

  /**
   * App Deeplinking URI prefix
   */
  deepLinkPrefix: "pyt://",
  screenLinkType: "screen",
  voucherLinkType: "voucher"
};

export const CONSTANT_customCheckListName = "Your list";
export const CONSTANT_defaultSupportType = "GENERAL";
export const CONSTANT_hotelVoucher = "hotel";
export const CONSTANT_flightVoucher = "flight";
export const CONSTANT_activityVoucher = "activity";
export const CONSTANT_transferVoucher = "transfer";
export const CONSTANT_noTransferStatus = "NOTRANSFER";
export const CONSTANT_onArrivalVisaType = "ON_ARRIVAL";
export const CONSTANT_visaWindowNotOpenedStatus = "WINDOW_NOT_OPENED";
export const CONSTANT_getPackagesListFromProduct = "api/packages/itineraries";
export const CONSTANT_productCustomizePage = "customize";
export const CONSTANT_leadSourceMappingQueryParams = `?cpid=mobile-app&platform=${Platform.OS}-app`;
export const CONSTANT_aboutUs = "about-us";
export const CONSTANT_termsAndConditions = "terms-and-conditions";
export const CONSTANT_privacyPolicy = "privacy-policy";
export const CONSTANT_cancellationPolicy = "cancellation-policy";
export const CONSTANT_careers = "careers";
export const CONSTANT_platformIos = "ios";
export const CONSTANT_platformAndroid = "android";
export const CONSTANT_httpPrefix = "http://";
export const CONSTANT_httpsPrefix = "https://";
export const CONSTANT_responseSuccessStatus = "SUCCESS";
export const CONSTANT_responseUserUnavailable = "USER_UNAVAILABLE";
export const CONSTANT_customTabSupportIos = 11.5;
export const CONSTANT_forexProduct = {
  cash: "CASH",
  card: "CARD",
  singleCurrencyCard: "ONE_CURRENCY_CARD",
  multiCurrencyCard: "MULTI_CURRENCY_CARD"
};
export const CONSTANT_flightVoucherType = "FLIGHT";
export const CONSTANT_hotelVoucherType = "HOTEL";
export const CONSTANT_trainVoucherType = "TRAIN";
export const CONSTANT_ferryVoucherType = "FERRY";
export const CONSTANT_rentalCarVoucherType = "RENTAL_CAR";
export const CONSTANT_activityVoucherType = "ACTIVITY";
export const CONSTANT_transferVoucherType = "TRANSFER";
export const CONSTANT_voucherErrorStatus = "ERROR";
export const CONSTANT_errorLoggerEvents = {
  levels: { info: "info" },
  categories: {
    pushNotif: "push-notification",
    networkRequest: `network-request`,
    navigation: `navigation`,
    errorData: "error-data",
    analytics: "analytics-data"
  },
  messages: {
    notifReceived: "notification-received",
    notifClicked: "notification-clicked",
    analyticsEvent: "analytics-event",
    errorDetails: "error-details"
  }
};
export const CONSTANT_vehicleTypes = {
  ferry: "FERRY",
  train: "TRAIN",
  car: "CAR",
  flight: "FLIGHT"
};
export const CONSTANT_reservedTrainTicketType = "Reservation";
export const CONSTANT_openTrainTicketType = "Open";
export const CONSTANT_flightTransferMode = "FLIGHT";
export const CONSTANT_trainTransferMode = "TRAIN";
export const CONSTANT_ferryTransferMode = "FERRY";
export const CONSTANT_rentalCarTransferMode = "RENTALCAR";
export const CONSTANT_paymentStatusSuccess = "SUCCESS";
export const CONSTANT_paymentStatusExpired = "EXPIRED";
export const CONSTANT_voucherSuccessStatus = "SUCCESS";
export const CONSTANT_hotelDefaultCheckOutTime = "11:00 am";
export const CONSTANT_hotelDefaultCheckInTime = "02:00 pm";
export const CONSTANT_textEditorControlBold = "BOLD";
export const CONSTANT_textEditorControlHeading = "header-two";
export const CONSTANT_textEditorControlUnordered = "unordered-list-item";
export const CONSTANT_textEditorControlUnderline = "UNDERLINE";
export const CONSTANT_tripToggleStatusStorageKey =
  "@Pickyourtrail/tripToggleStatus";
export const CONSTANT_deepLinkPrefix = "pyt://";
export const CONSTANT_screenLinkType = "screen";
export const CONSTANT_voucherLinkType = "voucher";

export const CONSTANT_paymentFormHtml = `
  <form id="voyager-paymentForm" method="post" name="paymentForm">
    <input type="submit" style="display: none;" />
  </form>
`;

export default stringConstants;
