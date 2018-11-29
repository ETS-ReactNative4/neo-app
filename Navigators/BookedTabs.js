import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import BookedStack from "./BookedStack";
import ToolStack from "./ToolStack";
import constants from "../constants/constants";
import TabBarIcon from "../CommonComponents/TabBarIcon/TabBarIcon";
import React from "react";
import Journal from "../Screens/JournalScreen/Journal";
import TripFeed from "../Screens/TripFeedScreen/TripFeed";

const BookedTabs = createBottomTabNavigator(
  {
    TripFeed: {
      screen: createStackNavigator({ TripFeedHome: { screen: TripFeed } })
    },
    Bookings: {
      screen: BookedStack
    },
    Support: {
      screen: ChatScreen
    },
    Tools: {
      screen: ToolStack
    },
    Journal: {
      screen: Journal
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon;

        const color = focused ? constants.black1 : constants.shade2;

        switch (routeName) {
          case "TripFeed":
            icon = {
              text: "TRIP FEED",
              icon: focused
                ? constants.tripFeedSelectedIcon
                : constants.tripFeedIcon,
              color
            };
            break;

          case "Bookings":
            icon = {
              text: "BOOKINGS",
              icon: focused
                ? constants.bookingSelectedIcon
                : constants.bookingIcon,
              color
            };
            break;

          case "Support":
            icon = {
              text: "SUPPORT",
              icon: focused
                ? constants.supportSelectedIcon
                : constants.supportIcon,
              color
            };
            break;

          case "Tools":
            icon = {
              text: "TOOLS",
              icon: focused ? constants.toolSelectedIcon : constants.toolIcon,
              color
            };
            break;

          case "Journal":
            icon = {
              text: "JOURNAL",
              icon: focused
                ? constants.journalSelectedIcon
                : constants.journalIcon,
              color
            };
            break;
        }

        return <TabBarIcon {...icon} />;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "white",
        height: 56
      }
    },
    initialRouteName: "Bookings",
    swipeEnabled: false,
    lazy: false
  }
);

BookedTabs.navigationOptions = () => {
  const tabBarVisible = false;

  return {
    tabBarVisible
  };
};

export default BookedTabs;
