import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const JournalDaySelectorTitle = ({
  title = "",
  description = "",
  dayString = "",
  day = ""
}) => {
  return (
    <View style={styles.daySelectorTitleContainer}>
      <View>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View>
        <Text style={[styles.titleText, styles.rightAlign]}>{dayString}</Text>
        <Text style={[styles.descriptionText, styles.rightAlign]}>{day}</Text>
      </View>
    </View>
  );
};

JournalDaySelectorTitle.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dayString: PropTypes.string,
  day: PropTypes.string
});

const styles = StyleSheet.create({
  daySelectorTitleContainer: {
    marginHorizontal: 24,
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 16, 17),
    color: constants.black1
  },
  descriptionText: {
    ...constants.fontCustom(constants.primaryRegular, 12, 32),
    color: constants.shade1
  },
  rightAlign: {
    textAlign: "right"
  }
});

export default JournalDaySelectorTitle;
