import React, { ReactNode } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { CONSTANT_white } from "../../../constants/colorPallete";

export interface ItineraryViewProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
}

const ItineraryView = ({ containerStyle, children }: ItineraryViewProps) => {
  return (
    <View style={[styles.itineraryViewContainer, containerStyle]}>
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
    backgroundColor: CONSTANT_white
  }
});

export default ItineraryView;
