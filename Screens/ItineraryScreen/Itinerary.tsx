import React from "react";
import { View, ViewStyle, StyleSheet, ScrollView } from "react-native";
import { CONSTANT_white } from "../../constants/colorPallete";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";

import ItineraryBanner from "./Components/ItineraryBanner";

interface ItineraryProps {
  containerStyle?: ViewStyle;
}

const Itinerary = ({ containerStyle }: ItineraryProps) => {
  return (
    <View style={[styles.itineraryContainerStyle, containerStyle]}>
      <ItineraryBanner
        bannerImage={"https://d3lf10b5gahyby.cloudfront.net/misc/hungary.jpeg"}
        backAction={() => {}}
        smallText={"HONEYMOON"}
        title={"4 nights to Kuta and Ubud"}
        itineraryCost={"10,02,214"}
      />

      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false} />

        <BottomButtonBar
          leftButtonName={"Customize"}
          leftButtonAction={() => {}}
          rightButtonName={"Update cost"}
          rightButtonAction={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryContainerStyle: {
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

export default Itinerary;
