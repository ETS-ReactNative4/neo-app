import React from "react";
import { StyleSheet } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { IBookedItinerarySection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import ItineraryCard from "../../../CommonComponents/ItineraryCard/ItineraryCard";
import { IBookedItinerary } from "../../../TypeInterfaces/IBookedItinerary";

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
      children={({ data, isLoading }: IItineraryCardsData) => {
        return isLoading
          ? null
          : data &&
              data.map((card, cardIndex) => {
                return (
                  <ItineraryCard
                    key={cardIndex}
                    tripType={card.type}
                    itineraryCost={card.cost}
                    images={[card.image]}
                    cities={card.cities}
                    action={() => null}
                    activities={[]}
                    title={card.itineraryText}
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

export default BookedItineraryCardsRow;
