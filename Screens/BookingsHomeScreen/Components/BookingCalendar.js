import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import constants from "../../../constants/constants";
import moment from "moment";

const BookingCalendar = ({ startEndDates }) => {
  const numberOfRows = startEndDates.numberOfDays / 7;
  const rowArray = [];
  for (let i = 0; i < numberOfRows; i++) {
    const dateArray = [];

    const startCount = 7 * i;
    const endCount = 7 * (i + 1);

    for (let i = startCount; i < endCount; i++) {
      dateArray.push(moment(startEndDates.calendarStartDate).add(i, "days"));
    }

    rowArray.push(dateArray);
  }

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.weekNameRow}>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>{"S"}</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>{"M"}</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>{"T"}</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>{"W"}</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>{"T"}</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text style={styles.weekName}>{"F"}</Text>
        </View>
        <View style={styles.weekNameWrapper}>
          <Text
            style={[
              styles.weekName,
              Platform.OS === "ios" ? { marginRight: -5 } : {}
            ]}
          >
            {"S"}
          </Text>
        </View>
      </View>
      {rowArray.map((dates, index) => {
        return (
          <View key={index} style={styles.weekDayRow}>
            {/*Testing highlight styles*/}
            {/*<View style={[styles.weekDayWrapper, styles.leftCorner]}>*/}
            {/*<Text style={[styles.weekDay, styles.isHighlighted]}>{moment(dates[0]).format("DD")}</Text>*/}
            {/*</View>*/}
            {/*<View style={[styles.weekDayWrapper, styles.middleSection]}>*/}
            {/*<Text style={[styles.weekDay, styles.isHighlighted]}>{moment(dates[0]).format("DD")}</Text>*/}
            {/*</View>*/}
            {/*<View style={[styles.weekDayWrapper, styles.rightCorner]}>*/}
            {/*<Text style={[styles.weekDay, styles.isHighlighted]}>{moment(dates[0]).format("DD")}</Text>*/}
            {/*</View>*/}

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

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: 18,
    marginBottom: 48
  },
  weekNameRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  weekNameWrapper: {
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
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  weekDayWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4
  },
  rightCorner: {
    backgroundColor: constants.firstColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 0,
    width: 44
  },
  leftCorner: {
    backgroundColor: constants.firstColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 0,
    width: 44
  },
  middleSection: {
    backgroundColor: constants.firstColor,
    width: 48,
    marginHorizontal: 0
  },
  weekDay: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    color: constants.shade2,
    ...Platform.select({
      ios: {
        marginBottom: -4
      }
    })
  },
  isHighlighted: {
    fontFamily: constants.primarySemiBold,
    fontSize: 14,
    color: "white",
    ...Platform.select({
      ios: {
        marginTop: -7
      }
    })
  },
  isDepartureDate: {
    fontFamily: constants.primarySemiBold,
    fontSize: 14,
    color: "rgba(120,120,120,1)",
    ...Platform.select({
      ios: {
        marginTop: -7
      }
    })
  }
});

export default BookingCalendar;
