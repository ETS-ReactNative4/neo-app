import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const JournalDaySectionTitle = ({ title = "" }) => {
  return <Text style={styles.titleText}>{title}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 12),
    color: constants.shade1,
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 24
  }
});

JournalDaySectionTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default JournalDaySectionTitle;
