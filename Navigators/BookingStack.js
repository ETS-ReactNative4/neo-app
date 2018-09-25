import { createStackNavigator } from "react-navigation";
import BookingsHome from "../Screens/BookingsHomeScreen/BookingsHome";
import BookedItinerary from "../Screens/BookedItineraryScreen/BookedItinerary";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";

const BookingStack = createStackNavigator(
  {
    BookingsHome: {
      screen: BookingsHome
    },
    BookedItinerary: {
      screen: BookedItinerary
    }
  },
  {
    initialRouteName: "BookingsHome",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

export default BookingStack;
