import React, { useState, Fragment, useRef } from "react";
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
import { CONSTANT_white, CONSTANT_shade5 } from "../../constants/colorPallete";
import ExploreSectionTitle from "./Components/ExploreSectionTitle";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import BookedItineraryCardsRow from "./Components/BookedItineraryCardsRow";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import PackageItineraryCardsRow from "./Components/PackageItineraryCardsRow";
import PromotedCardsRow from "./Components/PromotedCardsRow";
import BlogCardsRow from "./Components/BlogCardsRow";
import CountryCardsRow from "./Components/CountryCardsRow";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import { CONSTANT_hamburgerIcon } from "../../constants/imageAssets";

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

  const openUltimateMenu = () => {};

  const header = useRef(
    PrimaryHeader({
      leftAction: openUltimateMenu,
      leftIcon: CONSTANT_hamburgerIcon
    })
  ).current;

  return (
    <View style={styles.container}>
      {header}
      <ScrollView removeClippedSubviews>
        {exploreData.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              <BlankSpacer height={24} />
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
              ) : section.type === "PACKAGE_ITINERARY_CARDS" ? (
                <PackageItineraryCardsRow {...section} />
              ) : section.type === "PROMOTED_CARDS" ? (
                <PromotedCardsRow {...section} />
              ) : section.type === "BLOG_CARDS" ? (
                <BlogCardsRow {...section} />
              ) : section.type === "COUNTRY_CARDS" ? (
                <CountryCardsRow {...section} />
              ) : null}
              <BlankSpacer height={24} />
              <BlankSpacer
                containerStyle={styles.spacerBackgroundStyle}
                height={4}
              />
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
    backgroundColor: CONSTANT_white
  },
  spacerBackgroundStyle: {
    backgroundColor: CONSTANT_shade5
  }
});

export default ErrorBoundary({ isRoot: true })(Explore);
