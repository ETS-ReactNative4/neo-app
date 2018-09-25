import { createBottomTabNavigator } from "react-navigation";
import Home from "../Screens/HomeScreen/Home";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import BookingStack from "./BookingStack";
import ToolStack from "./ToolStack";
import constants from "../constants/constants";
import TabBarIcon from "../CommonComponents/TabBarIcon/TabBarIcon";
import React from "react";

const BookingTabs = createBottomTabNavigator(
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
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon;

        switch (routeName) {
          case "TripFeed":
            icon = {
              text: "TRIP FEED",
              icon: focused
                ? constants.tripFeedSelectedIcon
                : constants.tripFeedIcon
            };
            break;

          case "Bookings":
            icon = {
              text: "BOOKINGS",
              icon: focused
                ? constants.bookingSelectedIcon
                : constants.bookingIcon
            };
            break;

          case "Support":
            icon = {
              text: "SUPPORT",
              icon: focused
                ? constants.supportSelectedIcon
                : constants.supportIcon
            };
            break;

          case "Tools":
            icon = {
              text: "TOOLS",
              icon: focused ? constants.toolSelectedIcon : constants.toolIcon
            };
            break;

          case "Journal":
            icon = {
              text: "JOURNAL",
              icon: focused
                ? constants.journalSelectedIcon
                : constants.journalIcon
            };
            break;
        }

        return <TabBarIcon {...icon} />;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "white"
      }
    },
    initialRouteName: "Bookings",
    swipeEnabled: false
  }
);

export default BookingTabs;
