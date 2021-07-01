import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

const BlankSpacer = ({
  containerStyle = StyleSheet.create({}),
  height = responsiveHeight(50),
  width = responsiveWidth(100)
}) => {
  const style = {
    height,
    width
  };
  return <View style={[styles.blankSpacerContainer, style, containerStyle]} />;
};

BlankSpacer.propTypes = {
  containerStyle: ViewPropTypes.style,
  height: PropTypes.number,
  width: PropTypes.number
};

const styles = StyleSheet.create({
  blankSpacerContainer: {
    backgroundColor: "transparent"
  }
});

export default BlankSpacer;
