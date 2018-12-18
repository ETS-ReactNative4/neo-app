import constants from "./constants";

const appText = {
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
      "Looks like you haven't created an account with Pickyourtrail yet!"
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
    message:
      "We are working with our travel partners to complete this booking. Sit back and relax, we'll notify you, once the vouchers are ready!",
    actionText: "Okay!"
  },
  appCrashText: {
    reload:
      "We feel aweful :(\n\nPlease close the app and try launching it again?\n\n",
    goBack: "Yikes, our bad\n\nGo back and reload this page again please\n\n"
  },
  phrasesTranslationFailedText: "Unable to translate..."
};

export default appText;
