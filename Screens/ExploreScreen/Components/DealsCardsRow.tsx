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
import { getGlobalPriceWithoutSymbol } from "../services/getPriceWithoutSymbol";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { CONSTANT_defaultPlaceImage } from "../../../constants/imageAssets";
import { CONSTANT_explore } from "../../../constants/appEvents";
import deepLink from "../../../Services/deepLink/deepLink";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { StyleSheet } from "react-native";
import { DEAL_DATE_FORMAT } from "../../DealsListingScreen/DealsListing";
// @ts-ignore
import getSymbolFromCurrency from "currency-symbol-map";
import { getLocaleStringGlobal } from "../../../Services/getLocaleString/getLocaleString";

export interface IDealCardsData {
  isLoading: boolean;
  data?: IDealsListingApiResponse;
  displayCurrency: string;
}

const DealsCardsRow = (props: IDealsCardSection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading, displayCurrency }: IDealCardsData) => {
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

              let bookByText = `Book by ${bookByDate.format(DEAL_DATE_FORMAT)}`;

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
                  ).format(DEAL_DATE_FORMAT)} - ${moment(
                    itinerary.availableDates[
                      itinerary.availableDates.length - 1
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
                  onClick={action}
                  strikedPrice={
                    itinerary.strikedCost
                      ? getLocaleStringGlobal({
                          amount: itinerary.strikedCost,
                          currency: displayCurrency
                        })
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
