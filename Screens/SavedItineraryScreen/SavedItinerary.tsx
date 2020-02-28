import React from "react";
import { View, ViewStyle } from "react-native";

interface SavedItineraryProps {
  containerStyle?: ViewStyle;
}

const SavedItinerary = ({ containerStyle }: SavedItineraryProps) => {
  return <View style={containerStyle} />;
};

export default SavedItinerary;
