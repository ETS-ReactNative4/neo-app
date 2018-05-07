import { create } from "mobx-persist";
import { AsyncStorage } from "react-native";
import User from "./User";
import YourBookings from "./YourBookings";
import AppState from "./AppState";

const store = {
  userStore: new User(),
  yourBookingsStore: new YourBookings(),
  appState: new AppState()
};

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

hydrate("_upcomingItineraries", store.yourBookingsStore)
  .then(() => {})
  .catch(err => {
    console.error(err);
  });
hydrate("_completedItineraries", store.yourBookingsStore)
  .then(() => {})
  .catch(err => {
    console.error(err);
  });
hydrate("_tripMode", store.appState)
  .then(() => {})
  .catch(err => {
    console.error(err);
  });

export default store;
