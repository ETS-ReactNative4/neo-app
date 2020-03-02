import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_EXPLORE_PAGE, SCREEN_EXPLORE_TAB } from "./ScreenNames";
import ExploreScreen from "../Screens/ExploreScreen/ExploreScreen";

export type ExploreTabStackType = {
  [SCREEN_EXPLORE_PAGE]: undefined;
};

const Stack = createStackNavigator<ExploreTabStackType>();

const ExploreStackWrapper = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN_EXPLORE_PAGE} component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export type PreTripHomeTabsType = {
  [SCREEN_EXPLORE_TAB]: undefined;
};

const Tab = createBottomTabNavigator<PreTripHomeTabsType>();

const PreTripHomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREEN_EXPLORE_TAB} component={ExploreStackWrapper} />
    </Tab.Navigator>
  );
};

export default PreTripHomeTabs;
