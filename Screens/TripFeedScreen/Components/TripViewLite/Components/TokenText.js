import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const TokenText = ({
  text,
  color,
  size = 3,
  containerStyle = {},
  textStyle = { color: "white" }
}) => {
  if (color) {
    textStyle.color = color;
  }
  return (
    <View style={[styles.tokenContainer, containerStyle]}>
      <Text style={[styles.textStyle, textStyle]}>
        {text.slice(0, size).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tokenContainer: {
    backgroundColor: constants.firstColor,
    marginRight: 8,
    borderRadius: 4,
    height: 32,
    width: 44,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    ...constants.fontCustom(constants.primaryRegular, 17),
    fontWeight: "bold"
  }
});

TokenText.propTypes = forbidExtraProps({
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  textStyle: PropTypes.object,
  containerStyle: PropTypes.object
});

export default TokenText;
