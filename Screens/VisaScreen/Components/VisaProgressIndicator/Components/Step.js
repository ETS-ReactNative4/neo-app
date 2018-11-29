import React from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../../constants/constants";
import Icon from "../../../../../CommonComponents/Icon/Icon";

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
      >
        {isActive || isLastActive ? (
          <Icon
            color={"white"}
            name={isLastActive ? constants.syncIcon : constants.checkIcon}
            size={17}
          />
        ) : null}
      </View>
      {isLastActive ? (
        <Image
          source={constants.dropDownArrow}
          style={styles.markerIcon}
          resizeMode={"contain"}
        />
      ) : null}
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
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  isLastActive: {
    height: 32,
    width: 32,
    backgroundColor: constants.firstColor,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  markerIcon: {
    height: 6,
    width: 12,
    transform: [{ rotate: "180deg" }],
    position: "absolute",
    bottom: 0
  }
});

Step.propTypes = forbidExtraProps({
  isActive: PropTypes.bool.isRequired,
  isLastActive: PropTypes.bool.isRequired
});

export default Step;
