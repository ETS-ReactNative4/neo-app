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
    conditionsApplyText: "*Cancellation terms & conditions apply"
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
    message: "Your personal trip diary is coming soon!"
  },
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
  preTripChatText: chatActivationTime =>
    `Chat will be enabled ${chatActivationTime}hrs prior to your trip. Meanwhile, please visit our support center if you have questions or clarifications.`,
  onChatNoInternetText:
    "We are unable to connect to the live chat currently. Please check for a proper internet connection and try again. Alternatively, you can contact us on the number below.",
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
  leisureText: "Got more time?",
  explorePlacesText: "Explore Places",
  paymentText: {
    failureTitle: "We are sorry!",
    failureMessage:
      "We are unable to process your payment. Please try again or contact our helpdesk for further assistance.",
    contactHelpdesk: "Contact helpdesk",
    successTitle: "Yeh! Payment successful",
    successMessage:
      "We got your payment! Please note the below transaction ID for further references."
  },
  pdfViewerErrorText: "Unable to load pdf!"
};

export default appText;
