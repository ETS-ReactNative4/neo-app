import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import constants from "../../../constants/constants";
import moment from "moment";

const BookingCalendar = ({ itinerary, startEndDates }) => {
  const numberOfRows = startEndDates.numberOfDays / 7;
  const rowArray = [];
  for (let i = 1; i <= numberOfRows; i++) {
    rowArray.push(i);
  }

  const dateArray = [];
  for (let i = 0; i <= startEndDates.numberOfDays; i++) {
    dateArray.push(moment(startEndDates.calendarStartDate).add(i, "days"));
  }

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.weekNameRow}>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>S</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>M</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>T</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>W</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>T</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>F</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>S</Text>
        </View>
      </View>
    </View>
  );
};

const calendarItemWidth = (Dimensions.get("window").width - 48) / 7;
const styles = StyleSheet.create({
  calendarContainer: {
    height: 120,
    marginTop: 18,
    marginBottom: 48
  },
  weekNameRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  weekNameWrapper: {
    width: calendarItemWidth,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  weekName: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    color: constants.shade1
  }
});

export default BookingCalendar;
