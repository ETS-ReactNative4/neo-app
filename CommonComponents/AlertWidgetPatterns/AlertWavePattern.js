import React, { Fragment } from "react";
import { StyleSheet, Image } from "react-native";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import constants from "../../constants/constants";

const AlertWavePattern = () => {
  return (
    <Fragment>
      <Image source={constants.waveLeftIllus} style={styles.leftWaveImage} />
      <Image source={constants.waveRightIllus} style={styles.rightWaveImage} />
    </Fragment>
  );
};

const illustrationImageWidth = 72;
const styles = StyleSheet.create({
  leftWaveImage: {
    height: ratioCalculator(720, 518, illustrationImageWidth),
    width: illustrationImageWidth,
    position: "absolute",
    left: 0,
    bottom: 0
  },
  rightWaveImage: {
    height: ratioCalculator(720, 458, illustrationImageWidth),
    width: illustrationImageWidth,
    position: "absolute",
    right: 0,
    top: 0
  }
});

export default AlertWavePattern;
