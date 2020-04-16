import React, { ReactNode } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { CONSTANT_white } from "../../../constants/colorPallete";

import ItineraryBanner from "./ItineraryBanner";

export interface ItineraryViewProps {
  bannerImage: string;
  backAction: () => any;
  infoText: string;
  title: string;
  cost: string;
  containerStyle?: ViewStyle;
  children?: ReactNode;
}

const ItineraryView = ({
  bannerImage,
  backAction,
  infoText,
  title,
  cost,
  containerStyle,
  children
}: ItineraryViewProps) => {
  return (
    <View style={[styles.itineraryViewContainer, containerStyle]}>
      <ItineraryBanner
        bannerImage={bannerImage}
        backAction={backAction}
        smallText={infoText}
        title={title}
        itineraryCost={cost}
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
