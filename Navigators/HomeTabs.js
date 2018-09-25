import { createBottomTabNavigator } from "react-navigation";
import Home from "../Screens/HomeScreen/Home";
import BookingTabs from "./BookingTabs";

const HomeTabs = createBottomTabNavigator({
  NewItineraryStack: {
    screen: Home
  },
  BookedItineraryTabs: {
    screen: BookingTabs
  }
});

export default HomeTabs;
