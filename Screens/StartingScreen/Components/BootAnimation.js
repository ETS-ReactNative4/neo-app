import React from "react";
import LottieView from "lottie-react-native";
import constants from "../../../constants/constants";
import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import PropTypes from "prop-types";

const BootAnimation = ({ splashAnimationRef }) => {
  return (
    <LottieView
      ref={splashAnimationRef}
      source={constants.splashAnimation()}
      style={styles.lottieViewContainer}
      resizeMode={"cover"}
      autoPlay={true}
      loop={false}
    />
  );
};

BootAnimation.propTypes = {
  splashAnimationRef: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  lottieViewContainer: {
    position: "absolute",
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    top: 0,
    left: 0
  }
});

export default BootAnimation;
