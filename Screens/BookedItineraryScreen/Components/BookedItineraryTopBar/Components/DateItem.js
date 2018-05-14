import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Platform,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import constants from "../../../../../constants/constants";

const DateItem = ({ day }) => {
  const date = moment(day).format("DD");

  if (date === "01") {
    return (
      <View style={[styles.dateContainer, styles.leftCorner]}>
        <Text style={[styles.dateText, styles.selectedText]}>{date}</Text>
      </View>
    );
  }
  if (date === "02") {
    return (
      <View style={[styles.dateContainer, styles.middleSection]}>
        <Text style={[styles.dateText, styles.selectedText]}>{date}</Text>
      </View>
    );
  }
  if (date === "03") {
    return (
      <View style={[styles.dateContainer, styles.rightCorner]}>
        <View style={styles.activeBubble} />
        <Text style={[styles.dateText, styles.selectedText]}>{date}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.dateContainer, styles.fdDateContainer]}>
      <Text style={[styles.dateText, styles.fdDateText]}>{date}</Text>
    </View>
  );
};

DateItem.propTypes = {
  day: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  // Normal
  dateContainer: {
    height: 24,
    width: 24,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  dateText: {
    fontFamily: constants.primarySemiBold,
    color: constants.black1
  },

  // First Day
  fdDateContainer: {
    borderRadius: 12,
    backgroundColor: constants.shade5
  },
  fdDateText: {
    marginTop: -1
  },

  // Selected Section

  leftCorner: {
    backgroundColor: constants.firstColor,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0,
    width: 28
  },

  middleSection: {
    backgroundColor: constants.firstColor,
    marginHorizontal: 0,
    width: 32
  },

  rightCorner: {
    backgroundColor: constants.firstColor,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
    width: 28
  },

  selectedText: {
    marginTop: -1,
    color: "white"
  },

  activeBubble: {
    position: "absolute",
    backgroundColor: constants.firstColor,
    ...Platform.select({
      ios: {
        height: 30,
        width: 30,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
      },
      android: {
        height: 28,
        width: 28,
        borderWidth: 3,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14
      }
    }),
    borderColor: "white"
  }
});

export default DateItem;
