import React from "react";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { IPackageItinerarySection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import ItineraryCard from "../../../CommonComponents/ItineraryCard/ItineraryCard";
import { IPackageItinerary } from "../../../TypeInterfaces/IPackageItinerary";
import generateInclusions from "../services/generateInclusions";
import ExploreCardLodingIndicator from "./ExploreCardLodingIndicator";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { CONSTANT_exploreFeedCardLimit } from "../../../constants/stringConstants";
import { CONSTANT_explore } from "../../../constants/appEvents";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import deepLink from "../../../Services/deepLink/deepLink";

export interface IPackageItineraryCardsData {
  isLoading: boolean;
  data?: {
    campaignDetails: any;
    filteredItineraries: IPackageItinerary[];
    testimonials: any;
    tripStartingPrice: number;
  };
  displayCurrency: string;
}

const PackageItineraryCardsRow = (props: IPackageItinerarySection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading, displayCurrency }: IPackageItineraryCardsData) => {
        return isLoading ? (
          <ExploreCardLodingIndicator height={454} />
        ) : (
          data &&
            data.filteredItineraries
              .slice(0, CONSTANT_exploreFeedCardLimit)
              .map((card, cardIndex) => {
                const amount = card.itineraryCost;
                const action = () => {
                  deepLink({
                    link: card.deepLinking.link,
                    screenData: {
                      ...(card.deepLinking.screenData || {}),
                      slug: card.slug
                    }
                  });
                  recordEvent(CONSTANT_explore.event, {
                    click: CONSTANT_explore.click.pocketFriendlyDestinationsView
                  });
                };
                const inclusionList = generateInclusions(card);

                return (
                  <ItineraryCard
                    key={cardIndex}
                    tripType={card.tripType}
                    itineraryCost={amount}
                    images={[
                      getImgIXUrl({
                        src: card.image,
                        imgFactor: `h=200&w=${responsiveWidth(100)}&crop=fit`
                      })
                    ]}
                    thumbnailImages={[
                      getImgIXUrl({
                        src: card.image,
                        DPR: 0.02,
                        imgFactor: `h=200&w=${responsiveWidth(100)}&crop=fit`
                      })
                    ]}
                    cities={card.cityHotelStay}
                    action={action}
                    title={card.title}
                    containerStyle={styles.itineraryCardWrapper}
                    imageStyle={styles.itineraryImage}
                    inclusionList={inclusionList}
                    displayCurrency={displayCurrency}
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

export default PackageItineraryCardsRow;
