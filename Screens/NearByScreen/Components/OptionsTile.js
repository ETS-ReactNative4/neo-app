import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const OptionsTile = ({ text, action, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.optionTileContainer,
        isSelected ? styles.tileSelected : null
      ]}
    >
      {isSelected ? (
        <Icon
          name={constants.checkIcon}
          color={constants.firstColor}
          size={17}
        />
      ) : null}
      <Text
        style={[styles.optionText, isSelected ? styles.textSelected : null]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionTileContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: constants.shade4,
    paddingHorizontal: 16
  },
  tileSelected: {
    backgroundColor: constants.firstColorAlpha(0.1)
  },
  optionText: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.firstColor,
    fontWeight: "normal",
    ...Platform.select({
      ios: {
        marginTop: 4
      },
      android: {
        marginTop: 3
      }
    })
  },
  textSelected: {
    color: constants.black2,
    paddingLeft: 16
  }
});

OptionsTile.propTypes = forbidExtraProps({
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
});

export default OptionsTile;
