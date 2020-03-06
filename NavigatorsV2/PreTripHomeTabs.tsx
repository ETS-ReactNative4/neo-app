import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SCREEN_EXPLORE_PAGE,
  SCREEN_EXPLORE_TAB,
  SCREEN_SEARCH_TAB
} from "./ScreenNames";
import ExploreScreen, {
  ExploreScreenSourcesType
} from "../Screens/ExploreScreen/ExploreScreen";
import ExploreBottomBar from "../CommonComponents/ExploreBottomBar/ExploreBottomBar";
import Search from "../Screens/SearchScreen/Search";
import {
  CONSTANT_twentiethColor,
  CONSTANT_twentyFirstColor,
  CONSTANT_twentySecondColor,
  CONSTANT_twentyThirdColor
} from "../constants/colorPallete";
import { CONSTANT_passIcon } from "../constants/imageAssets";

export interface IExplorePageScreenData {
  source?: ExploreScreenSourcesType;
}

export type ExploreTabStackType = {
  [SCREEN_EXPLORE_PAGE]: IExplorePageScreenData;
};

export type PreTripHomeTabsType = {
  [SCREEN_EXPLORE_TAB]: IExplorePageScreenData;
  [SCREEN_SEARCH_TAB]: undefined;
};

const Tab = createBottomTabNavigator<PreTripHomeTabsType>();

const tabBarColorConfig = {
  activeTintColor: CONSTANT_twentyThirdColor,
  activeBackgroundColor: CONSTANT_twentyFirstColor,
  inactiveTintColor: CONSTANT_twentySecondColor,
  inactiveBackgroundColor: CONSTANT_twentiethColor
};

const PreTripHomeTabs = () => {
  return (
    // @ts-ignore - type definitions unavailable
    <Tab.Navigator tabBar={props => <ExploreBottomBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: "Explore",
          icon: CONSTANT_passIcon,
          ...tabBarColorConfig
        }}
        name={SCREEN_EXPLORE_TAB}
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Search",
          icon: CONSTANT_passIcon,
          ...tabBarColorConfig
        }}
        name={SCREEN_SEARCH_TAB}
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default PreTripHomeTabs;
