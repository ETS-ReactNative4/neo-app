import {create} from 'mobx-persist';
// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';
import YourBookings from './YourBookings';
import AppState from './AppState';
import Itineraries from './Itineraries';
import Weather from './Weather';
import PackingChecklist from './PackingChecklist';
import Voucher from './Voucher';
import {logError} from '../Services/errorLogger/errorLogger';
import Phrases from './Phrases';
import Info from './Info';
import EmergencyContacts from './EmergencyContacts';
import PassportDetails from './PassportDetails';
import Visa from './Visa';
import Places from './Places';
import SupportStore from './SupportStore';
import TripFeed from './TripFeed';
import Packages from './Packages';
import Forex from './Forex';
import DeviceDetails from './DeviceDetails';
import FeedbackPrompt from './FeedbackPrompt';
import ChatDetails from './ChatDetails';
import Journal from './Journal';
import UserFlowTransition from './UserFlowTransition';
import SOFeedback from './SOFeedback';
import TravelProfile from './TravelProfile';
import WelcomeState from './WelcomeState';
import LeadSource from './LeadSource';
import DeviceLocale from './DeviceLocale';
import OTAHotel from './OTAHotel';
import Cities from './Cities';
import LoyaltyCoins from './LoyaltyCoins';

export const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

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
    visaStore: new Visa(),
    placesStore: new Places(),
    supportStore: new SupportStore(),
    tripFeedStore: new TripFeed(),
    packagesStore: new Packages(),
    forexStore: new Forex(),
    deviceDetailsStore: new DeviceDetails(),
    feedbackPrompt: new FeedbackPrompt(),
    chatDetailsStore: new ChatDetails(),
    journalStore: new Journal(),
    userFlowTransitionStore: new UserFlowTransition(),
    soFeedbackStore: new SOFeedback(),
    travelProfileStore: new TravelProfile(),
    welcomeStateStore: new WelcomeState(),
    leadSourceStore: new LeadSource(),
    deviceLocaleStore: new DeviceLocale(),
    otaHotelStore: new OTAHotel(),
    citiesStore: new Cities(),
    loyaltyCoinsStore: new LoyaltyCoins(),
  };

  YourBookings.hydrator(appStore.yourBookingsStore);
  Itineraries.hydrator(appStore.itineraries);
  AppState.hydrator(appStore.appState);
  hydrate('_vouchers', appStore.voucherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_selectedVoucher', appStore.voucherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_weather', appStore.weatherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_lastUpdated', appStore.weatherStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_allPackingChecklists', appStore.packingChecklistStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_user', appStore.userStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_phrases', appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_translatedPhrases', appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_translatedPhrase', appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_languages', appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_selectedPhrase', appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_pinnedPhrases', appStore.phrasesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_emergencyContacts', appStore.emergencyContactsStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_passportDetails', appStore.passportDetailsStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_cityCategories', appStore.placesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  // hydrate("_textSearches", appStore.placesStore)
  //   .then(() => {})
  //   .catch(err => {
  //     logError(err);
  //   });
  // hydrate("_placesList", appStore.placesStore)
  //   .then(() => {})
  //   .catch(err => {
  //     logError(err);
  //   });
  hydrate('_widgets', appStore.tripFeedStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_packages', appStore.packagesStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  hydrate('_hotelList', appStore.otaHotelStore)
    .then(() => {})
    .catch(err => {
      logError(err);
    });
  Visa.hydrator(appStore.visaStore);
  SupportStore.hydrator(appStore.supportStore);
  Forex.hydrator(appStore.forexStore);
  DeviceDetails.hydrator(appStore.deviceDetailsStore);
  FeedbackPrompt.hydrator(appStore.feedbackPrompt);
  ChatDetails.hydrator(appStore.chatDetailsStore);
  Journal.hydrator(appStore.journalStore);
  UserFlowTransition.hydrator(appStore.userFlowTransitionStore);
  SOFeedback.hydrator(appStore.soFeedbackStore);
  TravelProfile.hydrator(appStore.travelProfileStore);
  WelcomeState.hydrator(appStore.welcomeStateStore);
  DeviceLocale.hydrator(appStore.deviceLocaleStore);
  // OTAHotel.hydrator(appStore.otaHotelStore);
  return appStore;
};

const store = createStore();

export default store;
