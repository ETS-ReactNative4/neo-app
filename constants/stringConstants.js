const stringConstants = {
  customCheckListName: "Your list",
  defaultSupportType: "GENERAL",
  hotelVoucher: "hotel",
  flightVoucher: "flight",
  activityVoucher: "activity",
  transferVoucher: "transfer",

  /**
   * Product APIs
   */
  getPackagesListFromProduct: "api/packages/itineraries",
  productCustomizePage: "customize",
  productAnalyticsCPID: "mobile-app",

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

  /**
   * Hotel Default checkin/checkout time
   */
  hotelDefaultCheckOutTime: "11:00 am",
  hotelDefaultCheckInTime: "02:00 pm",

  tripToggleStatusStorageKey: "@Pickyourtrail/tripToggleStatus",
  preTripChatActivationTime: 72
};

export default stringConstants;
