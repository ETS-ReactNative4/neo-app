import React from "react";
import { StyleSheet, ViewPropTypes, Image } from "react-native";
import constants from "../../constants/constants";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";

const VisaWidgetWavePattern = () => {
  return (
    <Image
      source={constants.visaWidgetWaveIllus}
      style={styles.rightWaveImage}
    />
  );
};

VisaWidgetWavePattern.propTypes = {
  containerStyle: ViewPropTypes.style
};

const illustrationImageWidth = 72;
const styles = StyleSheet.create({
  rightWaveImage: {
    height: ratioCalculator(7, 5, illustrationImageWidth),
    width: illustrationImageWidth,
    position: "absolute",
    right: 0,
    bottom: 0
  }
});

export default VisaWidgetWavePattern;
