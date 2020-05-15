import React from "react";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { IBookedItinerarySection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import ItineraryCard from "../../../CommonComponents/ItineraryCard/ItineraryCard";
import { IBookedItinerary } from "../../../TypeInterfaces/IBookedItinerary";
import ExploreCardLodingIndicator from "./ExploreCardLodingIndicator";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { CONSTANT_exploreFeedCardLimit } from "../../../constants/stringConstants";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { CONSTANT_explore } from "../../../constants/appEvents";
import deepLink from "../../../Services/deepLink/deepLink";

export interface IItineraryCardsData {
  isLoading: boolean;
  data?: IBookedItinerary[];
}

const BookedItineraryCardsRow = (props: IBookedItinerarySection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: IItineraryCardsData) => {
        return isLoading ? (
          <ExploreCardLodingIndicator height={454} />
        ) : (
          data &&
            data
              .slice(0, CONSTANT_exploreFeedCardLimit)
              .map((card, cardIndex) => {
                const action = () => {
                  deepLink(card.deepLinking);
                  recordEvent(CONSTANT_explore.event, {
                    click: CONSTANT_explore.click.onGoingHolidaysView
                  });
                };
                return (
                  <ItineraryCard
                    key={cardIndex}
                    tripType={card.type}
                    itineraryCost={card.cost}
                    thumbnailImages={[
                      getImgIXUrl({
                        src: card.image,
                        DPR: 0.02,
                        imgFactor: `h=200&w=${responsiveWidth(100)}&crop=fit`
                      })
                    ]}
                    images={[
                      getImgIXUrl({
                        src: card.image,
                        imgFactor: `h=200&w=${responsiveWidth(100)}&crop=fit`
                      })
                    ]}
                    cities={card.cities}
                    action={action}
                    inclusionList={[]}
                    title={card.itineraryText}
                    containerStyle={styles.itineraryCardWrapper}
                    imageStyle={styles.itineraryImage}
                  />
                );
              })
        );
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  itineraryCardWrapper: {
    width: responsiveWidth(80),
    marginRight: 16
  },
  itineraryImage: {
    width: responsiveWidth(80)
  }
});

export default BookedItineraryCardsRow;
