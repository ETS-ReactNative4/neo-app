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
        return isLoading
          ? null
          : data &&
              data.filteredItineraries.map((card, cardIndex) => {
                const amount = getPriceWithoutSymbol(card.itineraryCost);
                return (
                  <ItineraryCard
                    key={cardIndex}
                    tripType={card.tripType}
                    itineraryCost={amount}
                    images={[card.image]}
                    cities={card.cityHotelStay}
                    action={() => null}
                    activities={card.activities}
                    title={card.title}
                    containerStyle={styles.itineraryCardWrapper}
                    imageStyle={styles.itineraryImage}
                  />
                );
              });
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
