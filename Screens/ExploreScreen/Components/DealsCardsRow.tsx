import React from "react";
import { IDealsCardSection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { IDealsListingApiResponse } from "../../DealsListingScreen/hooks/useDealsListingApi";
import { CONSTANT_exploreFeedCardLimit } from "../../../constants/stringConstants";
import ExploreCardLodingIndicator from "./ExploreCardLodingIndicator";
import DealsCard from "../../../CommonComponents/DealsCard/DealsCard";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import { CONSTANT_shortCommonDateFormat } from "../../../constants/styles";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { CONSTANT_defaultPlaceImage } from "../../../constants/imageAssets";
import { CONSTANT_explore } from "../../../constants/appEvents";
import deepLink from "../../../Services/deepLink/deepLink";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { StyleSheet } from "react-native";

export interface IDealCardsData {
  isLoading: boolean;
  data?: IDealsListingApiResponse;
}

const DealsCardsRow = (props: IDealsCardSection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: IDealCardsData) => {
        return isLoading ? (
          <ExploreCardLodingIndicator height={454} />
        ) : data &&
          data.filteredItineraries &&
          data.filteredItineraries.length ? (
          data.filteredItineraries
            .slice(0, CONSTANT_exploreFeedCardLimit)
            .map((itinerary, itineraryIndex) => {
              const cardWidth = responsiveWidth(80);
              const imageHeight = ratioCalculator(41, 21, cardWidth);
              const action = () => {
                deepLink({
                  link: itinerary.deepLinking.link,
                  screenData: {
                    ...(itinerary.deepLinking.screenData || {}),
                    slug: itinerary.slug
                  }
                });
                recordEvent(CONSTANT_explore.event, {
                  click: CONSTANT_explore.click.dealsItineraryView
                });
              };

              const bookByDate = moment(
                itinerary.bookingDateRange.end,
                "YYYY-MM-DD"
              );

              let bookByText = `Book by ${bookByDate.format(
                CONSTANT_shortCommonDateFormat
              )}`;

              const today = moment();

              const dateDifference = bookByDate.diff(today, "days");

              if (dateDifference > 0 && dateDifference <= 10) {
                bookByText = `Only ${dateDifference} day${
                  dateDifference > 1 ? "s" : ""
                } left to book`;
              }

              return (
                <DealsCard
                  key={itineraryIndex}
                  width={cardWidth}
                  offerPercent={itinerary.dealDiscountPercentage}
                  bookingTime={bookByText}
                  title={itinerary.title}
                  info={`Travel between ${moment(
                    itinerary.availableDates[0],
                    "YYYY-MM-DD"
                  ).format(CONSTANT_shortCommonDateFormat)} - ${moment(
                    itinerary.availableDates[
                      itinerary.availableDates.length - 1
                    ],
                    "YYYY-MM-DD"
                  ).format(CONSTANT_shortCommonDateFormat)}`}
                  price={getPriceWithoutSymbol(itinerary.itineraryCost)}
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
                  onClick={action}
                  strikedPrice={
                    itinerary.strikedCost
                      ? `₹ ${getPriceWithoutSymbol(itinerary.strikedCost)}`
                      : ""
                  }
                  containerStyle={styles.itineraryCard}
                />
              );
            })
        ) : null;
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  itineraryCard: { marginRight: 16 }
});

export default DealsCardsRow;
