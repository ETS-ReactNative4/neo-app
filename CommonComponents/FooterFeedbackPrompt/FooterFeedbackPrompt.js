import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";

class FooterFeedbackPrompt extends Component {
  render() {
    return <View style={styles.footerFeedbackPrompt} />;
  }
}

const styles = StyleSheet.create({
  footerFeedbackPrompt: {
    position: "absolute",
    height: 48,
    left: 24,
    bottom: 48 + (isIphoneX() ? constants.xSensorAreaHeight + 4 : 0),
    borderRadius: 4,
    width: responsiveWidth(100) - 48,
    backgroundColor: constants.firstColor
  }
});

export default FooterFeedbackPrompt;
