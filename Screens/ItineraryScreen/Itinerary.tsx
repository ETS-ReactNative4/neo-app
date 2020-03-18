import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

export interface ItineraryProps {
  containerStyle?: ViewStyle;
}

const Itinerary = ({ containerStyle }: ItineraryProps) => {
  return <View style={[styles.itineraryContainerStyle, containerStyle]} />;
};

const styles = StyleSheet.create({
  itineraryContainerStyle: {
    flex: 1
  }
});

export default Itinerary;
