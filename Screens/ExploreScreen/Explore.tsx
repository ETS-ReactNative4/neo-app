import React, { useState, Fragment } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import HeroBannerRow from "./Components/HeroBannerRow";
import { CONSTANT_white1 } from "../../constants/colorPallete";
import ExploreSectionTitle from "./Components/ExploreSectionTitle";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import BookedItineraryCardsRow from "./Components/BookedItineraryCardsRow";

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
    <View style={styles.container}>
      <ScrollView>
        {exploreData.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              <ExploreSectionTitle
                title={section.title}
                description={section.subTitle}
                titleColor={section.color}
              />
              {section.title || section.subTitle ? (
                <BlankSpacer height={16} />
              ) : null}
              {section.type === "HERO_BANNER" ? (
                <HeroBannerRow {...section} />
              ) : section.type === "BOOKED_ITINERARY_CARDS" ? (
                <BookedItineraryCardsRow {...section} />
              ) : null}
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANT_white1
  }
});

export default Explore;
