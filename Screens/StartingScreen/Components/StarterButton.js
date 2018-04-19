import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const StarterButton = ({
  color,
  text,
  action,
  textColor,
  underlayColor,
  hasBorder,
  containerStyle
}) => {
  const textStyle = {};

  if (!containerStyle) containerStyle = {};

  if (textColor) textStyle.color = textColor;

  if (color) containerStyle.backgroundColor = color;

  if (hasBorder) {
    containerStyle = {
      ...containerStyle,
      borderWidth: 1,
      borderColor: textColor
    };
  }

  return (
    <TouchableHighlight
      style={[styles.button, containerStyle]}
      onPress={action}
      underlayColor={underlayColor || "white"}
    >
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableHighlight>
  );
};

StarterButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  underlayColor: PropTypes.string,
  hasBorder: PropTypes.bool,
  containerStyle: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 160,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: constants.firstColor,
    justifyContent: "center"
  },
  textStyle: {
    ...constants.font17(constants.primarySemiBold),
    lineHeight: 17
  }
});

export default StarterButton;
