import React from "react";
import { View, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

const FeedbackPanelOverlay = () => {
  return <View style={styles.feedbackPanelOverlay} />;
};

const styles = StyleSheet.create({
  feedbackPanelOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: "rgba(0,0,0,0.9)"
  }
});

export default FeedbackPanelOverlay;
