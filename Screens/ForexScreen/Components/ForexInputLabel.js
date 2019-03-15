import React from "react";
import _ from "lodash";
import { Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";

const ForexInputLabel = ({ label }) =>
  label ? <Text style={styles.labelText}>{_.toUpper(label)}</Text> : null;

const styles = StyleSheet.create({
  labelText: {
    ...constants.fontCustom(constants.primaryLight, 12, 16),
    color: constants.shade1
  }
});

export default ForexInputLabel;
