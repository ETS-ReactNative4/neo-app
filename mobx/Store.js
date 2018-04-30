import User from "./User/User";
import UpcomingItineraries from "./Trip/UpcomingItineraries";

const store = {
  userStore: new User(),
  upcomingItinerariesStore: new UpcomingItineraries()
};

export default store;
