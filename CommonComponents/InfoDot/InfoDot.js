import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const InfoDot = ({ containerStyle = StyleSheet.create({}), dotRadius = 4 }) => {
  if (!containerStyle) containerStyle = {};
  const dotStyle = {
    height: dotRadius * 2,
    width: dotRadius * 2,
    borderRadius: dotRadius
  };
  return <View style={[styles.infoDotContainer, dotStyle, containerStyle]} />;
};

const styles = StyleSheet.create({
  infoDotContainer: {
    backgroundColor: constants.firstColor
  }
});

InfoDot.propTypes = {
  containerStyle: ViewPropTypes.style,
  dotRadius: PropTypes.number
};

export default InfoDot;
