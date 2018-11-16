import { createStackNavigator } from "react-navigation";
import BookingsHome from "../Screens/BookingsHomeScreen/BookingsHome";
import BookedItinerary from "../Screens/BookedItineraryScreen/BookedItinerary";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import Places from "../Screens/PlacesScreen/Places";
import NearBy from "../Screens/NearByScreen/NearBy";

const BookedStack = createStackNavigator(
  {
    BookingsHome: {
      screen: BookingsHome
    },
    BookedItinerary: {
      screen: BookedItinerary
    },
    BookedPlaces: {
      screen: Places
    },
    BookedNearBy: {
      screen: NearBy
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

BookedStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default BookedStack;
