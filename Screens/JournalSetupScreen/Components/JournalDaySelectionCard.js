import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const JournalDaySelectionCard = ({
  dayString = "",
  day = "",
  title = "",
  description = "",
  action = () => null,
  isLast = false
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.7}
      style={[
        styles.journalDaySelectionCardContainer,
        isLast ? {} : styles.lineSeparator
      ]}
    >
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.titleString}
        >
          {dayString}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.infoString}
        >
          {day}
        </Text>
      </View>

      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.titleString}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.infoString}
        >
          {description}
        </Text>
      </View>

      <View>
        <Icon name={constants.arrowRight} color={constants.black1} size={10} />
      </View>
    </TouchableOpacity>
  );
};

JournalDaySelectionCard.propTypes = forbidExtraProps({
  dayString: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  journalDaySelectionCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24
  },
  lineSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: constants.shade5
  },
  titleString: {
    ...constants.fontCustom(constants.primaryRegular, 16, 32),
    color: constants.black1
  },
  infoString: {
    ...constants.fontCustom(constants.primarySemiBold, 12, 32),
    color: constants.shade1
  }
});

export default JournalDaySelectionCard;
