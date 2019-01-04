import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const MultilineButton = ({
  title,
  text,
  action,
  containerStyle = {},
  color = constants.black1
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionsButton, { borderColor: color }, containerStyle]}
      onPress={action}
    >
      <Text
        style={[
          styles.optionTitle,
          { color },
          text ? { paddingBottom: 4 } : {}
        ]}
      >
        {title}
      </Text>
      {text ? <Text style={[styles.optionText, { color }]}>{text}</Text> : null}
    </TouchableOpacity>
  );
};

MultilineButton.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  color: PropTypes.string
});

const styles = StyleSheet.create({
  optionsButton: {
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  optionTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  optionText: {
    ...constants.fontCustom(constants.primaryLight, 11),
    textAlign: "center",
    paddingHorizontal: 8,
    paddingBottom: 4
  }
});

export default MultilineButton;
