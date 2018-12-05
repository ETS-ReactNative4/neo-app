import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import moment from "moment";
import PropTypes from "prop-types";
import _ from "lodash";
import Date from "./Components/Date";
import WeekNameRow from "./Components/WeekNameRow";

const BookingCalendar = ({
  startEndDates,
  days,
  getDateSelectionMatrixSingle,
  numOfActivitiesByDay,
  getTransferTypeByDay,
  navigation,
  containerStyle = {}
}) => {
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

  const dateArray = days.map(day => {
    return moment(day).format("x");
  });

  return (
    <View style={[styles.calendarContainer, containerStyle]}>
      {rowArray.length ? <WeekNameRow /> : null}

      {rowArray.map((dates, index) => {
        return (
          <View key={index} style={styles.weekDayRow}>
            {dates.map((day, dayIndex) => {
              return (
                <Date
                  key={dayIndex}
                  day={day}
                  dayIndex={dayIndex}
                  dateArray={dateArray}
                  getDateSelectionMatrixSingle={getDateSelectionMatrixSingle}
                  numOfActivitiesByDay={numOfActivitiesByDay}
                  getTransferTypeByDay={getTransferTypeByDay}
                  navigation={navigation}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

BookingCalendar.propTypes = {
  startEndDates: PropTypes.object.isRequired,
  days: PropTypes.array.isRequired,
  getDateSelectionMatrixSingle: PropTypes.func.isRequired,
  numOfActivitiesByDay: PropTypes.func.isRequired,
  getTransferTypeByDay: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const styles = StyleSheet.create({
  calendarContainer: {
    marginBottom: 48
  },
  weekDayRow: {
    height: 40,
    marginVertical: 4,
    flexDirection: "row"
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
