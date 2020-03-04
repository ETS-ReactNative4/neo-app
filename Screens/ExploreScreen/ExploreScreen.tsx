import React from "react";
import { View } from "react-native";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_PAGE,
  SCREEN_EXPLORE_TAB
} from "../../NavigatorsV2/ScreenNames";
import {
  PreTripHomeTabsType,
  ExploreTabStackType
} from "../../NavigatorsV2/PreTripHomeTabs";

export type ExploreScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_EXPLORE_TAB>
>;

export type ExploreScreenRouteProp = RouteProp<
  ExploreTabStackType,
  typeof SCREEN_EXPLORE_PAGE
>;

export interface ExploreScreenProps {
  navigation: ExploreScreenNavigationType;
  route: ExploreScreenRouteProp;
}

export type ExploreScreenSourcesType = "TravelProfileFlow";

const ExploreScreen = ({}: ExploreScreenProps) => {
  return <View />;
};

export default ExploreScreen;
