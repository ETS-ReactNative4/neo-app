import { createBottomTabNavigator } from "react-navigation";
import Home from "../Screens/HomeScreen/Home";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import HomeTabBar from "../CommonComponents/HomeTabBar/HomeTabBar";
import BookingStack from "./BookingStack";
import ToolStack from "./ToolStack";
import HomeFlip from "../Screens/HomeFlipScreen/HomeFlip";

const HomeTabs = createBottomTabNavigator(
  {
    TripFeed: {
      screen: Home
    },
    Bookings: {
      screen: BookingStack
    },
    Support: {
      screen: ChatScreen
    },
    Tools: {
      screen: ToolStack
    },
    Journal: {
      screen: Home
    }
  },
  HomeTabBar
);

export default HomeTabs;
