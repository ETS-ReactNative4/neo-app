import { create } from "mobx-persist";
import { AsyncStorage } from "react-native";
import User from "./User";
import YourBookings from "./YourBookings";
import AppState from "./AppState";
import Itineraries from "./Itineraries";
import Weather from "./Weather";
import PackingChecklist from "./PackingChecklist";
import Voucher from "./Voucher";
import { logError } from "../Services/errorLogger/errorLogger";
import Phrases from "./Phrases";
import Info from "./Info";
import EmergencyContacts from "./EmergencyContacts";
import PassportDetails from "./PassportDetails";
import Visa from "./Visa";

const createStore = () => {
  const appStore = {
    userStore: new User(),
    yourBookingsStore: new YourBookings(),
    appState: new AppState(),
    itineraries: new Itineraries(),
    weatherStore: new Weather(),
    packingChecklistStore: new PackingChecklist(),
    voucherStore: new Voucher(),
    phrasesStore: new Phrases(),
    infoStore: new Info(),
    emergencyContactsStore: new EmergencyContacts(),
    passportDetailsStore: new PassportDetails(),
    visaStore: new Visa()
  };

  const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
  });

  hydrate("_upcomingItineraries", appStore.yourBookingsStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_completedItineraries", appStore.yourBookingsStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_itineraries", appStore.itineraries)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_selectedItinerary", appStore.itineraries)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_vouchers", appStore.voucherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_selectedVoucher", appStore.voucherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_tripMode", appStore.appState)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_weather", appStore.weatherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_conversionRates", appStore.appState)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_pushTokens", appStore.appState)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_allPackingChecklists", appStore.packingChecklistStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_user", appStore.userStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_phrases", appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_translatedPhrases", appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_translatedPhrase", appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_languages", appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_selectedPhrase", appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_pinnedPhrases", appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_emergencyContacts", appStore.emergencyContactsStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate("_passportDetails", appStore.passportDetailsStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });

  return appStore;
};

const store = createStore();

export default store;
