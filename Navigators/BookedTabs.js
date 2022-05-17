import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
// import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import constants from "../constants/constants";
import TabBarIcon from "../CommonComponents/TabBarIcon/TabBarIcon";
import React from "react";
import TripFeed from "../Screens/TripFeedScreen/TripFeed";
import Tools from "../Screens/ToolsScreen/Tools";
// import BookingsHome from "../Screens/BookingsHomeScreen/BookingsHome";
import KeyboardFriendlyBottomTabBar from "../CommonComponents/KeyboardFriendlyBottomTabBar/KeyboardFriendlyBottomTabBar";
import JournalStack from "./JournalStack";
import CustomBottomTabBar from "../CommonComponents/CustomBottomTabBar/CustomBottomTabBar";

const TabBarComponent = {
  tabBarComponent: Platform.select({
    android: KeyboardFriendlyBottomTabBar,
    ios: props => <CustomBottomTabBar bottomTabBarProps={props} />
  })
};

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
    // Support: {
    //   screen: ChatScreen
    // },
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
              text: "Trip Feed",
              icon: focused
                ? constants.tripFeedSelectedIcon
                : constants.tripFeedIcon,
              color,
              focused
            };
            break;

          case "Bookings":
            icon = {
              text: "Bookings",
              icon: focused
                ? constants.bookingSelectedIcon
                : constants.bookingIcon,
              color,
              focused
            };
            break;

          case "Support":
            icon = {
              text: "Support",
              icon: focused
                ? constants.supportSelectedIcon
                : constants.supportIconLight,
              color,
              focused
            };
            break;

          case "Tools":
            icon = {
              text: "Tools",
              icon: focused ? constants.toolSelectedIcon : constants.toolIcon,
              color,
              focused
            };
            break;

          case "Journal":
            icon = {
              text: "Journal",
              icon: focused
                ? constants.journalSelectedIcon
                : constants.journalIcon,
              color,
              focused
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
