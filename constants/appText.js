import { Platform } from "react-native";
import constants from "./constants";

export const CONSTANT_chatOfflineMessage =
  "It’s 10:45PM Indian time. We’re currently offline!";
export const CONSTANT_chatOfflineAction = " in case of emergency";

const appText = {
  starterScreenText: {
    mainButton: "Find your booking",
    exploreButton: "Or, explore itineraries"
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
    webCheckinUnavailableHeader: "Web checkin not yet available",
    webCheckinUnavailableText:
      "Web checkin will be available only 48 hrs prior to the trip.",
    webCheckinInfoText:
      "Web checkin may not be available for flights with airline code share",
    conditionsApplyText: "Cancellation terms & conditions apply",
    hotelTimingConditionText:
      "Check in and check out time are provisionally mentioned and can be changed at the discretion of the hotel",
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

export default appText;
