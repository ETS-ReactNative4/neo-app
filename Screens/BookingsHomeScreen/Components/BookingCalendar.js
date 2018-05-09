import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import constants from "../../../constants/constants";
import moment from "moment";

const BookingCalendar = ({ itinerary, startEndDates }) => {
  const numberOfRows = startEndDates.numberOfDays / 7;
  const rowArray = [];
  for (let i = 0; i < numberOfRows; i++) {
    const dateArray = [];

    const startCount = 7 * i;
    const endCount = 7 * (i + 1);

    console.log(startCount, endCount);

    for (let i = startCount; i < endCount; i++) {
      dateArray.push(moment(startEndDates.calendarStartDate).add(i, "days"));
    }

    rowArray.push(dateArray);
  }

  console.log(rowArray);
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
      {rowArray.map((dates, index) => {
        return (
          <View key={index} style={styles.weekDayRow}>
            {dates.map((day, dayIndex) => {
              return (
                <View key={dayIndex} style={styles.weekDayWrapper}>
                  <Text style={styles.weekDay}>{moment(day).format("DD")}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const calendarItemWidth = (Dimensions.get("window").width - 48) / 7;
const styles = StyleSheet.create({
  calendarContainer: {
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
  },
  weekDayRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  weekDayWrapper: {
    width: calendarItemWidth,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  weekDay: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    color: constants.shade2
  }
});

export default BookingCalendar;
