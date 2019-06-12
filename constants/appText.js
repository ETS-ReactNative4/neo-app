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
      message: "We are currently unable to fetch the conversion rates...",
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
    sharedTransferInfo:
      "As the transfer is on shared basis, the arrival time of transfer could vary plus or minus 15 - 30 minutes depending on traffic.",
    webCheckinUnavailableHeader: "Web checkin not yet available",
    webCheckinUnavailableText:
      "Web checkin will be available only 48 hrs prior to the trip.",
    webCheckinInfoText:
      "Web checkin may not be available for flights with airline code share",
    conditionsApplyText: "Cancellation terms & conditions apply",
    hotelTimingConditionText:
      "Check in and check out time are provisionally mentioned and can be changed at the discretion of the hotel"
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
    providerInfo: "In partnership with Thomas Cook"
  },
  visaScreenText: {
    visaDetailsUnavilable: "Visa details are unavailable for this country"
  },
  leisureText: "Got more time?",
  explorePlacesText: "Explore Places",
  paymentText: {
    failureTitle: "We are sorry!",
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
    submitSuccessful: "Thanks for the feedback!",
    submitFailed: "Unable to record feedback."
  },
  feedbackPromptText: {
    returnConfirmationTitle: "Thanks for the feedback",
    returnConfirmationPostiveInfo: "We're glad you had a good time",
    returnConfirmationNegativeInfo:
      "We're sorry your experience wasn't up to the mark",
    returnCta: "Okay, got it",
    cancelReturnCta: "Continue editing"
  },
  serverResponseErrorText: "Something went wrong with the server"
};

export default appText;
