import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import Icon from "../../CommonComponents/Icon/Icon";
import { CONSTANT_listIcon } from "../../constants/imageAssets";
import {
  CONSTANT_white,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";
import ItineraryCard from "../../CommonComponents/ItineraryCard/ItineraryCard";
import ParallaxScrollView from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import { SCREEN_LISTING_PAGE } from "../../NavigatorsV2/ScreenNames";
import { RouteProp } from "@react-navigation/native";
import { ModalNavigatorParamsType } from "../../NavigatorsV2/ModalStack";
import { StackNavigationProp } from "@react-navigation/stack";
import usePackagesApi, { IPackagesResponseData } from "./hooks/usePackagesApi";
import getPriceWithoutSymbol from "../ExploreScreen/services/getPriceWithoutSymbol";
import { CONSTANT_platformAndroid } from "../../constants/stringConstants";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

type screenName = typeof SCREEN_LISTING_PAGE;

type ListingScreenRouteProp = RouteProp<ModalNavigatorParamsType, screenName>;

export type ListingScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamsType,
  screenName
>;

export interface ListingPageProps {
  navigation: ListingScreenNavigationProp;
  route: ListingScreenRouteProp;
}

const ListingPage = ({ navigation, route }: ListingPageProps) => {
  const [packagesApiDetails, loadPackages] = usePackagesApi();

  const goBack = () => navigation.goBack();

  const loadPackageDetails = () => {
    const { slug = "" } = route.params;
    const requestBody = {
      key: slug,
      limit: 50
    };
    loadPackages({ requestBody });
  };

  useEffect(() => {
    loadPackageDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: packagesData = {} } =
    packagesApiDetails.successResponseData || {};
  const {
    campaignDetails = {},
    filteredItineraries = []
  } = packagesData as IPackagesResponseData["data"];
  const {
    bannerText = "",
    name = "",
    mobileImage = ""
  } = campaignDetails as IPackagesResponseData["data"]["campaignDetails"];

  return (
    <View style={styles.listingPageContainer}>
      <TranslucentStatusBar />
      <ParallaxScrollView
        bannerImage={mobileImage}
        smallText={bannerText}
        titleText={name}
        backAction={goBack}
      >
        {useMemo(() => {
          return filteredItineraries.map((itinerary, itineraryIndex) => {
            return (
              <ItineraryCard
                key={itineraryIndex}
                images={[itinerary.image]}
                tripType={itinerary.tripType}
                action={() => Alert.alert("Click Itinerary Card")}
                title={itinerary.title}
                activities={itinerary.activities}
                itineraryCost={getPriceWithoutSymbol(itinerary.itineraryCost)}
                cities={itinerary.cityHotelStay}
              />
            );
          });
        }, [filteredItineraries])}
        {Platform.OS === CONSTANT_platformAndroid ? (
          <BlankSpacer height={responsiveHeight(100)} />
        ) : (
          <BlankSpacer height={24} />
        )}
      </ParallaxScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Alert.alert("Click filter")}
        style={styles.filterIcon}
      >
        <Icon name={CONSTANT_listIcon} size={20} color={CONSTANT_white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listingPageContainer: {
    flex: 1
  },
  filterIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: CONSTANT_firstColor
  }
});

export default ErrorBoundary()(ListingPage);
