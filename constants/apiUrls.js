const apiUrls = {
  verifyMobileNumber: "mobile/user/verify/sendotp",
  verifyOtp: "mobile/login",
  getYourTrips: "mobile/yourtrips",
  getItineraryDetails: "mobile/itineraryDetails",
  getFinalVoucherDownloadUrl: "mobile/:itineraryId/getFinalVoucherUrl",
  getPackingChecklist: "mobile/displayCheckList",
  getCheckList: "mobile/getCheckList",
  updatePackingChecklist: "mobile/updateCheckList",
  voucherDetails: "mobile/voucher",
  getCurrencyRates: "mobile/getCurrencyConverterRates",
  getCurrencyList: "mobile/getCurrency",
  googleTextSearch: "mobile/places/search/:keyword",
  googleNearBySearch: "mobile/places/nearby",
  getCityPlaceCategory: "mobile/places/categories",
  getPlaceDetails: "mobile/places/detail/:placeId",
  weatherHourlyForecast: (key, lat, long, time) =>
    `forecast/${key}/${lat},${long},${time}?exclude=flags,daily&units=si`,
  getUserDetails: "mobile/userdetails",
  getAllPhrases: "mobile/getItineraryPhraseBook",
  translatePhrase: "mobile/translate",
  getLanguages: "mobile/getLanguageOfCity",
  pinPhrase: "mobile/pinnedPhrase",
  getPinnedPhrases: "mobile/getpinnedPhraseForUser",
  registerDeviceToken: "mobile/devicetoken",
  getEmergencyContacts: "mobile/city/contacts/emergency",
  getPassportDetails: "mobile/:itineraryId/passport/details",
  getVisaDetails: "mobile/:itineraryId/visa/details",
  sendVisaDocs: "mobile/sendVisaDocs",
  getPaymentMeta: "mobile/booked/itinerary/paymentMetaInfo",
  getPaymentInfo: "mobile/:itineraryId/paymentInfo",
  getFaq: "mobile/getFAQ",
  getTripFeed: "mobile/feeds",
  initiatePayment: "payment/initiatepayment",
  sendTicketMessage: "mobile/ticket/msg",
  retrieveTicketMessages: "mobile/ticket/msgs/retrieve",
  retrieveTickets: "mobile/tickets/status",

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

  tripToggleStatusStorageKey: "@Pickyourtrail/tripToggleStatus",
  preTripChatActivationTime: 72,
  googleDrivePdfViewer: "https://drive.google.com/viewerng/viewer?url="
};

export default apiUrls;
