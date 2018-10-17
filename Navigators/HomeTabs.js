import { createBottomTabNavigator } from "react-navigation";
import Home from "../Screens/HomeScreen/Home";
import BookedTabs from "./BookedTabs";
import NewItineraryStack from "./NewItineraryStack";

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
    initialRouteName: "BookedItineraryTabs",
    swipeEnabled: false
  }
);

export default HomeTabs;
