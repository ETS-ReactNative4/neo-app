import { create } from "mobx-persist";
import { AsyncStorage } from "react-native";
import User from "./User";
import YourBookings from "./YourBookings";

const store = {
  userStore: new User(),
  yourBookingsStore: new YourBookings()
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

export default store;
