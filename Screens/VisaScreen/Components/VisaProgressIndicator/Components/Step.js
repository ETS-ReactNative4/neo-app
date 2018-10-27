import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../../constants/constants";

const Step = ({ isActive, isLastActive }) => {
  return (
    <View style={styles.stepContainer}>
      <View
        style={
          isActive
            ? styles.isActive
            : isLastActive
              ? styles.isLastActive
              : styles.stepSphere
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    height: 48
  },
  stepSphere: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: constants.shade3
  },
  isActive: {
    height: 26,
    width: 26,
    backgroundColor: constants.firstColor,
    borderRadius: 13
  },
  isLastActive: {
    height: 32,
    width: 32,
    backgroundColor: constants.firstColor,
    borderRadius: 16
  }
});

Step.propTypes = forbidExtraProps({
  isActive: PropTypes.bool.isRequired,
  isLastActive: PropTypes.bool.isRequired
});

export default Step;
