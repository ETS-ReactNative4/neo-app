import constants from "./constants";
import serverUrls from "./serverUrls";
import PackageInfo from "../package.json";

const imageAssets = {
  splashBackground: require("../assets/images/backgrounds/viceroy-bali.jpg.jpg"),
  starterBackground: require("../assets/images/backgrounds/viceroy-bali.jpg.jpg"),
  drawerBackground: require("../assets/images/backgrounds/drawer.png"),
  pytLogo:
    PackageInfo.environment === "production"
      ? require("../assets/images/icons/logo.png")
      : require("../assets/images/icons/logo-dev.png"),
  notificationIcon: require("../assets/images/icons/notification.png"),
  backArrow: require("../assets/images/icons/left-arrow.png"),
  dropDownArrow: require("../assets/images/icons/drop-down-arrow.png"),
  closeIcon: "close",
  loadingIcon: require("../assets/images/loaders/loader.gif"),
  hamburgerIcon: require("../assets/images/icons/menu.png"),
  headerBackgroundShape: require("../assets/images/shapes/banner_white.png"),
  aeroplaneIcon: "flight",
  busIcon: "bus",
  ferryIcon: "ferry",
  trainIcon: "train",
  activityIcon: "activity",
  hotelIcon: "hotel",
  clockIcon: "clock",
  locationIcon: "location",
  semiCircleShape: require("../assets/images/shapes/hiring_topic.png"),

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
  searchIcon: "search",
  swapVertIcon: "swap_vert",
  speakerIcon: "speaker",
  speakerAnimatedIcon: require("../assets/images/loaders/voice.gif"),
  pinIcon: "pin",
  checkBoxIcon: "checkbox-unchecked",
  checkBoxCheckedIcon: "checkbox-checked",
  callIcon: "call-end",
  compassIcon: "compass",
  trashCanIcon: "trash-can",

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
  invitePassengersIcon: require("../assets/images/toolIcons/invite-co-passanger.png"),
  medicalCareIcon: require("../assets/images/toolIcons/medical-care.png"),
  packageChecklistIcon: require("../assets/images/toolIcons/packing-checklist.png"),
  passportDetailsIcon: require("../assets/images/toolIcons/passport-details.png"),
  yourPickIcon: require("../assets/images/toolIcons/your-picks.png"),
  dialogBoxIcon:
    "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-shuttle.jpg",

  /**
   * TODO: Airline logo placeholder
   * @param airlineCode
   * @returns {string}
   */
  getAirlineIcon: airlineCode =>
    airlineCode
      ? `${serverUrls.airlineCdn}${airlineCode.trim()}.png`
      : `${serverUrls.airlineCdn}${"placeholder"}.png`,
  transferPlaceHolder: "placeholder"
};

export default imageAssets;
