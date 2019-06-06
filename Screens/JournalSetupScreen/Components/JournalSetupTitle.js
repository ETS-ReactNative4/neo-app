import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const JournalSetupTitle = ({ title = "" }) => {
  return <Text style={styles.titleText}>{title}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 24, 30),
    color: constants.black1,
    marginTop: 32,
    textAlign: "center",
    marginHorizontal: 24
  }
});

JournalSetupTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default JournalSetupTitle;
