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

const store = {
  userStore: new User(),
  yourBookingsStore: new YourBookings(),
  appState: new AppState(),
  itineraries: new Itineraries(),
  weatherStore: new Weather(),
  packingChecklistStore: new PackingChecklist(),
  voucherStore: new Voucher()
};

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

hydrate("_upcomingItineraries", store.yourBookingsStore)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_completedItineraries", store.yourBookingsStore)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_itineraries", store.itineraries)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_selectedItinerary", store.itineraries)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_vouchers", store.voucherStore)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_selectedVoucher", store.voucherStore)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_tripMode", store.appState)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_weather", store.weatherStore)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_conversionRates", store.appState)
  .then(() => {})
  .catch(err => {
    logError(err);
  });
hydrate("_allPackingChecklists", store.packingChecklistStore)
  .then(() => {})
  .catch(err => {
    logError(err);
  });

export default store;
