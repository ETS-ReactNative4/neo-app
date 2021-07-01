import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const InfoDot = ({
  containerStyle = StyleSheet.create({}),
  dotRadius = 4,
  color = constants.firstColor
}) => {
  if (!containerStyle) containerStyle = {};
  const dotStyle = {
    height: dotRadius * 2,
    width: dotRadius * 2,
    borderRadius: dotRadius,
    backgroundColor: color
  };
  return <View style={[dotStyle, containerStyle]} />;
};

InfoDot.propTypes = {
  containerStyle: ViewPropTypes.style,
  dotRadius: PropTypes.number,
  color: PropTypes.string
};

export default InfoDot;
