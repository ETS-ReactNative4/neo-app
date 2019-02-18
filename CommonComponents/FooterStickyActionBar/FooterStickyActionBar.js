import React from "react";
import { View, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

/**
 * Renders a sticky footer component when the component is added below a ScrollView
 * @param containerStyle
 * @param children
 * @returns {*}
 * @constructor
 */
const FooterStickyActionBar = ({ containerStyle = {}, children }) => {
  return (
    <View style={[styles.actionBarWrapper, containerStyle]}>
      <View style={styles.actionBar}>{children}</View>
    </View>
  );
};

FooterStickyActionBar.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
});

const styles = StyleSheet.create({
  actionBar: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,.3)",
    marginBottom: isIphoneX() ? constants.xSensorAreaHeight : 0
  },
  actionBarWrapper: {
    backgroundColor: "white"
  }
});

export default FooterStickyActionBar;
