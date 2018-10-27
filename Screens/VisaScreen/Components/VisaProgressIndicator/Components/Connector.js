import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../../constants/constants";

const Connector = ({ isActive, isLastActive }) => {
  return (
    <View
      style={[
        styles.connectorContainer,
        !isActive || isLastActive ? styles.inactive : null
      ]}
    />
  );
};

const styles = StyleSheet.create({
  connectorContainer: {
    height: 3,
    flex: 1,
    backgroundColor: constants.firstColor,
    alignSelf: "center"
  },
  inactive: {
    backgroundColor: constants.shade3
  }
});

Connector.propTypes = forbidExtraProps({
  isActive: PropTypes.bool.isRequired,
  isLastActive: PropTypes.bool.isRequired
});

export default Connector;
