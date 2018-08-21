import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const HamburgerButton = ({ action, containerStyle }) => {
  if (!containerStyle) containerStyle = {};

  return (
    <TouchableHighlight
      style={[styles.hamburgerContainer, containerStyle]}
      onPress={action}
      underlayColor={"transparent"}
    >
      <Image
        style={styles.hamburgerIcon}
        source={constants.hamburgerIcon}
        resizeMode={"contain"}
      />
    </TouchableHighlight>
  );
};

HamburgerButton.propTypes = {
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.object
};

const styles = StyleSheet.create({
  hamburgerContainer: {
    width: 56,
    marginLeft: 24,
    height: constants.headerHeight,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  hamburgerIcon: {
    height: 24,
    width: 24
  }
});

export default HamburgerButton;
