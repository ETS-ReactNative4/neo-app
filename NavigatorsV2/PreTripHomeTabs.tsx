import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SCREEN_EXPLORE_TAB,
  SCREEN_SEARCH_TAB,
  SCREEN_NOTIFICATION_TAB,
  SCREEN_DEALS_TAB
} from "./ScreenNames";
import Explore, {
  ExploreScreenSourcesType
} from "../Screens/ExploreScreen/Explore";
import ExploreBottomBar from "../CommonComponents/ExploreBottomBar/ExploreBottomBar";
import Search from "../Screens/SearchScreen/Search";
import {
  CONSTANT_compassIcon,
  CONSTANT_searchIcon,
  CONSTANT_notificationBellIcon,
  CONSTANT_dealsIcon
} from "../constants/imageAssets";
import Notifications from "../Screens/NotificationsScreen/Notifications";
import DealsListing from "../Screens/DealsListingScreen/DealsListing";

export interface IExplorePageScreenData {
  source?: ExploreScreenSourcesType;
}

export type PreTripHomeTabsType = {
  [SCREEN_EXPLORE_TAB]: IExplorePageScreenData;
  [SCREEN_SEARCH_TAB]: undefined;
  [SCREEN_NOTIFICATION_TAB]: undefined;
  [SCREEN_DEALS_TAB]: undefined;
};

const Tab = createBottomTabNavigator<PreTripHomeTabsType>();

const tabBarColorConfig = {
  activeTintColor: "#00C684",
  activeBackgroundColor: "#0B6D4D",
  inactiveTintColor: "#3C8F73",
  inactiveBackgroundColor: "#28795E"
};

const PreTripHomeTabs = () => {
  return (
    // @ts-ignore - type definitions unavailable
    <Tab.Navigator tabBar={props => <ExploreBottomBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: "Explore",
          icon: CONSTANT_compassIcon,
          ...tabBarColorConfig
        }}
        name={SCREEN_EXPLORE_TAB}
        component={Explore}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Deals",
          icon: CONSTANT_dealsIcon,
          ...tabBarColorConfig
        }}
        name={SCREEN_DEALS_TAB}
        component={DealsListing}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Search",
          icon: CONSTANT_searchIcon,
          ...tabBarColorConfig
        }}
        name={SCREEN_SEARCH_TAB}
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Notifications",
          icon: CONSTANT_notificationBellIcon,
          ...tabBarColorConfig
        }}
        name={SCREEN_NOTIFICATION_TAB}
        component={Notifications}
      />
    </Tab.Navigator>
  );
};

export default PreTripHomeTabs;
