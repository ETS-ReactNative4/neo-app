import User from "../../mobx/User";
import YourBookings from "../../mobx/YourBookings";
import AppState from "../../mobx/AppState";
import Itineraries from "../../mobx/Itineraries";
import Weather from "../../mobx/Weather";
import PackingChecklist from "../../mobx/PackingChecklist";
import Voucher from "../../mobx/Voucher";
import Phrases from "../../mobx/Phrases";
import Info from "../../mobx/Info";
import EmergencyContacts from "../../mobx/EmergencyContacts";
import PassportDetails from "../../mobx/PassportDetails";
import Visa from "../../mobx/Visa";
import Places from "../../mobx/Places";
import SupportStore from "../../mobx/SupportStore";
import TripFeed from "../../mobx/TripFeed";
import Packages from "../../mobx/Packages";
import Forex from "../../mobx/Forex";
import DeviceDetails from "../../mobx/DeviceDetails";
import FeedbackPrompt from "../../mobx/FeedbackPrompt";
import ChatDetails from "../../mobx/ChatDetails";
import Journal from "../../mobx/Journal";

export interface IStoreService {
  userStore?: User;
  yourBookingsStore?: YourBookings;
  appState?: AppState;
  itineraries?: Itineraries;
  weatherStore?: Weather;
  packingChecklistStore?: PackingChecklist;
  voucherStore?: Voucher;
  phrasesStore?: Phrases;
  infoStore?: Info;
  emergencyContactsStore?: EmergencyContacts;
  passportDetailsStore?: PassportDetails;
  visaStore?: Visa;
  placesStore?: Places;
  supportStore?: SupportStore;
  tripFeedStore?: TripFeed;
  packagesStore?: Packages;
  forexStore?: Forex;
  deviceDetailsStore?: DeviceDetails;
  feedbackPrompt?: FeedbackPrompt;
  chatDetailsStore?: ChatDetails;
  journalStore?: Journal;
}

const storeService: IStoreService = {};

export const updateStoreService = (store: IStoreService): void => {
  for (const key in store) {
    if (store.hasOwnProperty(key)) {
      // @ts-ignore
      storeService[key] = store[key];
    }
  }
};

export default storeService;
