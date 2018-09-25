import { createStackNavigator } from "react-navigation";
import BookingsHome from "../Screens/BookingsHomeScreen/BookingsHome";
import BookedItinerary from "../Screens/BookedItineraryScreen/BookedItinerary";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import HomeFlip from "../Screens/HomeFlipScreen/HomeFlip";

const BookingStack = createStackNavigator(
  {
    HomeFlip: {
      screen: HomeFlip
    },
    BookingsHome: {
      screen: BookingsHome
    },
    BookedItinerary: {
      screen: BookedItinerary
    }
  },
  {
    initialRouteName: "HomeFlip",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

export default BookingStack;
