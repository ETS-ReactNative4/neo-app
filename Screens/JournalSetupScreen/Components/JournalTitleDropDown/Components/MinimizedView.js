import React from "react";
import { View, StyleSheet, Text } from "react-native";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const MinimizedView = ({ title, desc }) => {
  return (
    <View style={styles.minimizedViewContainer}>
      <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.titleText}>
        {title}
      </Text>
      <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.infoText}>
        {desc}
      </Text>
    </View>
  );
};

MinimizedView.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  minimizedViewContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 24
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 14, 18),
    color: "white",
    width: responsiveWidth(100) - 72
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 12, 14),
    color: "white",
    width: responsiveWidth(100) - 72
  }
});

export default MinimizedView;
