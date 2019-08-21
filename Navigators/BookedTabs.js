import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import constants from "../constants/constants";
import TabBarIcon from "../CommonComponents/TabBarIcon/TabBarIcon";
import React from "react";
import TripFeed from "../Screens/TripFeedScreen/TripFeed";
import Tools from "../Screens/ToolsScreen/Tools";
import BookingsHome from "../Screens/BookingsHomeScreen/BookingsHome";
import KeyboardFriendlyBottomTabBar from "../CommonComponents/KeyboardFriendlyBottomTabBar/KeyboardFriendlyBottomTabBar";
import JournalStack from "./JournalStack";

const TabBarComponent =
  Platform.OS === "android"
    ? { tabBarComponent: KeyboardFriendlyBottomTabBar }
    : {};

const BookedTabs = createBottomTabNavigator(
  {
    TripFeed: {
      screen: createStackNavigator({
        /**
         * StackNavigator needed to render proper header in trip feed
         */
        TripFeedHome: {
          screen: TripFeed
        }
      })
    },
    Bookings: {
      screen: BookingsHome
    },
    Support: {
      screen: ChatScreen
    },
    Tools: {
      screen: Tools
    },
    Journal: {
      screen: JournalStack
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon;

        const color = focused ? constants.firstColor : constants.shade1dot5;

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
                : constants.supportIconLight,
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
    navigationOptions: () => {
      const tabBarVisible = false;

      return {
        tabBarVisible
      };
    },
    ...TabBarComponent,
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "white",
        height: 56
      }
    },
    initialRouteName: "TripFeed",
    swipeEnabled: false,
    lazy: false
  }
);

export default BookedTabs;
