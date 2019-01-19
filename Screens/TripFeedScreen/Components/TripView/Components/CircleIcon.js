import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const CircleIcon = ({
  icon,
  iconSize = 18,
  circleSize,
  rotate = "0deg",
  color = constants.black2,
  containerStyle = {},
  action
}) => {
  if (circleSize) {
    containerStyle.width = circleSize;
    containerStyle.height = circleSize;
    containerStyle.borderRadius = circleSize / 2;
  }
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.9}
      style={[styles.iconWrapper, containerStyle]}
    >
      <View style={[styles.iconContainer, { transform: [{ rotate }] }]}>
        <Icon name={icon} size={iconSize} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: constants.secondColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.secondColor,
    marginRight: 8
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

CircleIcon.propTypes = forbidExtraProps({
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  circleSize: PropTypes.number,
  rotate: PropTypes.string,
  color: PropTypes.string,
  containerStyle: PropTypes.object,
  action: PropTypes.func.isRequired
});

export default CircleIcon;
