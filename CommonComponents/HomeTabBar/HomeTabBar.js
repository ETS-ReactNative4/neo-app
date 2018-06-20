import constants from "../../constants/constants";
import React from "react";
import TabBarIcon from "../TabBarIcon/TabBarIcon";

const HomeTabBar = {
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
  initialRouteName: "Tools",
  swipeEnabled: false
};

export default HomeTabBar;
