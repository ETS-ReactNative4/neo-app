import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import constants from "../../../constants/constants";

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
