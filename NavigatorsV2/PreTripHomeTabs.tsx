import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREEN_EXPLORE_PAGE, SCREEN_EXPLORE_TAB } from "./ScreenNames";
import ExploreScreen, {
  ExploreScreenSourcesType
} from "../Screens/ExploreScreen/ExploreScreen";

export interface IExplorePageScreenData {
  source?: ExploreScreenSourcesType;
}

export type ExploreTabStackType = {
  [SCREEN_EXPLORE_PAGE]: IExplorePageScreenData;
};

export type PreTripHomeTabsType = {
  [SCREEN_EXPLORE_TAB]: IExplorePageScreenData;
};

const Tab = createBottomTabNavigator<PreTripHomeTabsType>();

const PreTripHomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREEN_EXPLORE_TAB} component={ExploreScreen} />
    </Tab.Navigator>
  );
};

export default PreTripHomeTabs;
