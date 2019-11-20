import { Platform } from "react-native";

export const CONSTANT_freshChatAppId = "ad957839-0016-4182-9048-520e521688eb";

export const CONSTANT_freshChatAppKey = "90d830d9-8e8d-47f2-a44f-e996ae42d21a";

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

export default stringConstants;
