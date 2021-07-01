import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ImagePositionIndicator = ({
  containerStyle = {},
  textStyle = {},
  text = "",
  action = () => null
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.selectionPositionWrapper, containerStyle]}
    >
      <Text style={[styles.selectionPositionText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

ImagePositionIndicator.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  text: PropTypes.string.isRequired,
  action: PropTypes.func
});

const styles = StyleSheet.create({
  selectionPositionWrapper: {
    height: 24,
    width: 24,
    backgroundColor: constants.seventhColor,
    alignItems: "center",
    justifyContent: "center"
  },
  selectionPositionText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: "white"
  }
});

export default ImagePositionIndicator;
