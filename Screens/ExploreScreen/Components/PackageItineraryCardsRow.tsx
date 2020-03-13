import React from "react";
import { StyleSheet } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { IPackageItinerarySection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import ItineraryCard from "../../../CommonComponents/ItineraryCard/ItineraryCard";
import { IPackageItinerary } from "../../../TypeInterfaces/IPackageItinerary";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";
import generateInclusions from "../services/generateInclusions";
import ExploreCardLodingIndicator from "./ExploreCardLodingIndicator";

export interface IPackageItineraryCardsData {
  isLoading: boolean;
  data?: {
    campaignDetails: any;
    filteredItineraries: IPackageItinerary[];
    testimonials: any;
    tripStartingPrice: number;
  };
}

const PackageItineraryCardsRow = (props: IPackageItinerarySection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: IPackageItineraryCardsData) => {
        return isLoading ? (
          <ExploreCardLodingIndicator height={454} />
        ) : (
          data &&
            data.filteredItineraries.map((card, cardIndex) => {
              const amount = getPriceWithoutSymbol(card.itineraryCost);

              const inclusionList = generateInclusions(card);

              return (
                <ItineraryCard
                  key={cardIndex}
                  tripType={card.tripType}
                  itineraryCost={amount}
                  images={[card.image]}
                  cities={card.cityHotelStay}
                  action={() => null}
                  title={card.title}
                  containerStyle={styles.itineraryCardWrapper}
                  imageStyle={styles.itineraryImage}
                  inclusionList={inclusionList}
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
    width: responsiveWidth(80)
  },
  itineraryImage: {
    width: responsiveWidth(80)
  }
});

export default PackageItineraryCardsRow;
