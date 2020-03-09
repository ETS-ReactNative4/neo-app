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
import getLocaleString from "../../../Services/getLocaleString/getLocaleString";

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
      children={({ data, isLoading }: IPackageItineraryCardsData) => {
        return isLoading
          ? null
          : data &&
              data.filteredItineraries.map((card, cardIndex) => {
                // PT TODO: Better way to display the money...
                const amount = getLocaleString(card.itineraryCost);
                const amountWithoutRupeeSymbol = amount.substr(2);
                const amountWithoutFixedDecimals = amountWithoutRupeeSymbol.slice(
                  0,
                  -3
                );

                return (
                  <ItineraryCard
                    key={cardIndex}
                    tripType={card.tripType}
                    itineraryCost={amountWithoutFixedDecimals}
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
    />
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
