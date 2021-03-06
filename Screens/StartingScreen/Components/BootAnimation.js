import React from "react";
import LottieView from "lottie-react-native";
import constants from "../../../constants/constants";
import { StyleSheet } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth
} from "react-native-responsive-dimensions";
import PropTypes from "prop-types";

/**
 * The boot animation requires a opacity
 * because, in iOS the layout animation
 * causes the lottie animation to show its initial stage
 * when the view updates
 *
 * Set opacity to 0 to hide the view completely.
 */
const BootAnimation = ({
  splashAnimationRef,
  animationProgress,
  opacity = 0
}) => {
  return (
    <LottieView
      ref={splashAnimationRef}
      source={constants.splashAnimation()}
      style={[styles.lottieViewContainer, { opacity }]}
      resizeMode={"cover"}
      progress={animationProgress}
    />
  );
};

BootAnimation.propTypes = {
  splashAnimationRef: PropTypes.object.isRequired,
  animationProgress: PropTypes.object.isRequired,
  opacity: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  lottieViewContainer: {
    position: "absolute",
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    top: 0,
    left: 0
  }
});

export default BootAnimation;
