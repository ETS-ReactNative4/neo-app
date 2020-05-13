import React, { useMemo, useState, Fragment, useRef } from "react";
import Modal from "react-native-modal";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import Icon from "../../CommonComponents/Icon/Icon";
import {
  CONSTANT_listIcon,
  CONSTANT_visaSuccessAnimation
} from "../../constants/imageAssets";
import {
  CONSTANT_white,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import { responsiveHeight } from "react-native-responsive-dimensions";
import ItineraryCard from "../../CommonComponents/ItineraryCard/ItineraryCard";
import ParallaxScrollView, {
  ParallaxScrollViewBannerHeight
} from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import {
  SCREEN_LISTING_PAGE,
  SCREEN_ITINERARY
} from "../../NavigatorsV2/ScreenNames";
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
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import LottieView from "lottie-react-native";

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

  const abortFetchRef = useRef<any>(null);

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

  const resetFilters = () => {
    interests.reset();
    travelDuration.reset();
    estimatedBudget.reset();
    propertyRatings.reset();
  };

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
    if (abortFetchRef.current) {
      abortFetchRef.current.abort();
    }
    // @ts-ignore
    // eslint-disable-next-line no-undef
    abortFetchRef.current = new AbortController();
    loadPackages({ requestBody, abortController: abortFetchRef.current }).catch(
      () => {
        // Request aborted do nothing...
      }
    );
  }, [selectedInterests, selectedDurations, selectedBudgets, selectedRatings]);

  const { isLoading } = packagesApiDetails;

  return (
    <View style={styles.listingPageContainer}>
      <TranslucentStatusBar />
      <ParallaxScrollView
        bannerImage={getImgIXUrl({ src: mobileImage })}
        smallText={bannerText}
        titleText={name}
        backAction={goBack}
      >
        <BlankSpacer height={20} />
        {!isLoading && filteredItineraries.length < 1 ? (
          <EmptyListPlaceholder
            text={"No itineraries found matching your criteria"}
            containerStyle={styles.placeholderWrapper}
          />
        ) : null}
        {isLoading ? (
          <View style={styles.placeholderWrapper}>
            <LottieView
              source={CONSTANT_visaSuccessAnimation()}
              autoPlay
              loop
            />
          </View>
        ) : null}
        {useMemo(() => {
          return filteredItineraries.map((itinerary, itineraryIndex) => {
            const inclusionList = generateInclusions(itinerary);

            return (
              <Fragment key={itineraryIndex}>
                <ItineraryCard
                  images={[getImgIXUrl({ src: itinerary.image })]}
                  tripType={itinerary.tripType}
                  action={() => {
                    // @ts-ignore
                    navigation.navigate(SCREEN_ITINERARY, {
                      slug: itinerary.slug,
                      itinerarySource: SCREEN_LISTING_PAGE
                    });
                  }}
                  title={itinerary.title}
                  inclusionList={inclusionList}
                  itineraryCost={getPriceWithoutSymbol(itinerary.itineraryCost)}
                  cities={itinerary.cityHotelStay}
                  containerStyle={styles.itineraryCardStyle}
                />
                <BlankSpacer height={16} />
              </Fragment>
            );
          });
        }, [filteredItineraries, navigation])}
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

      <Modal
        onBackButtonPress={closeFilterPanel}
        style={styles.modalWrapperStyle}
        isVisible={openFilter}
      >
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
          resetFilter={resetFilters}
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
  },
  itineraryCardStyle: {
    marginHorizontal: 16
  },
  placeholderWrapper: {
    height: responsiveHeight(100) - ParallaxScrollViewBannerHeight
  }
});

export default ErrorBoundary()(ListingPage);
