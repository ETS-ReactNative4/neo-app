import { createBottomTabNavigator } from "react-navigation";
import BookedTabs from "./BookedTabs";
import NewItineraryStack from "./NewItineraryStack";
import storeService from "../Services/storeService/storeService";

const HomeTabs = createBottomTabNavigator(
  {
    NewItineraryStack: {
      screen: NewItineraryStack
    },
    BookedItineraryTabs: {
      screen: BookedTabs
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      if (navigation.isFocused()) {
        if (routeName === "NewItineraryStack") {
          storeService.appState.setTripMode(false);
        } else if (routeName === "BookedItineraryTabs") {
          storeService.appState.setTripMode(true);
        }
      }
      return {};
    },
    initialRouteName: "NewItineraryStack",
    swipeEnabled: false,
    lazy: false
  }
);

export default HomeTabs;
