import React, { useState, Fragment, useRef, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB,
  SCREEN_ULTIMATE_MENU
} from "../../NavigatorsV2/ScreenNames";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";
import HeroBannerRow from "./Components/HeroBannerRow";
import {
  CONSTANT_white,
  CONSTANT_shade5,
  CONSTANT_black1
} from "../../constants/colorPallete";
import ExploreSectionTitle from "./Components/ExploreSectionTitle";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import BookedItineraryCardsRow from "./Components/BookedItineraryCardsRow";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import PackageItineraryCardsRow from "./Components/PackageItineraryCardsRow";
import PromotedCardsRow from "./Components/PromotedCardsRow";
import BlogCardsRow from "./Components/BlogCardsRow";
import CountryCardsRow from "./Components/CountryCardsRow";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import {
  CONSTANT_trustIconFacebook,
  CONSTANT_trustIconGoogle,
  CONSTANT_trustIconIata,
  CONSTANT_preTripHamburger
} from "../../constants/imageAssets";
import TestimonialsCardsRow from "./Components/TestimonialsCardsRow";
import TrustIcons from "../../CommonComponents/TrustIcons/TrustIcons";
import { ExploreFeedType } from "./ExploreFeedType";
import useExploreDataRequest from "./hooks/useExploreDataRequest";
import useDeepCompareEffect from "use-deep-compare-effect";
import { inject, observer } from "mobx-react";
import YourBookings from "../../mobx/YourBookings";
import User from "../../mobx/User";
import DealsCardsRow from "./Components/DealsCardsRow";

export type ExploreScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_EXPLORE_TAB>
>;

export type ExploreScreenRouteProp = RouteProp<
  PreTripHomeTabsType,
  typeof SCREEN_EXPLORE_TAB
>;

export interface ExploreScreenProps {
  navigation: ExploreScreenNavigationType;
  route: ExploreScreenRouteProp;
  yourBookingsStore: YourBookings;
  userStore: User;
}

export type ExploreScreenSourcesType = "TravelProfileFlow";

const Explore = ({
  navigation,
  yourBookingsStore,
  userStore
}: ExploreScreenProps) => {
  let [exploreData, setExploreData] = useState<ExploreFeedType>([]);
  const [exploreDataApi, loadExploreData] = useExploreDataRequest();

  const openUltimateMenu = () => {
    navigation.navigate(SCREEN_ULTIMATE_MENU);
  };

  const header = useRef(
    PrimaryHeader({
      leftAction: openUltimateMenu,
      leftIcon: CONSTANT_preTripHamburger
    })
  ).current;

  useEffect(() => {
    loadExploreData();
    yourBookingsStore.getUpcomingItineraries();
    userStore.getUserDisplayDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { successResponseData } = exploreDataApi;

  useDeepCompareEffect(() => {
    if (successResponseData) {
      setExploreData(successResponseData.data?.[0]?.value ?? []);
    }
  }, [successResponseData || {}]);

  const { userDisplayDetails } = userStore;

  const { name } = userDisplayDetails;

  return (
    <View style={styles.container}>
      {header}
      <ScrollView>
        {name ? (
          <Fragment>
            <BlankSpacer height={24} />
            <ExploreSectionTitle
              title={`Hi ${name},`}
              description={"It’s time to explore the world, your way"}
              titleColor={CONSTANT_black1}
            />
          </Fragment>
        ) : null}
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
              ) : section.type === "TESTIMONIAL_CARDS" ? (
                <TestimonialsCardsRow {...section} />
              ) : section.type === "DEALS_CARDS" ? (
                <DealsCardsRow {...section} />
              ) : null}
              <BlankSpacer height={24} />
              <BlankSpacer
                containerStyle={styles.spacerBackgroundStyle}
                height={4}
              />
            </Fragment>
          );
        })}

        <BlankSpacer height={24} />
        {exploreData.length ? (
          <View style={styles.trustIconsWrapper}>
            <TrustIcons
              image={CONSTANT_trustIconFacebook()}
              text={"4.8/5 based on 1150+ reviews"}
            />
            <TrustIcons
              image={CONSTANT_trustIconGoogle()}
              text={"4.7/5 based on 700+ reviews"}
            />
            <TrustIcons
              image={CONSTANT_trustIconIata()}
              text={"Accredited Agent"}
            />
          </View>
        ) : null}
        <BlankSpacer height={40} />
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
  },
  trustIconsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24
  }
});

export default ErrorBoundary({ isRoot: true })(
  inject("userStore")(inject("yourBookingsStore")(observer(Explore)))
);
