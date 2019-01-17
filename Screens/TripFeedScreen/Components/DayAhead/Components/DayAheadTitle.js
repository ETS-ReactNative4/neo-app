import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../../constants/constants";

const DayAheadTitle = ({ title }) => {
  return (
    <View style={styles.dayAheadTitleWrapper}>
      <Text style={styles.dayAheadTitle}>{title}</Text>
    </View>
  );
};

DayAheadTitle.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  dayAheadTitleWrapper: {
    height: 16,
    marginLeft: 24,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  dayAheadTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.sixthColor
  }
});

export default DayAheadTitle;
