import { Text, StyleSheet } from "react-native";
import React from "react";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import moment from "moment";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const TitleDate = ({ date }) => {
  return (
    <Text style={styles.dateText}>{moment(date).format("ddd, DD MMM")}</Text>
  );
};

TitleDate.propTypes = forbidExtraProps({
  date: PropTypes.number.isRequired
});

const styles = StyleSheet.create({
  dateText: {
    marginBottom: 8,
    ...constants.fontCustom(constants.primaryLight, 15),
    color: "rgba(74,144,226,1)"
  }
});

export default TitleDate;
