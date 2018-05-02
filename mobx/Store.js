import User from "./User";
import YourBookings from "./YourBookings";

const store = {
  userStore: new User(),
  yourBookingsStore: new YourBookings()
};

export default store;
