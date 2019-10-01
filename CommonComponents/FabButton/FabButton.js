import React from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

const FabButton = ({
  containerStyle = StyleSheet.create({}),
  radius,
  backgroundColor = constants.firstColor,
  iconColor = "white",
  action = () => null,
  icon,
  iconSize
}) => {
  const buttonContainer = {
    height: radius * 2,
    width: radius * 2,
    borderRadius: radius,
    backgroundColor
  };
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.fabButtonContainer, buttonContainer, containerStyle]}
    >
      <Icon name={icon} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  );
};

FabButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  radius: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  fabButtonContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default FabButton;
