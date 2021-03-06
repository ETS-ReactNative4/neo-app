import { Platform } from "react-native";
import constants from "./constants";

export const CONSTANT_chatOfflineMessage =
  "It’s :time Indian time. We’re currently offline!";
export const CONSTANT_chatOfflineAction = " in case of an emergency";

export const CONSTANT_visaSuccessTitleFn = (name, isSingleVisa) =>
  `Woohoo ${name}! Your ${
    isSingleVisa ? "Visa has" : "Visas have"
  } been granted!\n#vacaymodeon`;

const appText = {
  starterScreenText: {
    mainButton: "Or, find your booking",
    exploreButton: "Explore itineraries"
  },
  aboutUsText: {
    title: "About Us",
    content:
      "All material herein is the copyright of Travel Troops Global Pvt ltd. All Rights Reserved.",
    versionText: "App version v."
  },
  currencyConverterText: {
    conversionRateError: {
      title: "Oh no!",
      message: "Unable to fetch the latest conversion rates...",
      actionText: "Go Back"
    },
    currencyDetailsError: {
      title: "Oops!",
      message: "We are currently unable to fetch the currency details...",
      actionText: "Go Back"
    }
  },
  voucherText: {
    freeTransferInfo:
      "This is a self exploration activity. You will need to manage your transport to and from this location. Reach the meeting point 30 minutes prior to avoid last minute hassle.",
    openTrainTicketInfo:
      "You have an open train ticket as part of your journey. Kindly arrive at the station 30 minutes prior to departure to reserve seats for a small fee.",
    directionsDisclaimerText:
      "The exact meeting point can be a few meters away from the actual location. If you need more assistance, reach out to the number given or leave a message in the support group.",
    hotelAmenitiesDisclaimer:
      "Hotel amenities are subject to availability and providing it is at the discretion of the hotel",
    sharedTransferInfo:
      "As the transfer is on shared basis, the arrival time of transfer could vary plus or minus 15 - 30 minutes depending on traffic.",
    freeBreakfastInfoText:
      "Please note that you’ve already prebooked and paid for breakfast. Kindly reach out to our support team for further assistance",
    securityDepositText:
      "Kindly note that a security deposit might be collected at the reception during check-in and refunded back during your check-out.",
    rentalCarMinBalanceText:
      "Please note that the lead driver must have a minimum credit card balance of Rs 1.5 lakhs in INR.",
    webCheckinUnavailableHeader: "Web checkin not yet available",
    webCheckinUnavailableText:
      "Web checkin will be available only 48 hrs prior to the trip.",
    webCheckinInfoText:
      "Web checkin may not be available for flights with airline code share",
    conditionsApplyText: "Cancellation terms & conditions apply",
    hotelTimingConditionText:
      "Check in and check out time are provisionally mentioned and can be changed at the discretion of the hotel. For early check-in, confirmation is based on the room availability.",
    voucherUnavailable: "Voucher currently unavailable"
  },
  downloadVoucherText: {
    error: {
      title: "Unable to Download!",
      message: "Internal Server Error!",
      actionText: "Okay"
    },
    almostThere: {
      title: "Almost There!",
      message:
        "You will be able to download vouchers once all your pending bookings will be completed."
    }
  },
  mobileNumberScreenText: {
    unregisteredNumberText:
      "We could not find an account linked to this mobile number. New here?"
  },
  weatherText: {
    unableToGetWeatherText: "Unable to retrieve latest weather information..."
  },
  logOutText: {
    logOutError: {
      title: "Unable to log out!",
      message:
        "Please check your internet connection or try again after some time...",
      actionText: "Okay!"
    }
  },
  insuranceComingSoonText: {
    title: "Work in Progress...",
    message:
      "We are working hard to bring your insurance details to mobile app. Keep a lookout on this section for future updates!",
    actionText: "Okay!"
  },
  journalComingSoonText: {
    title: "Sit Tight",
    message: "Become a travel blogger on the go!"
  },
  journalText: {
    noStoriesTitle: "Post your first story",
    noStoriesMessage:
      "Add inspiring photo-stories from your travels and share them with your friends."
  },
  journalShareMessages: {
    twitterMessage: title =>
      `Check out my journal - "${title ||
        ""}" @pickyourtrail #travelstories #pickyourtrail #unwraptheworld`,
    commonMessage: title => `Check out my journal - "${title || ""}"`
  },
  journalFailureMessages: {
    title: "Oops! Something went wrong :(",
    failedToStartJournal:
      "Unable to create your journal. Please check your internet connection and try again after some time.",
    failedToSubmitJournalTitle:
      "Unable to create journal. Please check your internet connection and try again after some time.",
    failedToSubmitJournalStory:
      "We’re unable to publish your post right now. Please check your internet connection and try again after some time",
    failedToCreateNewStory:
      "Unable to create a new story. Please check your internet connection and try again after some time.",
    failedToPublishJournal:
      "Unable to publish this story. Please check your internet connection and try again after some time.",
    failedToDeleteImage:
      "Unable to delete the image. Please check your internet connection and try again after some time.",
    failedToDeleteStory:
      "Unable to delete the story. Please check your internet connection and try again after some time.",
    userDeniedImagePermission: () =>
      `To select and upload your images, please grant access to your ${
        Platform.OS === constants.platformIos ? "photos" : "storage"
      }.`
  },
  journalBackConfirmation: {
    imagePicker: {
      title: "Sure you want to go back?",
      message:
        "You’ll lose your selection if you choose to go back. Would you still like to proceed?",
      positive: "Stay here",
      negative: "Proceed anyway"
    },
    textEditor: {
      title: "Sure you want to go back?",
      message:
        "We haven’t saved your thoughts yet and we’d hate to have to delete them. Still want to go back?",
      positive: "Stay here",
      negative: "Proceed anyway"
    },
    journalTitleCreation: {
      title: "Sure you want to go back?",
      message:
        "We won’t be able to save your data if you choose to go back. Are you sure you want to proceed?",
      positive: "Stay here",
      negative: "Proceed anyway"
    },
    journalEditingTitle: {
      title: "Sure you want to go back?",
      message:
        "We won’t be able to save your data if you choose to go back. Are you sure you want to proceed?",
      positive: "Stay here",
      negative: "Proceed anyway"
    }
  },
  journalAlertMessages: {
    removeImage: {
      header: "Delete this image?",
      message:
        "Are you sure you want to delete this beautiful photograph? We won’t be able to undo this action.",
      confirm: "Confirm Deletion",
      cancel: "Keep"
    },
    logout: {
      header: "Your images are being uploaded.",
      message:
        "You cannot logout during an active image upload. Please wait till all the images are uploaded."
    },
    noTitleForStory: {
      header: "Please add a story title",
      message: "You cannot create a story without title"
    },
    oneStoryMissingTitle: {
      header: "One of your stories is missing a title",
      message: "Make sure you have added title to all your stories"
    },
    removeStory: {
      header: "Delete this journal entry?",
      message:
        "Are you sure you want to delete this entry? It’s a great memory :( We won’t be able to undo this action.",
      confirm: "Confirm Deletion",
      cancel: "Keep"
    }
  },
  bookingFailedText: "No Voucher available",
  bookingProcessText: {
    title: "Almost there!",
    message: "Your booking is in progress.",
    // "We are working with our travel partners to complete this booking. Sit back and relax, we'll notify you, once the vouchers are ready!",
    actionText: "Okay!"
  },
  feedBackCollectionToastText: {
    message: "Please input your feedback"
  },
  appCrashText: {
    reload:
      "We feel awful :(\n\nPlease close the app and try launching it again?\n\n",
    goBack: "Yikes, our bad\n\nGo back and reload this page again please\n\n"
  },
  phrasesTranslationFailedText: "Unable to translate...",
  noInernetText: "No internet connection. Some features may not work.",
  preTripChatText: `Chat will be activated three days before your departure. Meanwhile, please visit our help desk if you have questions or clarifications.`,
  onChatNoInternetText:
    "We are unable to connect to the live chat currently. Please check for a proper internet connection and try again. Alternatively, you can contact us on the number below.",
  chatAlternativeText: "Alternatively, you can also ",
  chatAlternativeLink: "restart the app",
  onChatFailedToInitialize:
    "We are unable to initialize live chat for your trip. Please contact support if problem persists.",
  noBookingsTitle: "No active bookings",
  noBookingsText: "Lets unwrap the world.",
  exploreItinerariesText: "Plan a trip",
  homeText: {
    customTripTitle: "Want to create a custom trip?",
    customTripBody:
      "Plan and book your own vacations on the Pickyourtrail Web App.",
    openProductText: "Take me there",
    findBookingText: "Find my booking"
  },
  forexText: {
    howMuchToCarryText: "How much Forex should I carry?",
    forexSubmittedText:
      "We have passed on your request to our Forex Partner - Thomas Cook. A representative will get in touch with you soon.",
    requestIdInfoText: "Your Request ID:",
    providerTitle: "Bang for your Buck!",
    requestExistsText: "A request already exits with the given mobile number",
    unableToSubmitRequest: "Unable to process your request",
    providerInfo: "In partnership with Thomas Cook",
    failedToFetchCurrency: "Unable to retrieve currency details"
  },
  visaScreenText: {
    visaDetailsUnavilable: "Visa details are unavailable for this country",
    failedToLoadVisaData: "Unable to fetch visa details",
    failedToLoadLatestData: "Unable to fetch latest visa details",
    failedToLoadChecklistData: "Unable to fetch latest checklist data",
    failedToUpdateData: "Unable to communicate with the server",
    visaRejected:
      "It’s unfortunate that your visa got rejected. But we have got your back.",
    visaTimeDisclaimerText: "The dates might change based on processing time"
  },
  leisureText: "Got more time?",
  explorePlacesText: "Explore Places",
  helpDeskText: {
    faqNotFoundText: "Couldn’t find what you are looking for?",
    queryOpenText: "This query is open now",
    queryClosedText: "You can reopen this anytime"
  },
  paymentText: {
    failureTitle: "We are sorry!",
    paymentUpdateConditions:
      "Please note that your payment will take atleast 48 hours to get updated in our system",
    failureMessage:
      "We are unable to process your payment. Please try again or contact our helpdesk for further assistance.",
    contactHelpdesk: "Contact helpdesk",
    successTitle: "Yeh! Payment successful",
    successMessage:
      "We got your payment! Please note the below transaction ID for further references.",
    noPaymentsText: "No Payments available",
    paymentSummaryText: name =>
      `Hi ${name}, here’s your payment summary. Your consolidated trip invoice will be generated within 7 days of your return`,
    gstInvoiceText: name => `Hi ${name}, here’s your payment summary.`,
    gstInvoiceDownloadText: `Download Consolidated GST Invoice`,
    noOfInstallmentsText: numberOfInstallments =>
      `You have ${numberOfInstallments} scheduled payment${
        numberOfInstallments > 1 ? "s" : ""
      }`
  },
  pdfViewerErrorText: "Unable to load pdf!",
  serverErrorText: "Unable to connect to the server",
  feedbackFooterText: {
    submitSuccessful: "Thanks for your feedback!",
    submitFailed: "Unable to record feedback."
  },
  feedbackPromptText: {
    returnConfirmationTitle: "Thanks for your feedback!",
    returnConfirmationPostiveInfo: "We're glad you had a good time",
    requestFeedback: "Please add your feedback before submitting",
    returnConfirmationNegativeInfo:
      "We're sorry your experience wasn't up to the mark",
    returnCta: "Okay, got it",
    cancelReturnCta: "Continue editing",
    defaultPositiveFeedbackDesc: "Pick your favourite moments of the day",
    defaultNegativeFeedbackDesc: "Where did it go wrong?"
  },
  permissionsInfoText: {
    readFile:
      "This permission is needed to add images from your device to the journal",
    writeFile:
      "This permission is needed to crop images before you add them to your journal"
  },
  serverResponseErrorText: "Something went wrong with the server"
};

export const CONSTANT_starterScreenText = {
  mainButton: "Find your bookings",
  exploreButton: "Plan a holiday"
};
export const CONSTANT_aboutUsText = {
  title: "About Us",
  content:
    "All material herein is the copyright of Travel Troops Global Pvt ltd. All Rights Reserved.",
  versionText: "App version v."
};
export const CONSTANT_currencyConverterText = {
  conversionRateError: {
    title: "Oh no!",
    message: "Unable to fetch the latest conversion rates...",
    actionText: "Go Back"
  },
  currencyDetailsError: {
    title: "Oops!",
    message: "We are currently unable to fetch the currency details...",
    actionText: "Go Back"
  }
};
export const CONSTANT_voucherText = {
  freeTransferInfo:
    "This is a self exploration activity. You will need to manage your transport to and from this location. Reach the meeting point 30 minutes prior to avoid last minute hassle.",
  openTrainTicketInfo:
    "You have an open train ticket as part of your journey. Kindly arrive at the station 30 minutes prior to departure to reserve seats for a small fee.",
  directionsDisclaimerText:
    "The exact meeting point can be a few meters away from the actual location. If you need more assistance, reach out to the number given or leave a message in the support group.",
  hotelAmenitiesDisclaimer:
    "Hotel amenities are subject to availability and providing it is at the discretion of the hotel",
  sharedTransferInfo:
    "As the transfer is on shared basis, the arrival time of transfer could vary plus or minus 15 - 30 minutes depending on traffic.",
  freeBreakfastInfoText:
    "Please note that you’ve already prebooked and paid for breakfast. Kindly reach out to our support team for further assistance",
  securityDepositText:
    "Kindly note that a security deposit might be collected at the reception during check-in and refunded back during your check-out.",
  rentalCarMinBalanceText:
    "Please note that the lead driver must have a minimum credit card balance of Rs 1.5 lakhs in INR.",
  webCheckinUnavailableHeader: "Web checkin not yet available",
  webCheckinUnavailableText:
    "Web checkin will be available only 48 hrs prior to the trip.",
  webCheckinInfoText:
    "Web checkin may not be available for flights with airline code share",
  conditionsApplyText: "Cancellation terms & conditions apply",
  hotelTimingConditionText:
    "Check in and check out time are provisionally mentioned and can be changed at the discretion of the hotel. For early check-in, confirmation is based on the room availability.",
  voucherUnavailable: "Voucher currently unavailable"
};
export const CONSTANT_downloadVoucherText = {
  error: {
    title: "Unable to Download!",
    message: "Internal Server Error!",
    actionText: "Okay"
  },
  almostThere: {
    title: "Almost There!",
    message:
      "You will be able to download vouchers once all your pending bookings will be completed."
  }
};
export const CONSTANT_mobileNumberScreenText = {
  unregisteredNumberText:
    "We could not find an account linked to this mobile number. New here?"
};
export const CONSTANT_weatherText = {
  unableToGetWeatherText: "Unable to retrieve latest weather information..."
};
export const CONSTANT_logOutText = {
  logOutError: {
    title: "Unable to log out!",
    message:
      "Please check your internet connection or try again after some time...",
    actionText: "Okay!"
  }
};
export const CONSTANT_insuranceComingSoonText = {
  title: "Work in Progress...",
  message:
    "We are working hard to bring your insurance details to mobile app. Keep a lookout on this section for future updates!",
  actionText: "Okay!"
};
export const CONSTANT_journalComingSoonText = {
  title: "Sit Tight",
  message: "Become a travel blogger on the go!"
};
export const CONSTANT_journalText = {
  noStoriesTitle: "Post your first story",
  noStoriesMessage:
    "Add inspiring photo-stories from your travels and share them with your friends."
};
export const CONSTANT_journalShareMessages = {
  twitterMessage: title =>
    `Check out my journal - "${title ||
      ""}" @pickyourtrail #travelstories #pickyourtrail #unwraptheworld`,
  commonMessage: title => `Check out my journal - "${title || ""}"`
};
export const CONSTANT_journalFailureMessages = {
  title: "Oops! Something went wrong :(",
  failedToStartJournal:
    "Unable to create your journal. Please check your internet connection and try again after some time.",
  failedToSubmitJournalTitle:
    "Unable to create journal. Please check your internet connection and try again after some time.",
  failedToSubmitJournalStory:
    "We’re unable to publish your post right now. Please check your internet connection and try again after some time",
  failedToCreateNewStory:
    "Unable to create a new story. Please check your internet connection and try again after some time.",
  failedToPublishJournal:
    "Unable to publish this story. Please check your internet connection and try again after some time.",
  failedToDeleteImage:
    "Unable to delete the image. Please check your internet connection and try again after some time.",
  failedToDeleteStory:
    "Unable to delete the story. Please check your internet connection and try again after some time.",
  userDeniedImagePermission: () =>
    `To select and upload your images, please grant access to your ${
      Platform.OS === constants.platformIos ? "photos" : "storage"
    }.`
};
export const CONSTANT_journalBackConfirmation = {
  imagePicker: {
    title: "Sure you want to go back?",
    message:
      "You’ll lose your selection if you choose to go back. Would you still like to proceed?",
    positive: "Stay here",
    negative: "Proceed anyway"
  },
  textEditor: {
    title: "Sure you want to go back?",
    message:
      "We haven’t saved your thoughts yet and we’d hate to have to delete them. Still want to go back?",
    positive: "Stay here",
    negative: "Proceed anyway"
  },
  journalTitleCreation: {
    title: "Sure you want to go back?",
    message:
      "We won’t be able to save your data if you choose to go back. Are you sure you want to proceed?",
    positive: "Stay here",
    negative: "Proceed anyway"
  },
  journalEditingTitle: {
    title: "Sure you want to go back?",
    message:
      "We won’t be able to save your data if you choose to go back. Are you sure you want to proceed?",
    positive: "Stay here",
    negative: "Proceed anyway"
  }
};
export const CONSTANT_journalAlertMessages = {
  removeImage: {
    header: "Delete this image?",
    message:
      "Are you sure you want to delete this beautiful photograph? We won’t be able to undo this action.",
    confirm: "Confirm Deletion",
    cancel: "Keep"
  },
  logout: {
    header: "Your images are being uploaded.",
    message:
      "You cannot logout during an active image upload. Please wait till all the images are uploaded."
  },
  noTitleForStory: {
    header: "Please add a story title",
    message: "You cannot create a story without title"
  },
  oneStoryMissingTitle: {
    header: "One of your stories is missing a title",
    message: "Make sure you have added title to all your stories"
  },
  removeStory: {
    header: "Delete this journal entry?",
    message:
      "Are you sure you want to delete this entry? It’s a great memory :( We won’t be able to undo this action.",
    confirm: "Confirm Deletion",
    cancel: "Keep"
  }
};
export const CONSTANT_bookingFailedText = "No Voucher available";
export const CONSTANT_bookingProcessText = {
  title: "Almost there!",
  message: "Your booking is in progress.",
  // "We are working with our travel partners to complete this booking. Sit back and relax, we'll notify you, once the vouchers are ready!",
  actionText: "Okay!"
};
export const CONSTANT_feedBackCollectionToastText = {
  message: "Please input your feedback"
};
export const CONSTANT_appCrashText = {
  reload:
    "We feel awful :(\n\nPlease close the app and try launching it again?\n\n",
  goBack: "Yikes, our bad\n\nGo back and reload this page again please\n\n"
};
export const CONSTANT_phrasesTranslationFailedText = "Unable to translate...";
export const CONSTANT_noInernetText =
  "No internet connection. Some features may not work.";
export const CONSTANT_preTripChatText = `Chat will be activated three days before your departure. Meanwhile, please visit our help desk if you have questions or clarifications.`;
export const CONSTANT_onChatNoInternetText =
  "We are unable to connect to the live chat currently. Please check for a proper internet connection and try again. Alternatively, you can contact us on the number below.";
export const CONSTANT_chatAlternativeText = "Alternatively, you can also ";
export const CONSTANT_chatAlternativeLink = "restart the app";
export const CONSTANT_onChatFailedToInitialize =
  "We are unable to initialize live chat for your trip. Please contact support if problem persists.";
export const CONSTANT_noBookingsTitle = "No active bookings";
export const CONSTANT_noBookingsText = "Lets unwrap the world.";
export const CONSTANT_exploreItinerariesText = "Plan a trip";
export const CONSTANT_homeText = {
  customTripTitle: "Want to create a custom trip?",
  customTripBody:
    "Plan and book your own vacations on the Pickyourtrail Web App.",
  openProductText: "Take me there",
  findBookingText: "Find my booking"
};
export const CONSTANT_forexText = {
  howMuchToCarryText: "How much Forex should I carry?",
  forexSubmittedText:
    "We have passed on your request to our Forex Partner - Thomas Cook. A representative will get in touch with you soon.",
  requestIdInfoText: "Your Request ID:",
  providerTitle: "Bang for your Buck!",
  requestExistsText: "A request already exits with the given mobile number",
  unableToSubmitRequest: "Unable to process your request",
  providerInfo: "In partnership with Thomas Cook",
  failedToFetchCurrency: "Unable to retrieve currency details"
};
export const CONSTANT_visaScreenText = {
  visaDetailsUnavilable: "Visa details are unavailable for this country",
  failedToLoadVisaData: "Unable to fetch visa details",
  failedToLoadLatestData: "Unable to fetch latest visa details",
  failedToLoadChecklistData: "Unable to fetch latest checklist data",
  failedToUpdateData: "Unable to communicate with the server",
  visaRejected:
    "It’s unfortunate that your visa got rejected. But we have got your back.",
  visaTimeDisclaimerText: "The dates might change based on processing time"
};
export const CONSTANT_leisureText = "Got more time?";
export const CONSTANT_explorePlacesText = "Explore Places";
export const CONSTANT_helpDeskText = {
  faqNotFoundText: "Couldn’t find what you are looking for?",
  queryOpenText: "This query is open now",
  queryClosedText: "You can reopen this anytime"
};
export const CONSTANT_paymentText = {
  failureTitle: "We are sorry!",
  paymentUpdateConditions:
    "Please note that your payment will take atleast 48 hours to get updated in our system",
  failureMessage:
    "We are unable to process your payment. Please try again or contact our helpdesk for further assistance.",
  contactHelpdesk: "Contact helpdesk",
  successTitle: "Yeh! Payment successful",
  successMessage:
    "We got your payment! Please note the below transaction ID for further references.",
  noPaymentsText: "No Payments available",
  paymentSummaryText: name =>
    `Hi ${name}, here’s your payment summary. Your consolidated trip invoice will be generated within 7 days of your return`,
  gstInvoiceText: name => `Hi ${name}, here’s your payment summary.`,
  gstInvoiceDownloadText: `Download Consolidated GST Invoice`,
  noOfInstallmentsText: numberOfInstallments =>
    `You have ${numberOfInstallments} scheduled payment${
      numberOfInstallments > 1 ? "s" : ""
    }`
};
export const CONSTANT_pdfViewerErrorText = "Unable to load pdf!";
export const CONSTANT_serverErrorText = "Unable to connect to the server";
export const CONSTANT_feedbackFooterText = {
  submitSuccessful: "Thanks for your feedback!",
  submitFailed: "Unable to record feedback."
};
export const CONSTANT_feedbackPromptText = {
  returnConfirmationTitle: "Thanks for your feedback!",
  returnConfirmationPostiveInfo: "We're glad you had a good time",
  requestFeedback: "Please add your feedback before submitting",
  returnConfirmationNegativeInfo:
    "We're sorry your experience wasn't up to the mark",
  returnCta: "Okay, got it",
  cancelReturnCta: "Continue editing",
  defaultPositiveFeedbackDesc: "Pick your favourite moments of the day",
  defaultNegativeFeedbackDesc: "Where did it go wrong?"
};
export const CONSTANT_permissionsInfoText = {
  readFile:
    "This permission is needed to add images from your device to the journal",
  writeFile:
    "This permission is needed to crop images before you add them to your journal"
};
export const CONSTANT_serverResponseErrorText =
  "Something went wrong with the server";

export const CONSTANT_postBookingLoadFailureText = {
  header: "Something went wrong",
  message:
    "Unable to load data from the server. Please check your internet connection or try again later",
  invalidRoute: "The action could not be completed"
};

export const CONSTANT_openSOFeedbackLoadFailureText = {
  header: "Something went wrong",
  message:
    "Unable to load data from the server. Please check your internet connection or try again later"
};

export const CONSTANT_openOPSIntroLoadFailureText = {
  header: "Something went wrong",
  message:
    "Unable to load data from the server. Please check your internet connection or try again later"
};

export const CONSTANT_travelProfileFailureText = {
  header: "Something went wrong",
  message:
    "Unable to load data from the server. Please check your internet connection or try again later"
};

export const CONSTANT_fileDownload = 'Failed to download'
export const CONSTANT_referralText = (referralCode) => `Hello:) Enjoy a flat 500 off on your vacation and staycation deals booking with Pickyourtrail with my referral code - ${referralCode}. Download the app here at https://app.pickyourtrail.com`;

export default appText;
