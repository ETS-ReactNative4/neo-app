import React, { useState, Fragment } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
import { exploreTestData } from "./ExploreTestCases";
import ItineraryCardsRow from "./Components/ItineraryCardsRow";
import HeroBannerRow from "./Components/HeroBannerRow";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONSTANT_white1 } from "../../constants/colorPallete";

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

const Explore = ({}: ExploreScreenProps) => {
  const [exploreData] = useState(exploreTestData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {exploreData.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              {section.type === "HERO_BANNER" ? (
                <HeroBannerRow {...section} />
              ) : section.type === "ITINERARY_CARDS" ? (
                <ItineraryCardsRow {...section} />
              ) : null}
            </Fragment>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANT_white1
  }
});

export default Explore;
