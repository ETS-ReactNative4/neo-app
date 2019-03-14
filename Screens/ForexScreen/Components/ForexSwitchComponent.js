import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";
import ForexLabel from "./ForexLabel";

const ForexSwitchComponent = ({
  containerStyle = {},
  options = [],
  selectedValue = "",
  onSelect = () => null,
  label = ""
}) => {
  return (
    <View style={containerStyle}>
      <ForexLabel label={label} />
      <View style={styles.forexSwitchContainer}>
        {options.map((option, optionIndex) => {
          const isFirstSwitch = optionIndex === 0;
          const isLastSwitch = optionIndex === options.length - 1;
          const isSelected = option.value === selectedValue;
          return (
            <TouchableOpacity
              onPress={() => onSelect(option.value)}
              key={optionIndex}
              style={[
                styles.forexSwitch,
                isFirstSwitch ? styles.firstSwitch : null,
                isLastSwitch ? styles.lastSwitch : null,
                isSelected ? styles.selectedSwitch : null
              ]}
            >
              <Text
                style={[
                  styles.switchText,
                  isSelected ? styles.selectedText : null
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

ForexSwitchComponent.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired
    })
  ).isRequired
});

const styles = StyleSheet.create({
  forexSwitchContainer: {
    flexDirection: "row",
    marginTop: 8
  },
  forexSwitch: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: constants.black2,
    borderBottomColor: constants.black2,
    width: 60,
    height: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  firstSwitch: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: constants.black2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  lastSwitch: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: constants.black2,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  selectedSwitch: {
    backgroundColor: constants.seventhColor
  },
  switchText: {
    ...constants.fontCustom(constants.primaryRegular, 18),
    color: constants.black2
  },
  selectedText: {
    color: "white"
  }
});

export default ForexSwitchComponent;
