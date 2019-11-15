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
  getCurrencyByItinerary: "mobile/:itineraryId/currencies",
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
  getVisaDetails: "mobile/visa/:visaId",
  sendVisaDocs: "mobile/sendVisaDocs",
  getPaymentMeta: "mobile/booked/itinerary/paymentMetaInfo",
  getPaymentInfo: "mobile/:itineraryId/paymentInfo",
  getFaq: "mobile/v2/faq",
  getTripFeed: "mobile/feeds",
  initiatePayment: "api/payment/initiatepayment",
  sendTicketMessage: "mobile/ticket/msg",
  retrieveTicketMessages: "mobile/ticket/msgs/retrieve",
  retrieveTickets: "mobile/tickets/status",
  getForexStatus: "mobile/forex/status",
  sendUserDataToForex: "mobile/forex",
  getForexInfoFromGuides: "mobile/guides/survival/forex",
  setDeviceInfo: "mobile/deviceinfo",
  initiateChat: "mobile/chat/initiate",
  setChatRestoreId: "mobile/chat/restoreid",
  getDaywiseFeedbackOptions: "mobile/footers",
  journalImageDetails: "mobile/journal/image",
  journalStoryOperations: "mobile/journal/story",
  journalDeleteStory: "mobile/journal/story/:storyId",
  getVisaHomeInfo: "mobile/visa/screen/info/home",
  initiateVisaProcess: "mobile/visa/initialize",
  visaChecklistDetails: "mobile/visa/checklist",

  getJournalScreenDetails: "mobile/journal/screen/info/home",
  getJournalStartScreenDetails: "mobile/journal/screen/info/setup",
  initializeJournal: "mobile/journal/initialize",
  refreshJournalData: "mobile/journal",
  updateJournalDetails: "mobile/journal/update",
  getStoryImageSignedUrl: "mobile/journal/image/signedurl",
  publishJournal: "mobile/journal/publish",

  googleDrivePdfViewer: "https://drive.google.com/viewerng/viewer?url="
};

export const CONSTANT_updateVisaSuccessAnimationSeen =
  "mobile/visa/congrats-status";

export default apiUrls;
