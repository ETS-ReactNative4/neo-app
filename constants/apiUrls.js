const apiUrls = {
  verifyMobileNumber: 'mobile/user/verify/sendotp',
  verifyOtp: 'mobile/login',
  getYourTrips: 'mobile/yourtrips',
  getItineraryDetails: 'mobile/itineraryDetails',
  getFinalVoucherDownloadUrl: 'mobile/:itineraryId/getFinalVoucherUrl',
  getPackingChecklist: 'mobile/displayCheckList',
  getCheckList: 'mobile/getCheckList',
  updatePackingChecklist: 'mobile/updateCheckList',
  voucherDetails: 'mobile/voucher',
  // getCurrencyRates: 'mobile/getCurrencyConverterRates',
  getAll: 'location/indianCities/all',
  login: 'postapi/login',
  fetchUser: 'api/v3/user',
  salesMetrics: 'api/v3/sales/neo/metrics',
  counts: 'api/v3/sales/neo/leads/counts',
  trailStatuses: 'api/v3/master/trail-statuses',
  callResponses: 'api/v3/master/call-responses',
  reasons: 'api/v3/master/reasons',
  trail: 'api/v3/trail',
  cities: 'api/v3/master/cities',
  regions: 'api/v3/master/regions',
  allUsers: 'api/v3/user/all',
  roles: 'api/v3/master/roles',
  trailUpdate: 'api/v3/trail',
  customerUpdate: 'api/v3/customer',
  callNotesUpdate: 'api/v3/trail/call-notes',
  leadPool: 'api/v3/sales/neo/lead-pool',
  tempHotels: 'api/v3/master/temp-hotels',

  getCurrencyList: 'mobile/getCurrency',
  getCurrencyByItinerary: 'mobile/:itineraryId/currencies',
  googleTextSearch: 'mobile/places/search/:keyword',
  googleNearBySearch: 'mobile/places/nearby',
  getCityPlaceCategory: 'mobile/places/categories',
  getPlaceDetails: 'mobile/places/detail/:placeId',
  weatherHourlyForecast: (key, lat, long, time) =>
    `forecast/${key}/${lat},${long},${time}?exclude=flags,daily&units=si`,
  // getUserDetails: 'mobile/userdetails',
  getAllPhrases: 'mobile/getItineraryPhraseBook',
  translatePhrase: 'mobile/translate',
  getLanguages: 'mobile/getLanguageOfCity',
  pinPhrase: 'mobile/pinnedPhrase',
  getPinnedPhrases: 'mobile/getpinnedPhraseForUser',
  registerDeviceToken: 'mobile/devicetoken',
  getEmergencyContacts: 'mobile/city/contacts/emergency',
  getPassportDetails: 'mobile/:itineraryId/passport/details',
  getVisaDetails: 'mobile/visa/:visaId',
  sendVisaDocs: 'mobile/sendVisaDocs',
  getPaymentMeta: 'mobile/booked/itinerary/paymentMetaInfo',
  getPaymentInfo: 'mobile/:itineraryId/paymentInfo',
  getFaq: 'mobile/v2/faq',
  getTripFeed: 'mobile/feeds',
  initiatePayment: 'api/payment/initiatepayment',
  sendTicketMessage: 'mobile/ticket/msg',
  retrieveTicketMessages: 'mobile/ticket/msgs/retrieve',
  retrieveTickets: 'mobile/tickets/status',
  getForexStatus: 'mobile/forex/status',
  sendUserDataToForex: 'mobile/forex',
  getForexInfoFromGuides: 'mobile/guides/survival/forex',
  setDeviceInfo: 'mobile/deviceinfo',
  initiateChat: 'mobile/chat/initiate',
  setChatRestoreId: 'mobile/chat/restoreid',
  getDaywiseFeedbackOptions: 'mobile/footers',
  journalImageDetails: 'mobile/journal/image',
  journalStoryOperations: 'mobile/journal/story',
  journalDeleteStory: 'mobile/journal/story/:storyId',
  getVisaHomeInfo: 'mobile/visa/screen/info/home',
  initiateVisaProcess: 'mobile/visa/initialize',
  visaChecklistDetails: 'mobile/visa/checklist',

  getJournalScreenDetails: 'mobile/journal/screen/info/home',
  getJournalStartScreenDetails: 'mobile/journal/screen/info/setup',
  initializeJournal: 'mobile/journal/initialize',
  refreshJournalData: 'mobile/journal',
  updateJournalDetails: 'mobile/journal/update',
  getStoryImageSignedUrl: 'mobile/journal/image/signedurl',
  publishJournal: 'mobile/journal/publish',

  googleDrivePdfViewer: 'https://drive.google.com/viewerng/viewer?url=',
};

export const CONSTANT_updateVisaSuccessAnimationSeen = 'mobile/visa';
export const CONSTANT_guestLogin = 'authentication/guestsession';
export const CONSTANT_verifyMobileNumber = 'mobile/user/verify/sendotp';
export const CONSTANT_verifyMobileNumberV2 = 'authentication/user';
export const CONSTANT_registerNewUser = 'user/homePage/signup';
export const CONSTANT_requestOtp = 'authentication/otp';
export const CONSTANT_verifyOtp = 'mobile/login';
export const CONSTANT_verifyOtpV2 = 'authentication/login';
export const CONSTANT_retrieveGlobalData = 'data/page';
export const CONSTANT_retrieveJson = 'mobile/content';
export const CONSTANT_userProfileInfo = 'userprofile/userprofileinfo';
export const CONSTANT_userProfileData = 'userprofile';
export const CONSTANT_getCountriesList = 'data/country';
export const CONSTANT_getDomesticRegionList = 'data/domesticRegions';
export const CONSTANT_getPackagesDetails = 'packages';
export const CONSTANT_getCity = 'city';
export const CONSTANT_getHotelDeal = 'ota/hotel/deals?planningToolId=';
export const CONSTANT_createItinerary = 'ota/hotel/itinerary';
export const CONSTANT_coupon_apply = ({coupon, itineraryId}) =>
  `coupon/apply/${coupon}?itineraryId=${itineraryId}`;
export const CONSTANT_coupon_remove = ({itineraryId}) =>
  `coupon/remove/${itineraryId}`;
export const CONSTANT_LOYALTY_CREDITS = ({userId, includeReferral = false}) =>
  `api/user/rewards/${userId}?includeReferral=${includeReferral}`;
export const CONSTANT_loyalty_apply = ({coupon, itineraryId}) =>
  `coupon/loyalty/apply?itineraryId=${itineraryId}&redeemedAmount=${coupon}&requireUpdatedItinerary=true`;
export const CONSTANT_loyalty_remove = ({itineraryId}) =>
  `coupon/loyalty/remove/${itineraryId}`;
export const CONSTANT_savePassengers = 'booking/savepassengers';
export const CONSTANT_getYourTrips = 'mobile/yourtrips';
export const CONSTANT_getItineraryDetails = 'mobile/itineraryDetails';
export const CONSTANT_savedItineraryDetails = 'user/saveditineraries/v2';
export const CONSTANT_userStateDetails = 'user/state';
export const CONSTANT_getMaritalStatusData =
  'mobile/content?jsonFile=maritalStatusData.json';
export const CONSTANT_itineraryMagicLink = 'itinerary/magiclink';
export const CONSTANT_getFinalVoucherDownloadUrl =
  'mobile/:itineraryId/getFinalVoucherUrl';
export const CONSTANT_getNotificationDetails =
  'itinerary/:itineraryId/notifications';
export const CONSTANT_notificationRead = 'pushnotifications/read';
export const CONSTANT_getPackingChecklist = 'mobile/displayCheckList';
export const CONSTANT_getCheckList = 'mobile/getCheckList';
export const CONSTANT_updatePackingChecklist = 'mobile/updateCheckList';
export const CONSTANT_voucherDetails = 'mobile/voucher';
export const CONSTANT_getCurrencyRates = 'mobile/getCurrencyConverterRates';
export const CONSTANT_getCurrencyList = 'mobile/getCurrency';
export const CONSTANT_getCurrencyByItinerary = 'mobile/:itineraryId/currencies';
export const CONSTANT_googleTextSearch = 'mobile/places/search/:keyword';
export const CONSTANT_googleNearBySearch = 'mobile/places/nearby';
export const CONSTANT_getCityPlaceCategory = 'mobile/places/categories';
export const CONSTANT_getPlaceDetails = 'mobile/places/detail/:placeId';
export const CONSTANT_weatherHourlyForecast = (key, lat, long, time) =>
  `forecast/${key}/${lat},${long},${time}?exclude=flags,daily&units=si`;
export const CONSTANT_getUserDetails = 'mobile/userdetails';
export const CONSTANT_getAllPhrases = 'mobile/getItineraryPhraseBook';
export const CONSTANT_translatePhrase = 'mobile/translate';
export const CONSTANT_getLanguages = 'mobile/getLanguageOfCity';
export const CONSTANT_pinPhrase = 'mobile/pinnedPhrase';
export const CONSTANT_getPinnedPhrases = 'mobile/getpinnedPhraseForUser';
export const CONSTANT_registerDeviceToken = 'mobile/devicetoken';
export const CONSTANT_getEmergencyContacts = 'mobile/city/contacts/emergency';
export const CONSTANT_getPassportDetails =
  'mobile/:itineraryId/passport/details';
export const CONSTANT_requestCallback = 'itinerary/requestcallbackuser';
export const CONSTANT_assignUser =
  'itinerary/campaign/:campaignItineraryId/assignUser';
export const CONSTANT_calculateCost = 'itinerary/:itineraryId/calculateCost';
export const CONSTANT_checkCostingStatus =
  'itinerary/:itineraryId/checkCostingStatus';
export const CONSTANT_itineraryDetails = 'itinerary/:itineraryId/details';
export const CONSTANT_getVisaDetails = 'mobile/visa/:visaId';
export const CONSTANT_sendVisaDocs = 'mobile/sendVisaDocs';
export const CONSTANT_getPaymentMeta =
  'mobile/booked/itinerary/paymentMetaInfo';
export const CONSTANT_travelProfile = 'user/travellerprofile';
export const CONSTANT_retrievePDF = 'cost/:itineraryId/createpdf/v3';
export const CONSTANT_userProfile = 'user';
export const CONSTANT_retrieveUserProfile = 'user/getUserDetails';
export const CONSTANT_userDetailsResource = 'user/userDetails';
export const CONSTANT_getPaymentInfo = 'mobile/:itineraryId/paymentInfo';
export const CONSTANT_getFaq = 'mobile/v2/faq';
export const CONSTANT_getTripFeed = 'mobile/feeds';
export const CONSTANT_pushnotificationClicked = 'pushnotifications/clicked';
export const CONSTANT_feedWidgetClicked = 'mobile/feed/clicked';
export const CONSTANT_initiatePayment = 'api/payment/initiatepayment';
export const CONSTANT_sendTicketMessage = 'mobile/ticket/msg';
export const CONSTANT_retrieveTicketMessages = 'mobile/ticket/msgs/retrieve';
export const CONSTANT_retrieveTickets = 'mobile/tickets/status';
export const CONSTANT_getForexStatus = 'mobile/forex/status';
export const CONSTANT_sendUserDataToForex = 'mobile/forex';
export const CONSTANT_getForexInfoFromGuides = 'mobile/guides/survival/forex';
export const CONSTANT_setDeviceInfo = 'mobile/deviceinfo';
export const CONSTANT_initiateChat = 'mobile/chat/initiate';
export const CONSTANT_setChatRestoreId = 'mobile/chat/restoreid';
export const CONSTANT_getDaywiseFeedbackOptions = 'mobile/footers';
export const CONSTANT_journalImageDetails = 'mobile/journal/image';
export const CONSTANT_journalStoryOperations = 'mobile/journal/story';
export const CONSTANT_journalDeleteStory = 'mobile/journal/story/:storyId';
export const CONSTANT_getVisaHomeInfo = 'mobile/visa/screen/info/home';
export const CONSTANT_getIndianCities = 'location/indianCities';
export const CONSTANT_loadPackagesSearch = 'packages/search';
export const CONSTANT_loadPackagesSearchv2 = 'packages/search/v2';
export const CONSTANT_initiateVisaProcess = 'mobile/visa/initialize';
export const CONSTANT_visaChecklistDetails = 'mobile/visa/checklist';
export const CONSTANT_getJournalScreenDetails =
  'mobile/journal/screen/info/home';
export const CONSTANT_packages = 'packages';
export const CONSTANT_getJournalStartScreenDetails =
  'mobile/journal/screen/info/setup';
export const CONSTANT_initializeJournal = 'mobile/journal/initialize';
export const CONSTANT_refreshJournalData = 'mobile/journal';
export const CONSTANT_updateJournalDetails = 'mobile/journal/update';
export const CONSTANT_getStoryImageSignedUrl = 'mobile/journal/image/signedurl';
export const CONSTANT_publishJournal = 'mobile/journal/publish';
export const CONSTANT_googleDrivePdfViewer =
  'https://drive.google.com/viewerng/viewer?url=';
export const CONSTANT_feedbackUserState = 'feedback/userState';
export const CONSTANT_feedbackInfo = 'feedback';
export const CONSTANT_postBookingIntroData =
  'so-feedback/json/postBookingIntro.json';
export const CONSTANT_pocCardData = 'so-feedback/json/pocCardData.json';
export const CONSTANT_maldivesPocCardData =
  'so-feedback/json/maldivesPocCardData.json';
export const CONSTANT_appVersionCheck = 'mobile/appversion';
export const POST_MALDIVES_BOOKING_FAQ = 'post_maldives_booking_faq.json';
export const POST_STAYCATION_BOOKING_FAQ = 'post_staycation_booking_faq.json';
export const POST_BOOKING_FAQ = 'post_booking_faq.json';

export const CONSTANT_pytClubBenefits =
  'https://oceanjar-new.s3.ap-south-1.amazonaws.com/pdfs/pytClubBenefits-compressed.pdf';
export const CONSTANT_platoListTickets = 'mobile/plato/ticketing';
export const CONSTANT_uploadAssets = 'data/assets/app';
export default apiUrls;
