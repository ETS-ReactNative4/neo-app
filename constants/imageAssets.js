import serverUrls from "./serverUrls";
import { isIphoneX } from "react-native-iphone-x-helper";
import { isProduction } from "../Services/getEnvironmentDetails/getEnvironmentDetails";

const prefix = serverUrls.miscImageBaseUrl + "placeholders/";

export const CONSTANT_mailIcon = "email";
export const CONSTANT_alertFilledIcon = "alert-fill";
export const CONSTANT_visaSuccessAnimation = () =>
  require("../assets/animations/visaSuccess.json");
export const CONSTANT_customBlockCardIcon = "other";
export const CONSTANT_customBlockCardBanner = () =>
  require("../assets/images/illustrations/banner-block-cards.png");

const imageAssets = {
  splashBackground: isIphoneX()
    ? require("../assets/images/backgrounds/splashImage.webp")
    : require("../assets/images/backgrounds/splashImageAndroid.webp"),
  starterScreenBackground: isIphoneX()
    ? require("../assets/images/backgrounds/starterScreenBackground.jpg")
    : require("../assets/images/backgrounds/starterScreenBackgroundAndroid.jpg"),
  starterTopImage: require("../assets/images/backgrounds/starter_screen_top.jpg"),
  starterBottomImage: require("../assets/images/backgrounds/starter_screen_bottom.jpg"),
  starterBackground: require("../assets/images/backgrounds/starterImage.jpg"),
  pytLogo: isProduction()
    ? require("../assets/images/icons/logo_new.png")
    : require("../assets/images/icons/logo-dev.png"),
  forexPartnerLogo: require("../assets/images/icons/forex-partner.png"),
  pytLogoNew: require("../assets/images/icons/logo_new.png"),
  pytLogoWhite: require("../assets/images/icons/pickyourtrail-white-logo.png"),
  pytLogoBlack: require("../assets/images/icons/pickyourtrail-black-logo.png"),
  notificationIcon: require("../assets/images/icons/notification.png"),
  defaultUserIcon: require("../assets/images/icons/default-user.png"),
  backArrow: require("../assets/images/icons/left-arrow.png"),
  backIcon: "nav-left",
  dropDownArrow: require("../assets/images/icons/drop-down-arrow.png"),
  dropDownArrowIcon: "arrow",
  dropDownArrowDarkIcon: "chevron-down-small",
  closeIcon: "close",
  userIcon: "account",
  loadingIcon: require("../assets/images/loaders/loader.gif"),
  bookingProcessingIcon: "refresh",
  hamburgerIcon: "nav-menu",
  homeIcon: "home",
  logoutIcon: "logout",
  paymentIcon: "payment",
  aeroplaneIcon: "flight",
  aeroplaneTakeOffIcon: "flight-right",
  flightVoucherBanner: require("../assets/images/backgrounds/flightVoucherHeader.jpg"),
  drawerBackgroundImage: require("../assets/images/backgrounds/side-menu-bg.png"),
  busIcon: "bus",
  ferryIcon: "ferry",
  visaIcon: "visa",
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
  aboutInfoIcon: "about-info",
  storybookIcon: "storybook",
  warningIcon: "warning",
  thumbsUpIcon: "like",
  thumbsDownIcon: "unlike",
  locationIcon: "location",
  cropIcon: "crop",
  containIcon: "minimize",
  addIcon: "plus",
  addImageIcon: "image-upload",
  editIcon: "edit",
  gearIcon: "setting",
  shareIcon: "share",
  facebookIcon: "facebook",
  twitterIcon: "twitter",
  shareFilledIcon: "share-fill",
  facebookFilledIcon: "facebook-fill",
  twitterFilledIcon: "twitter-fill",
  keyboardDismissIcon: "collapse-keyboard",
  eyeIcon: "visibility",
  uploadIcon: "typical-social-share",

  semiCircleShape: require("../assets/images/shapes/hiring_topic.png"),
  headerBackgroundShape: require("../assets/images/shapes/banner_white.png"),
  comingSoonShape: require("../assets/images/shapes/coming-soon.png"),
  packageTrianglePink: require("../assets/images/shapes/package-shape-pink.png"),
  packageTriangleBlue: require("../assets/images/shapes/package-shape-blue.png"),
  packageTriangleGold: require("../assets/images/shapes/package-shape-gold.png"),
  quotationMarkImage: require("../assets/images/shapes/quotation-mark.png"),
  positiveBackgroundShape: require("../assets/images/shapes/positive-background.png"),
  negativeBackgroundShape: require("../assets/images/shapes/negative-background.png"),

  tripFeedIcon: "trip-feed",
  tripFeedSelectedIcon: "trip-feed-active",
  bookingIcon: "booking",
  bookingSelectedIcon: "booking-active",
  supportIcon: "support",
  supportIconLight: "support-01",
  rocketIcon: "rocket",
  exceptionIcon: "exception",
  privacyIcon: "key",
  cancellationIcon: "close-circle-o",
  careersIcon: "idcard",
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
  changeIcon: "change",
  checkBoxIcon: "checkbox-unchecked",
  checkBoxCheckedIcon: "checkbox-checked",
  checkMarkCircle: "checkmark1",
  checkIcon: "check",
  syncIcon: "sync",
  callIcon: "call-end",
  callStartIcon: "contact-fill",
  telephoneIcon: "telephone",
  helpIcon: "help",
  compassIcon: "compass",
  peopleIcon: "People",
  trashCanIcon: "trash-can",
  noInternetIcon: "no-internet",
  translateIcon: "translate",
  boldIcon: "bold",
  headingIcon: "heading",
  lineBreakIcon: "line-break",
  underLineIcon: "underline",
  linkIcon: "link",
  listIcon: "list",
  textIcon: "text",

  weatherGraphInactive: require("../assets/images/weatherPlaceholders/weather-graph-disabled.png"),
  weatherCardPlaceholder: require("../assets/images/weatherPlaceholders/weather-placeholder.png"),

  weatherForecastIcon: require("../assets/images/toolIcons/weather-forcast.png"),
  cancelTripIcon: require("../assets/images/toolIcons/cancel-trip.png"),
  commonPhrasesIcon: require("../assets/images/toolIcons/common-phrases.png"),
  completePaymentIcon: require("../assets/images/toolIcons/complete-payment.png"),
  currencyCalculatorIcon: require("../assets/images/toolIcons/currency-calculator.png"),
  forexIcon: require("../assets/images/toolIcons/forex.png"),
  documentVisaIcon: require("../assets/images/toolIcons/document-visa.png"),
  documentIcon: "document",
  downloadIcon: "download",
  openFileIcon: "pdf-view",
  emergencyContactsIcon: require("../assets/images/toolIcons/emergency-contacts.png"),
  faqIcon: require("../assets/images/toolIcons/faq.png"),
  invitePassengersIcon: require("../assets/images/toolIcons/invite-co-passanger-240px.png"),
  medicalCareIcon: require("../assets/images/toolIcons/medical-care.png"),
  packageChecklistIcon: require("../assets/images/toolIcons/packing-checklist-480.png"),
  passportDetailsIcon: require("../assets/images/toolIcons/passport-details.png"),
  yourPickIcon: require("../assets/images/toolIcons/your-picks.png"),

  noBookingsIllus: require("../assets/images/illustrations/no-bookings-image.png"),
  leisureIllus: require("../assets/images/illustrations/leisure-illustration.png"),
  preChatSupportIllus: require("../assets/images/illustrations/pre-chat-support.png"),
  noStoriesIllus: require("../assets/images/illustrations/no-stories-illustration.jpg"),
  onChatNoInternetIllus: require("../assets/images/illustrations/on-chat-no-internet.png"),
  helpSupportIllus: require("../assets/images/illustrations/help-and-support-image.png"),
  paymentCompleteIllus: require("../assets/images/illustrations/payment-complete.png"),
  paymentSuccessIllus: require("../assets/images/illustrations/payment-success.png"),
  paymentFailureIllus: require("../assets/images/illustrations/payment-failure.png"),
  successBoxIllus: require("../assets/images/illustrations/Alert-icons-success.png"),
  errorBoxIllus: require("../assets/images/illustrations/Alert-icons-failure.png"),
  infoBoxIllus: require("../assets/images/illustrations/Alert-icons-info.png"),
  alertBoxIllus: require("../assets/images/illustrations/Alert-icons.png"),
  flightLogoPlaceholderIllus: require("../assets/images/placeholder-images/flight.png"),
  activityThumbPlaceholderIllus: require("../assets/images/placeholder-images/activity.png"),
  hotelThumbPlaceholderIllus: require("../assets/images/placeholder-images/hotel.png"),
  passThumbPlaceholderIllus: require("../assets/images/placeholder-images/pass.png"),
  visaThumbnailIllus: require("../assets/images/placeholder-images/visa.png"),
  insuranceThumbnailIllus: require("../assets/images/placeholder-images/insurance.png"),
  journalComingSoonIllus: require("../assets/images/illustrations/coming-soon/travel-memories-coming-soon.png"),
  customTripIllus: require("../assets/images/illustrations/logo-custom-trip-illus.png"),
  waveLeftIllus: require("../assets/images/illustrations/wave-left.png"),
  waveRightIllus: require("../assets/images/illustrations/wave-right.png"),
  visaWidgetWaveIllus: require("../assets/images/illustrations/visa-widget-wave.png"),
  thumbsUpIllus: require("../assets/images/illustrations/thumbs-up.png"),
  thumbsDownIllus: require("../assets/images/illustrations/thumbs-down.png"),

  /**
   * FAQ Icons
   */
  appRelatedFaqIcon: "app-related",
  cancellationRelatedFaqIcon: "cancellation--rescheduling",
  itineraryRelatedFaqIcon: "itinerary-changes",
  otherFaqIcon: "others",
  paymentRelatedFaqIcon: "payment-related",
  onVactionFaqIcon: "on-vacation",
  preVacationFaqIcon: "pre-vacation",
  visaRelatedFaqIcon: "visa-related",
  voucherRelatedFaqIcon: "voucher-related",

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
  roomsLargePlaceHolder: prefix + "HotelRooms-240x180.png",

  defaultPlaceImage: "https://pyt-images.imgix.net/images/place-holder.png",

  /**
   * Animation files
   */
  journalPublishingLoop: () => require("../assets/animations/publishloop.json"),
  journalPublishEnd: () => require("../assets/animations/publishend.json"),
  journalPublishSuccess: () =>
    require("../assets/animations/publishSuccess.json"),
  splashAnimation: () => require("../assets/animations/splashScreen.json")
};

export const CONSTANT_splashBackground = isIphoneX()
  ? require("../assets/images/backgrounds/splashImage.webp")
  : require("../assets/images/backgrounds/splashImageAndroid.webp");
export const CONSTANT_starterScreenBackground = isIphoneX()
  ? require("../assets/images/backgrounds/starterScreenBackground.jpg")
  : require("../assets/images/backgrounds/starterScreenBackgroundAndroid.jpg");
export const CONSTANT_starterTopImage = require("../assets/images/backgrounds/starter_screen_top.jpg");
export const CONSTANT_starterBottomImage = require("../assets/images/backgrounds/starter_screen_bottom.jpg");
export const CONSTANT_starterBackground = require("../assets/images/backgrounds/starterImage.jpg");
export const CONSTANT_pytLogo = isProduction()
  ? require("../assets/images/icons/logo_new.png")
  : require("../assets/images/icons/logo-dev.png");
export const CONSTANT_forexPartnerLogo = require("../assets/images/icons/forex-partner.png");
export const CONSTANT_pytLogoNew = require("../assets/images/icons/logo_new.png");
export const CONSTANT_pytLogoWhite = require("../assets/images/icons/pickyourtrail-white-logo.png");
export const CONSTANT_pytLogoBlack = require("../assets/images/icons/pickyourtrail-black-logo.png");
export const CONSTANT_pytLogoIcon = () =>
  require("../assets/images/icons/splash-icon.png");
export const CONSTANT_notificationIcon = require("../assets/images/icons/notification.png");
export const CONSTANT_defaultUserIcon = require("../assets/images/icons/default-user.png");
export const CONSTANT_backArrow = require("../assets/images/icons/left-arrow.png");
export const CONSTANT_backIcon = "nav-left";
export const CONSTANT_dropDownArrow = require("../assets/images/icons/drop-down-arrow.png");
export const CONSTANT_dropDownArrowIcon = "arrow";
export const CONSTANT_dropDownArrowDarkIcon = "chevron-down-small";
export const CONSTANT_closeIcon = "close";
export const CONSTANT_userIcon = "account";
export const CONSTANT_loadingIcon = require("../assets/images/loaders/loader.gif");
export const CONSTANT_bookingProcessingIcon = "refresh";
export const CONSTANT_hamburgerIcon = "nav-menu";
export const CONSTANT_preTripHamburger = "hamburger-menu";
export const CONSTANT_homeIcon = "home";
export const CONSTANT_logoutIcon = "logout";
export const CONSTANT_paymentIcon = "payment";
export const CONSTANT_aeroplaneIcon = "flight";
export const CONSTANT_aeroplaneTakeOffIcon = "flight-right";
export const CONSTANT_flightVoucherBanner = require("../assets/images/backgrounds/flightVoucherHeader.jpg");
export const CONSTANT_drawerBackgroundImage = require("../assets/images/backgrounds/side-menu-bg.png");
export const CONSTANT_agentIntroBgPattern = () =>
  require("../assets/images/backgrounds/agent-into-bg-pattern.png");
export const CONSTANT_busIcon = "bus";
export const CONSTANT_ferryIcon = "ferry";
export const CONSTANT_visaIcon = "visa";
export const CONSTANT_insuranceIcon = "insurance";
export const CONSTANT_transferIcon = "transfer";
export const CONSTANT_trainIcon = "train";
export const CONSTANT_passIcon = "pass";
export const CONSTANT_carIcon = "car";
export const CONSTANT_activityIcon = "activity";
export const CONSTANT_leisureIcon = require("../assets/images/icons/leisure.png");
export const CONSTANT_hotelIcon = "hotel";
export const CONSTANT_clockIcon = "clock";
export const CONSTANT_infoIcon = "about";
export const CONSTANT_aboutInfoIcon = "about-info";
export const CONSTANT_storybookIcon = "storybook";
export const CONSTANT_warningIcon = "warning";
export const CONSTANT_thumbsUpIcon = "like";
export const CONSTANT_thumbsDownIcon = "unlike";
export const CONSTANT_locationIcon = "location";
export const CONSTANT_cropIcon = "crop";
export const CONSTANT_containIcon = "minimize";
export const CONSTANT_addIcon = "plus";
export const CONSTANT_addImageIcon = "image-upload";
export const CONSTANT_editIcon = "edit";
export const CONSTANT_gearIcon = "setting";
export const CONSTANT_shareIcon = "share";
export const CONSTANT_facebookIcon = "facebook";
export const CONSTANT_twitterIcon = "twitter";
export const CONSTANT_shareFilledIcon = "share-fill";
export const CONSTANT_facebookFilledIcon = "facebook-fill";
export const CONSTANT_twitterFilledIcon = "twitter-fill";
export const CONSTANT_keyboardDismissIcon = "collapse-keyboard";
export const CONSTANT_eyeIcon = "visibility";
export const CONSTANT_uploadIcon = "typical-social-share";
export const CONSTANT_semiCircleShape = require("../assets/images/shapes/hiring_topic.png");
export const CONSTANT_headerBackgroundShape = require("../assets/images/shapes/banner_white.png");
export const CONSTANT_comingSoonShape = require("../assets/images/shapes/coming-soon.png");
export const CONSTANT_packageTrianglePink = require("../assets/images/shapes/package-shape-pink.png");
export const CONSTANT_packageTriangleBlue = require("../assets/images/shapes/package-shape-blue.png");
export const CONSTANT_packageTriangleGold = require("../assets/images/shapes/package-shape-gold.png");
export const CONSTANT_quotationMarkImage = require("../assets/images/shapes/quotation-mark.png");
export const CONSTANT_positiveBackgroundShape = require("../assets/images/shapes/positive-background.png");
export const CONSTANT_negativeBackgroundShape = require("../assets/images/shapes/negative-background.png");
export const CONSTANT_tripFeedIcon = "trip-feed";
export const CONSTANT_tripFeedSelectedIcon = "trip-feed-active";
export const CONSTANT_bookingIcon = "booking";
export const CONSTANT_bookingSelectedIcon = "booking-active";
export const CONSTANT_supportIcon = "support";
export const CONSTANT_supportIconLight = "support-01";
export const CONSTANT_rocketIcon = "rocket";
export const CONSTANT_exceptionIcon = "exception";
export const CONSTANT_privacyIcon = "key";
export const CONSTANT_cancellationIcon = "close-circle-o";
export const CONSTANT_careersIcon = "idcard";
export const CONSTANT_supportSelectedIcon = "support-active";
export const CONSTANT_toolIcon = "tools";
export const CONSTANT_toolSelectedIcon = "tools-active";
export const CONSTANT_journalIcon = "journal";
export const CONSTANT_journalSelectedIcon = "journal-active";
export const CONSTANT_moreOptionsHorizIcon = "more-options-horiz";
export const CONSTANT_arrowRight = "arrow-right";
export const CONSTANT_arrowDown = "arrow-down";
export const CONSTANT_starActive = "star-active";
export const CONSTANT_searchIcon = "search";
export const CONSTANT_dealsIcon = "deal-nav";
export const CONSTANT_swapVertIcon = "swap_vert";
export const CONSTANT_speakerIcon = "speaker";
export const CONSTANT_speakerAnimatedIcon = require("../assets/images/loaders/voice.gif");
export const CONSTANT_speakerInactiveIcon = require("../assets/images/loaders/voice-inactive.png");
export const CONSTANT_pinIcon = "pin";
export const CONSTANT_changeIcon = "change";
export const CONSTANT_checkBoxIcon = "checkbox-unchecked";
export const CONSTANT_checkBoxCheckedIcon = "checkbox-checked";
export const CONSTANT_checkMarkCircle = "checkmark1";
export const CONSTANT_checkIcon = "check";
export const CONSTANT_syncIcon = "sync";
export const CONSTANT_callIcon = "call-end";
export const CONSTANT_faqFontIcon = "Faq";
export const CONSTANT_detailIcon = "viewdetail";
export const CONSTANT_callStartIcon = "contact-fill";
export const CONSTANT_telephoneIcon = "telephone";
export const CONSTANT_helpIcon = "help";
export const CONSTANT_compassIcon = "compass";
export const CONSTANT_compassMenuIcon = "compass1";
export const CONSTANT_notificationBellIcon = "bell";
export const CONSTANT_peopleIcon = "People";
export const CONSTANT_trashCanIcon = "trash-can";
export const CONSTANT_noInternetIcon = "no-internet";
export const CONSTANT_translateIcon = "translate";
export const CONSTANT_boldIcon = "bold";
export const CONSTANT_headingIcon = "heading";
export const CONSTANT_lineBreakIcon = "line-break";
export const CONSTANT_underLineIcon = "underline";
export const CONSTANT_profileIcon = "Profile";
export const CONSTANT_flagIcon = "flag-outline";
export const CONSTANT_linkIcon = "link";
export const CONSTANT_listIcon = "list";
export const CONSTANT_textIcon = "text";
export const CONSTANT_directionsIcon = "directions";
export const CONSTANT_weatherGraphInactive = require("../assets/images/weatherPlaceholders/weather-graph-disabled.png");
export const CONSTANT_weatherCardPlaceholder = require("../assets/images/weatherPlaceholders/weather-placeholder.png");
export const CONSTANT_weatherForecastIcon = require("../assets/images/toolIcons/weather-forcast.png");
export const CONSTANT_cancelTripIcon = require("../assets/images/toolIcons/cancel-trip.png");
export const CONSTANT_commonPhrasesIcon = require("../assets/images/toolIcons/common-phrases.png");
export const CONSTANT_completePaymentIcon = require("../assets/images/toolIcons/complete-payment.png");
export const CONSTANT_currencyCalculatorIcon = require("../assets/images/toolIcons/currency-calculator.png");
export const CONSTANT_forexIcon = require("../assets/images/toolIcons/forex.png");
export const CONSTANT_documentVisaIcon = require("../assets/images/toolIcons/document-visa.png");
export const CONSTANT_documentIcon = "document";
export const CONSTANT_downloadIcon = "download";
export const CONSTANT_openFileIcon = "pdf-view";
export const CONSTANT_emergencyContactsIcon = require("../assets/images/toolIcons/emergency-contacts.png");
export const CONSTANT_faqIcon = require("../assets/images/toolIcons/faq.png");
export const CONSTANT_invitePassengersIcon = require("../assets/images/toolIcons/invite-co-passanger-240px.png");
export const CONSTANT_medicalCareIcon = require("../assets/images/toolIcons/medical-care.png");
export const CONSTANT_packageChecklistIcon = require("../assets/images/toolIcons/packing-checklist-480.png");
export const CONSTANT_passportDetailsIcon = require("../assets/images/toolIcons/passport-details.png");
export const CONSTANT_yourPickIcon = require("../assets/images/toolIcons/your-picks.png");
export const CONSTANT_noBookingsIllus = require("../assets/images/illustrations/no-bookings-image.png");
export const CONSTANT_leisureIllus = require("../assets/images/illustrations/leisure-illustration.png");
export const CONSTANT_preChatSupportIllus = require("../assets/images/illustrations/pre-chat-support.png");
export const CONSTANT_noStoriesIllus = require("../assets/images/illustrations/no-stories-illustration.jpg");
export const CONSTANT_onChatNoInternetIllus = require("../assets/images/illustrations/on-chat-no-internet.png");
export const CONSTANT_helpSupportIllus = require("../assets/images/illustrations/help-and-support-image.png");
export const CONSTANT_paymentCompleteIllus = require("../assets/images/illustrations/payment-complete.png");
export const CONSTANT_paymentSuccessIllus = require("../assets/images/illustrations/payment-success.png");
export const CONSTANT_paymentFailureIllus = require("../assets/images/illustrations/payment-failure.png");
export const CONSTANT_successBoxIllus = require("../assets/images/illustrations/Alert-icons-success.png");
export const CONSTANT_errorBoxIllus = require("../assets/images/illustrations/Alert-icons-failure.png");
export const CONSTANT_infoBoxIllus = require("../assets/images/illustrations/Alert-icons-info.png");
export const CONSTANT_alertBoxIllus = require("../assets/images/illustrations/Alert-icons.png");
export const CONSTANT_flightLogoPlaceholderIllus = require("../assets/images/placeholder-images/flight.png");
export const CONSTANT_activityThumbPlaceholderIllus = require("../assets/images/placeholder-images/activity.png");
export const CONSTANT_hotelThumbPlaceholderIllus = require("../assets/images/placeholder-images/hotel.png");
export const CONSTANT_passThumbPlaceholderIllus = require("../assets/images/placeholder-images/pass.png");
export const CONSTANT_visaThumbnailIllus = require("../assets/images/placeholder-images/visa.png");
export const CONSTANT_insuranceThumbnailIllus = require("../assets/images/placeholder-images/insurance.png");
export const CONSTANT_journalComingSoonIllus = require("../assets/images/illustrations/coming-soon/travel-memories-coming-soon.png");
export const CONSTANT_customTripIllus = require("../assets/images/illustrations/logo-custom-trip-illus.png");
export const CONSTANT_waveLeftIllus = require("../assets/images/illustrations/wave-left.png");
export const CONSTANT_waveRightIllus = require("../assets/images/illustrations/wave-right.png");
export const CONSTANT_visaWidgetWaveIllus = require("../assets/images/illustrations/visa-widget-wave.png");
export const CONSTANT_thumbsUpIllus = require("../assets/images/illustrations/thumbs-up.png");
export const CONSTANT_thumbsDownIllus = require("../assets/images/illustrations/thumbs-down.png");
export const CONSTANT_appRelatedFaqIcon = "app-related";
export const CONSTANT_cancellationRelatedFaqIcon = "cancellation--rescheduling";
export const CONSTANT_itineraryRelatedFaqIcon = "itinerary-changes";
export const CONSTANT_otherFaqIcon = "others";
export const CONSTANT_paymentRelatedFaqIcon = "payment-related";
export const CONSTANT_onVactionFaqIcon = "on-vacation";
export const CONSTANT_preVacationFaqIcon = "pre-vacation";
export const CONSTANT_visaRelatedFaqIcon = "visa-related";
export const CONSTANT_voucherRelatedFaqIcon = "voucher-related";
export const CONSTANT_getAirlineIcon = airlineCode =>
  airlineCode
    ? `${serverUrls.airlineCdn}${airlineCode.trim()}.png`
    : `${serverUrls.airlineCdn}${"placeholder"}.png`;
export const CONSTANT_airLineLogoPlaceHolder = prefix + "Airline-logo.png";
export const CONSTANT_transferPlaceHolder = "placeholder";
export const CONSTANT_activitySmallPlaceHolder = prefix + "Activity1-50x50.png";
export const CONSTANT_activityMediumPlaceHolder =
  prefix + "Activity1-125x125.png";
export const CONSTANT_activityLargePlaceHolder =
  prefix + "Activity1-640x360.png";
export const CONSTANT_activity2SmallPlaceHolder =
  prefix + "Activity2-50x50.png";
export const CONSTANT_activity2MediumPlaceHolder =
  prefix + "Activity2-125x125.png";
export const CONSTANT_activity2LargePlaceHolder =
  prefix + "Activity2-640x360.png";
export const CONSTANT_activity3SmallPlaceHolder =
  prefix + "Activity3-50x50.png";
export const CONSTANT_activity3MediumPlaceHolder =
  prefix + "Activity3-125x125.png";
export const CONSTANT_activity3LargePlaceHolder =
  prefix + "Activity3-640x360.png";
export const CONSTANT_citySmallPlaceHolder = prefix + "Guides-City-395x360.png";
export const CONSTANT_cityLargePlaceHolder = prefix + "Guides-City-790x720.png";
export const CONSTANT_foodSmallPlaceHolder = prefix + "Guides-Food-120x120.png";
export const CONSTANT_foodLargePlaceHolder = prefix + "Guides-Food-240x240.png";
export const CONSTANT_innerAreasSmallPlaceHolder =
  prefix + "Guides-InnerAreas-230x140.png";
export const CONSTANT_innerAreasLargePlaceHolder =
  prefix + "Guides-InnerAreas-460x280.png";
export const CONSTANT_shoppingSmallPlaceHolder =
  prefix + "Guides-Shopping-150x105.png";
export const CONSTANT_shoppingLargePlaceHolder =
  prefix + "Guides-Shopping-300x210.png";
export const CONSTANT_hotelSmallPlaceHolder = prefix + "Hotel-50x50.png";
export const CONSTANT_hotelMediumPlaceHolder = prefix + "Hotel-125x125.png";
export const CONSTANT_hotelBigPlaceHolder = prefix + "Hotel-200x150.png";
export const CONSTANT_hotelLargePlaceHolder = prefix + "Hotel-640x360.png";
export const CONSTANT_roomsSmallPlaceHolder = prefix + "HotelRooms-120x90.png";
export const CONSTANT_roomsLargePlaceHolder = prefix + "HotelRooms-240x180.png";
export const CONSTANT_travelProfileWelcome = () =>
  require("../assets/images/backgrounds/travelprofileWelcome.png");
export const CONSTANT_defaultPlaceImage =
  "https://pyt-images.imgix.net/images/place-holder.png";
export const CONSTANT_loginBackground = () =>
  require("../assets/images/backgrounds/loginBackground.jpg");
export const CONSTANT_journalPublishingLoop = () =>
  require("../assets/animations/publishloop.json");
export const CONSTANT_journalPublishEnd = () =>
  require("../assets/animations/publishend.json");
export const CONSTANT_journalPublishSuccess = () =>
  require("../assets/animations/publishSuccess.json");
export const CONSTANT_splashAnimation = () =>
  require("../assets/animations/splashScreen.json");
export const CONSTANT_pytAnimatedLoop = () =>
  require("../assets/animations/pyt-loadingloop.json");
export const CONSTANT_pytAnimatedTick = () =>
  require("../assets/animations/pyt-loadingtick.json");
export const CONSTANT_defaultAgentImage = () =>
  require("../assets/images/illustrations/default-agent-image.png");
export const CONSTANT_splashBackgroundVideo = () =>
  require("../assets/videos/splashscreen.mp4");
export const CONSTANT_preLoaderAnimation = () =>
  require("../assets/animations/preLoader.json");
export const CONSTANT_preLoaderAnimation2 = () =>
  require("../assets/animations/preLoader2.json");
export const CONSTANT_preLoaderAnimation3 = () =>
  require("../assets/animations/preLoader3.json");

export const CONSTANT_laidBackIntensityAnimation = () =>
  require("../assets/animations/laidback.json");
export const CONSTANT_moderateIntensityAnimation = () =>
  require("../assets/animations/moderate.json");
export const CONSTANT_packedIntensityAnimation = () =>
  require("../assets/animations/packed.json");

export const CONSTANT_dealHunterAnimation = () =>
  require("../assets/animations/DealHunter.json");
export const CONSTANT_midRangeAnimation = () =>
  require("../assets/animations/Midrange.json");
export const CONSTANT_flexibleAnimation = () =>
  require("../assets/animations/flexible.json");

// TRUST ICONS
export const CONSTANT_trustIconFacebook = () =>
  require("../assets/images/trust-icons/facebook.png");
export const CONSTANT_trustIconGoogle = () =>
  require("../assets/images/trust-icons/google.png");
export const CONSTANT_trustIconIata = () =>
  require("../assets/images/trust-icons/iata.png");

export const CONSTANT_requestCallbackCover = () => ({
  uri: "https://pyt-images.imgix.net/images/web_app/homepage/talk_to_us_v2.jpg"
});

export const CONSTANT_pytHappyInsignia = () =>
  require("../assets/images/illustrations/happy-insignia.png");

export const CONSTANT_ZESTImageUrl = "https://i.imgur.com/M20FIDf.png";

export default imageAssets;
