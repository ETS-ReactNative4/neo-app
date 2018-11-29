import React from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const InfoDot = ({ containerStyle }) => {
  if (!containerStyle) containerStyle = {};
  return <View style={[styles.infoDotContainer, containerStyle]} />;
};

const styles = StyleSheet.create({
  infoDotContainer: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: constants.firstColor
  }
});

InfoDot.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default InfoDot;
