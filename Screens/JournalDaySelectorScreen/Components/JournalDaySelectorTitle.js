import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const JournalDaySelectorTitle = ({ title = "", description = "" }) => {
  return (
    <View style={styles.daySelectorTitleContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  daySelectorTitleContainer: {
    marginHorizontal: 24,
    marginTop: 32
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 17),
    color: constants.black1
  },
  descriptionText: {
    ...constants.fontCustom(constants.primarySemiBold, 12, 32),
    color: constants.shade1
  }
});

JournalDaySelectorTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default JournalDaySelectorTitle;
