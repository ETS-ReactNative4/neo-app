import React, { ReactNode } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { CONSTANT_white } from "../../../constants/colorPallete";

import ItineraryBanner from "./ItineraryBanner";

export interface ItineraryViewProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
}

const ItineraryView = ({ containerStyle, children }: ItineraryViewProps) => {
  return (
    <View style={[styles.itineraryViewContainer, containerStyle]}>
      <ItineraryBanner
        bannerImage={"https://d3lf10b5gahyby.cloudfront.net/misc/hungary.jpeg"}
        backAction={() => {}}
        smallText={"HONEYMOON"}
        title={"4 nights to Kuta and Ubud"}
        itineraryCost={"10,02,214"}
      />

      <View style={styles.bodyContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryViewContainer: {
    flex: 1
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: -24
  }
});

export default ItineraryView;
