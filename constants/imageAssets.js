import constants from "./constants";
import serverUrls from "./serverUrls";
import PackageInfo from "../package.json";

const prefix = serverUrls.miscImageBaseUrl + "placeholders/";

const imageAssets = {
  splashBackground: require("../assets/images/backgrounds/viceroy-bali.jpg.jpg"),
  starterBackground: require("../assets/images/backgrounds/starterImage.jpg"),
  drawerBackground: require("../assets/images/backgrounds/drawer.png"),
  pytLogo:
    PackageInfo.environment === "production"
      ? require("../assets/images/icons/logo.png")
      : require("../assets/images/icons/logo-dev.png"),
  pytLogoNew: require("../assets/images/icons/logo_new.png"),
  notificationIcon: require("../assets/images/icons/notification.png"),
  backArrow: require("../assets/images/icons/left-arrow.png"),
  backIcon: "nav-left",
  dropDownArrow: require("../assets/images/icons/drop-down-arrow.png"),
  closeIcon: "close",
  userIcon: "account",
  loadingIcon: require("../assets/images/loaders/loader.gif"),
  bookingProcessingIcon: require("../assets/images/loaders/bookingProcessing.gif"),
  hamburgerIcon: require("../assets/images/icons/menu.png"),
  aeroplaneIcon: "flight",
  flightVoucherBanner: require("../assets/images/backgrounds/flightVoucherHeader.jpg"),
  busIcon: "bus",
  ferryIcon: "ferry",
  visaIcon: "cc-visa",
  insuranceIcon: "insurance",
  transferIcon: "transfer",
  trainIcon: "train",
  passIcon: "pass",
  carIcon: "car",
  activityIcon: "activity",
  leisureIcon: require("../assets/images/icons/leisure.png"),
  hotelIcon: "hotel",
  clockIcon: "clock",
  infoIcon: "about",
  locationIcon: "location",

  semiCircleShape: require("../assets/images/shapes/hiring_topic.png"),
  headerBackgroundShape: require("../assets/images/shapes/banner_white.png"),
  comingSoonShape: require("../assets/images/shapes/coming-soon.png"),

  tripFeedIcon: "trip-feed",
  tripFeedSelectedIcon: "trip-feed-active",
  bookingIcon: "booking",
  bookingSelectedIcon: "booking-active",
  supportIcon: "support",
  supportSelectedIcon: "support-active",
  toolIcon: "tools",
  toolSelectedIcon: "tools-active",
  journalIcon: "journal",
  journalSelectedIcon: "journal-active",
  moreOptionsHorizIcon: "more-options-horiz",
  arrowRight: "arrow-right",
  arrowDown: "arrow-down",
  starActive: "star-active",
  searchIcon: "search",
  swapVertIcon: "swap_vert",
  speakerIcon: "speaker",
  speakerAnimatedIcon: require("../assets/images/loaders/voice.gif"),
  speakerInactiveIcon: require("../assets/images/loaders/voice-inactive.png"),
  pinIcon: "pin",
  checkBoxIcon: "checkbox-unchecked",
  checkBoxCheckedIcon: "checkbox-checked",
  checkIcon: "check",
  syncIcon: "sync",
  callIcon: "call-end",
  compassIcon: "compass",
  trashCanIcon: "trash-can",
  noInternetIcon: "no-internet",

  weatherGraphInactive: require("../assets/images/weatherPlaceholders/weather-graph-disabled.png"),
  weatherCardPlaceholder: require("../assets/images/weatherPlaceholders/weather-placeholder.png"),

  weatherForecastIcon: require("../assets/images/toolIcons/weather-forcast.png"),
  cancelTripIcon: require("../assets/images/toolIcons/cancel-trip.png"),
  commonPhrasesIcon: require("../assets/images/toolIcons/common-phrases.png"),
  completePaymentIcon: require("../assets/images/toolIcons/complete-payment.png"),
  currencyCalculatorIcon: require("../assets/images/toolIcons/currency-calculator.png"),
  documentVisaIcon: require("../assets/images/toolIcons/document-visa.png"),
  downloadInvoiceIcon: require("../assets/images/toolIcons/download-invoice.png"),
  emergencyContactsIcon: require("../assets/images/toolIcons/emergency-contacts.png"),
  faqIcon: require("../assets/images/toolIcons/faq.png"),
  invitePassengersIcon: require("../assets/images/toolIcons/invite-co-passanger-240px.png"),
  medicalCareIcon: require("../assets/images/toolIcons/medical-care.png"),
  packageChecklistIcon: require("../assets/images/toolIcons/packing-checklist-480.png"),
  passportDetailsIcon: require("../assets/images/toolIcons/passport-details.png"),
  yourPickIcon: require("../assets/images/toolIcons/your-picks.png"),
  dialogBoxIcon:
    "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-shuttle.jpg",

  helpSupportIllus: require("../assets/images/illustrations/help-and-support-image.png"),
  paymentSuccessIllus: require("../assets/images/illustrations/payment-success.png"),
  paymentFailureIllus: require("../assets/images/illustrations/payment-failure.png"),
  successBoxIllus: require("../assets/images/illustrations/Alert-icons-success.png"),
  errorBoxIllus: require("../assets/images/illustrations/Alert-icons-failure.png"),
  infoBoxIllus: require("../assets/images/illustrations/Alert-icons-info.png"),
  alertBoxIllus: require("../assets/images/illustrations/Alert-icons.png"),
  journalComingSoonIllus: require("../assets/images/illustrations/coming-soon/travel-memories-coming-soon.png"),

  /**
   * TODO: Airline logo placeholder && transfer placeholder
   * @param airlineCode
   * @returns {string}
   */
  getAirlineIcon: airlineCode =>
    airlineCode
      ? `${serverUrls.airlineCdn}${airlineCode.trim()}.png`
      : `${serverUrls.airlineCdn}${"placeholder"}.png`,
  airLineLogoPlaceHolder: prefix + "Airline-logo.png",
  transferPlaceHolder: "placeholder",
  activitySmallPlaceHolder: prefix + "Activity1-50x50.png",
  activityMediumPlaceHolder: prefix + "Activity1-125x125.png",
  activityLargePlaceHolder: prefix + "Activity1-640x360.png",
  activity2SmallPlaceHolder: prefix + "Activity2-50x50.png",
  activity2MediumPlaceHolder: prefix + "Activity2-125x125.png",
  activity2LargePlaceHolder: prefix + "Activity2-640x360.png",
  activity3SmallPlaceHolder: prefix + "Activity3-50x50.png",
  activity3MediumPlaceHolder: prefix + "Activity3-125x125.png",
  activity3LargePlaceHolder: prefix + "Activity3-640x360.png",
  citySmallPlaceHolder: prefix + "Guides-City-395x360.png",
  cityLargePlaceHolder: prefix + "Guides-City-790x720.png",
  foodSmallPlaceHolder: prefix + "Guides-Food-120x120.png",
  foodLargePlaceHolder: prefix + "Guides-Food-240x240.png",
  innerAreasSmallPlaceHolder: prefix + "Guides-InnerAreas-230x140.png",
  innerAreasLargePlaceHolder: prefix + "Guides-InnerAreas-460x280.png",
  shoppingSmallPlaceHolder: prefix + "Guides-Shopping-150x105.png",
  shoppingLargePlaceHolder: prefix + "Guides-Shopping-300x210.png",
  hotelSmallPlaceHolder: prefix + "Hotel-50x50.png",
  hotelMediumPlaceHolder: prefix + "Hotel-125x125.png",
  hotelBigPlaceHolder: prefix + "Hotel-200x150.png",
  hotelLargePlaceHolder: prefix + "Hotel-640x360.png",
  roomsSmallPlaceHolder: prefix + "HotelRooms-120x90.png",
  roomsLargePlaceHolder: prefix + "HotelRooms-240x180.png"
};

export default imageAssets;
