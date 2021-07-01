import React, { useState, useRef, Fragment, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import useDealsListingApi, {
  IDealsListingResponseData,
  IDealsListingRequestBody
} from "./hooks/useDealsListingApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../CommonComponents/Icon/Icon";
import {
  CONSTANT_filterIcon,
  CONSTANT_visaSuccessAnimation,
  CONSTANT_defaultPlaceImage
} from "../../constants/imageAssets";
import {
  CONSTANT_white,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import useDealsFilter from "./hooks/useDealsFilter";
import useDeepCompareEffect from "use-deep-compare-effect";
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";
import ParallaxScrollView, {
  PARALLAX_BANNER_HEIGHT,
  PARALLAX_BANNER_WIDTH,
  ParallaxScrollViewBannerHeight
} from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
import { getGlobalPriceWithoutSymbol } from "../ExploreScreen/services/getPriceWithoutSymbol";
import DealsCard from "../../CommonComponents/DealsCard/DealsCard";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import DealsFilter from "./Components/DealsFilter";
import moment from "moment";
import deepLink from "../../Services/deepLink/deepLink";
import DealsSignupPromoCard from "./Components/DealsSignupPromoCard";
import { getLocaleStringGlobal } from "../../Services/getLocaleString/getLocaleString";
// @ts-ignore
import getSymbolFromCurrency from "currency-symbol-map";

export const DEAL_DATE_FORMAT = "Do MMM YYYY";

const DealsListing = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const abortFetchRef = useRef<any>(null);
  const [dealsListingApiDetails, loadDealsListing] = useDealsListingApi();

  const openFilterPanel = () => {
    setOpenFilter(true);
  };
  const closeFilterPanel = () => {
    setOpenFilter(false);
  };
  const applyFilter = () => {
    closeFilterPanel();
  };

  const { data: packagesData = {}, displayCurrency = "" } =
    dealsListingApiDetails?.successResponseData ?? {};

  const {
    campaignDetails = {},
    filteredItineraries = []
  } = packagesData as IDealsListingResponseData["data"];

  const {
    mobileImage
  } = campaignDetails as IDealsListingResponseData["data"]["campaignDetails"];

  const { discounts, month, price, sort, sortBy, cities } = useDealsFilter();

  const resetFilters = () => {
    discounts.reset();
    month.reset();
    price.reset();
    sort.reset();
    sortBy.reset();
    cities.reset();
  };

  const selectedDiscounts = discounts.group.options
    .filter(discount => discount.isSelected)
    .map(each => each.value);

  const selectedMonth = month.group.options
    .filter(monthEach => monthEach.isSelected)
    .map(each => each.value);

  const selectedPrice = price.group.options
    .filter(priceEach => priceEach.isSelected)
    .map(each => each.value);

  const selectedSort = sort.group.options
    .filter(sortEach => sortEach.isSelected)
    .map(each => each.value);

  const selectedSortBy = sortBy.group.options
    .filter(sortByEach => sortByEach.isSelected)
    .map(each => each.value);

  const selectedDepartureCity = cities.group.options
    .filter(city => city.isSelected)
    .map(each => each.value);

  useDeepCompareEffect(() => {
    const requestBody: IDealsListingRequestBody = {
      key: "deals/best-staycation",
      category: "staycation",
      limit: 50
    };

    if (selectedDiscounts.length) {
      requestBody.discount = selectedDiscounts;
    }

    if (selectedPrice.length) {
      requestBody.budgets = selectedPrice;
    }

    if (selectedMonth.length) {
      requestBody.months = selectedMonth;
    }

    if (selectedSort.length) {
      requestBody.sortBy = selectedSort[0] as "ASC" | "DESC";
    }

    if (selectedDepartureCity.length) {
      requestBody.dealDepartureCities = selectedDepartureCity;
    }

    if (selectedSortBy.length) {
      requestBody.fieldToBeSorted = selectedSortBy[0] as
        | "dealDiscountPercentage"
        | "cost";
    }

    // @ts-ignore
    // eslint-disable-next-line no-undef
    abortFetchRef.current = new AbortController();

    loadDealsListing({
      requestBody,
      abortController: abortFetchRef.current
    }).catch(() => null);
  }, [
    selectedDiscounts,
    selectedMonth,
    selectedPrice,
    selectedSort,
    selectedSortBy,
    selectedDepartureCity
  ]);

  const { isLoading } = dealsListingApiDetails;

  return (
    <View style={styles.dealsListing}>
      <TranslucentStatusBar />

      <ParallaxScrollView
        bannerImage={getImgIXUrl({
          src: mobileImage,
          imgFactor: `h=${PARALLAX_BANNER_HEIGHT}&w=${PARALLAX_BANNER_WIDTH}&crop=fit`
        })}
        smallText={""}
        titleText={""}
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
            const cardWidth = responsiveWidth(100) - 32;

            const imageHeight = ratioCalculator(41, 21, cardWidth);

            const bookByDate = moment(
              itinerary?.bookingDateRange?.end,
              "YYYY-MM-DD"
            );

            let bookByText = `Book by ${bookByDate.format(DEAL_DATE_FORMAT)}`;

            const today = moment();

            const dateDifference = bookByDate.diff(today, "days");

            if (dateDifference > 0 && dateDifference <= 10) {
              bookByText = `Only ${dateDifference} day${
                dateDifference > 1 ? "s" : ""
              } left to book`;
            }

            return (
              <Fragment key={itineraryIndex}>
                <DealsCard
                  width={cardWidth}
                  offerPercent={itinerary.dealDiscountPercentage}
                  bookingTime={bookByText}
                  title={itinerary.title}
                  info={`Travel between ${moment(
                    itinerary.availableDates?.[0],
                    "YYYY-MM-DD"
                  ).format(DEAL_DATE_FORMAT)} - ${moment(
                    itinerary.availableDates?.[
                      itinerary.availableDates?.length - 1
                    ],
                    "YYYY-MM-DD"
                  ).format(DEAL_DATE_FORMAT)}`}
                  priceSymbol={getSymbolFromCurrency(displayCurrency || "INR")}
                  price={getGlobalPriceWithoutSymbol({
                    amount: itinerary.itineraryCost,
                    currency: displayCurrency || "INR"
                  })}
                  perPersonText={
                    itinerary.totalPAX
                      ? ` per ${itinerary.totalPAX} person${
                          itinerary.totalPAX > 1 ? "s" : ""
                        }`
                      : ""
                  }
                  thumbnailSource={{
                    uri: getImgIXUrl({
                      DPR: 0.02,
                      src: itinerary.image,
                      imgFactor: `h=${imageHeight}&w=${cardWidth}&crop=fit`
                    })
                  }}
                  imgSource={{
                    uri: getImgIXUrl({
                      src: itinerary.image,
                      imgFactor: `h=${imageHeight}&w=${cardWidth}&crop=fit`
                    })
                  }}
                  location={itinerary.destinationString}
                  defaultSource={{ uri: CONSTANT_defaultPlaceImage }}
                  onClick={() => deepLink(itinerary.deepLinking)}
                  strikedPrice={
                    itinerary.strikedCost
                      ? getLocaleStringGlobal({
                          amount: itinerary.strikedCost,
                          currency: displayCurrency || "INR"
                        })
                      : ""
                  }
                  containerStyle={styles.dealCard}
                />
                <BlankSpacer height={16} />
                {itineraryIndex === 1 ? (
                  <>
                    <DealsSignupPromoCard />
                    <BlankSpacer height={16} />
                  </>
                ) : null}
              </Fragment>
            );
          });
        }, [filteredItineraries, displayCurrency])}
        <BlankSpacer height={62} />
      </ParallaxScrollView>
      <Modal
        onBackButtonPress={closeFilterPanel}
        style={styles.modalWrapperStyle}
        isVisible={openFilter}
      >
        <DealsFilter
          applyFilter={applyFilter}
          closeFilter={closeFilterPanel}
          resetFilter={resetFilters}
          discounts={discounts.group}
          month={month.group}
          price={price.group}
          sort={sort.group}
          sortBy={sortBy.group}
          cities={cities.group}
          selectDiscounts={discounts.action}
          selectMonth={month.action}
          selectPrice={price.action}
          selectSort={sort.action}
          selectSortBy={sortBy.action}
          selectCity={cities.action}
        />
      </Modal>

      <View style={styles.fixedWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openFilterPanel}
          style={styles.filterIcon}
        >
          <Icon name={CONSTANT_filterIcon} size={20} color={CONSTANT_white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dealsListing: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  placeholderWrapper: {
    height: responsiveHeight(100) - ParallaxScrollViewBannerHeight
  },
  dealCard: { marginHorizontal: 16 },
  fixedWrapper: { position: "absolute", right: 16, bottom: 24 },
  filterIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: CONSTANT_firstColor
  },
  modalWrapperStyle: {
    margin: 0
  }
});

export default DealsListing;
