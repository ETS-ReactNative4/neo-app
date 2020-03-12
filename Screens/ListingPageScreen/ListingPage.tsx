import React, { useMemo, useState } from "react";
import Modal from "react-native-modal";
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
import usePackagesApi, {
  IPackagesResponseData,
  IPackageRequestBody
} from "./hooks/usePackagesApi";
import getPriceWithoutSymbol from "../ExploreScreen/services/getPriceWithoutSymbol";
import { CONSTANT_platformAndroid } from "../../constants/stringConstants";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import FilterActionSheet from "./Components/FilterActionSheet";
import usePackagesFilter from "./hooks/usePackagesFilter";
import generateInclusions from "../ExploreScreen/services/generateInclusions";
import useDeepCompareEffect from "use-deep-compare-effect";

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
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const openFilterPanel = () => {
    setOpenFilter(true);
  };
  const closeFilterPanel = () => {
    setOpenFilter(false);
  };

  const applyFilter = () => {
    closeFilterPanel();
  };

  const goBack = () => navigation.goBack();

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

  const {
    interests,
    travelDuration,
    estimatedBudget,
    propertyRatings
  } = usePackagesFilter();

  const selectedInterests = interests.group.options
    .filter(interest => {
      return interest.isSelected;
    })
    .map(each => each.value);

  const selectedDurations = travelDuration.group.options
    .filter(duration => {
      return duration.isSelected;
    })
    .map(each => each.value);

  const selectedBudgets = estimatedBudget.group.options
    .filter(budget => {
      return budget.isSelected;
    })
    .map(each => each.value);

  const selectedRatings = propertyRatings.group.options
    .filter(rating => {
      return rating.isSelected;
    })
    .map(each => each.value);

  useDeepCompareEffect(() => {
    const { slug = "" } = route.params;
    const requestBody: IPackageRequestBody = {
      key: slug,
      limit: 50
    };
    if (selectedInterests.length) {
      requestBody.interests = selectedInterests;
    }
    if (selectedDurations.length) {
      requestBody.durations = selectedDurations;
    }
    if (selectedBudgets.length) {
      requestBody.budgets = selectedBudgets;
    }
    if (selectedRatings.length) {
      requestBody.hotelRatings = selectedRatings;
    }
    loadPackages({ requestBody });
  }, [selectedInterests, selectedDurations, selectedBudgets, selectedRatings]);

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
            const inclusionList = generateInclusions(itinerary);

            return (
              <ItineraryCard
                key={itineraryIndex}
                images={[itinerary.image]}
                tripType={itinerary.tripType}
                action={() => Alert.alert("Click Itinerary Card")}
                title={itinerary.title}
                inclusionList={inclusionList}
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
        onPress={openFilterPanel}
        style={styles.filterIcon}
      >
        <Icon name={CONSTANT_listIcon} size={20} color={CONSTANT_white} />
      </TouchableOpacity>

      <Modal style={styles.modalWrapperStyle} isVisible={openFilter}>
        <FilterActionSheet
          interests={interests.group}
          selectInterest={interests.action}
          travelDuration={travelDuration.group}
          selectTravelDuration={travelDuration.action}
          estimatedBudget={estimatedBudget.group}
          selectEstimatedBudget={estimatedBudget.action}
          propertyRating={propertyRatings.group}
          selectPropertyRating={propertyRatings.action}
          closeFilter={closeFilterPanel}
          applyFilter={applyFilter}
        />
      </Modal>
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
  },
  modalWrapperStyle: {
    margin: 0
  }
});

export default ErrorBoundary()(ListingPage);
