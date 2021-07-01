import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ActivityDotRow from "./ActivityDotRow";
import TransferIcon from "./TransferIcon";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import { extendMoment } from "moment-range";
import Moment from "moment";
import { SCREEN_BOOKED_ITINERARY } from "../../../../../NavigatorsV2/ScreenNames";

const moment = extendMoment(Moment);

const Date = ({
  day,
  dayIndex,
  dateArray,
  getDateSelectionMatrixSingle,
  numOfActivitiesByDay,
  getTransferTypeByDay,
  navigation,
  cities
}) => {
  const date = moment(day).format("x");
  const dateIndex = dateArray.findIndex(singleDate => date === singleDate);
  const selectionMatrix = getDateSelectionMatrixSingle(dateIndex);
  const count = numOfActivitiesByDay(dateIndex);
  const transferType = getTransferTypeByDay(dateIndex);

  let textStyle = "defaultStyle",
    containerStyle = "defaultStyle";
  if (dateIndex !== -1) {
    textStyle = "isHighlighted";
    if (selectionMatrix[0] === 0 && selectionMatrix[2] === 0) {
      containerStyle = "singleDateContainer";
    } else if (selectionMatrix[0] === 0) {
      containerStyle = "leftCorner";
    } else if (selectionMatrix[2] === 0) {
      if (dayIndex === 6) {
        containerStyle = "lastRightCorner";
      } else {
        containerStyle = "rightCorner";
      }
    } else {
      if (dayIndex === 6) {
        containerStyle = "lastMiddleSection";
      } else {
        containerStyle = "middleSection";
      }
    }
  }

  let currentCity = {};
  if (
    containerStyle === "leftCorner" ||
    containerStyle === "singleDateContainer"
  ) {
    currentCity = cities.find(city => {
      const range = moment.range(city.startDay, city.endDay);
      return range.contains(day);
    });
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (dateIndex !== -1) {
          recordEvent(constants.Bookings.event, {
            click: constants.Bookings.click.calendarEventDate
          });
        } else {
          recordEvent(constants.Bookings.event, {
            click: constants.Bookings.click.calendarNoEventDate
          });
        }
        navigation.navigate(SCREEN_BOOKED_ITINERARY, {
          selectedDate: dateIndex !== -1 ? date : 0
        });
      }}
    >
      {currentCity.city ? (
        <View style={styles.weekDayTextArea}>
          <Text style={styles.cityName}>
            {currentCity.city.substring(0, 3).toUpperCase()}
          </Text>
        </View>
      ) : (
        <View style={styles.weekDayTextArea} />
      )}
      <View style={styles.weekDayWrapper}>
        <View style={[styles.weekDayWrapper, styles[containerStyle]]}>
          <Text style={[styles.weekDay, styles[textStyle]]}>
            {moment(day).format("DD")}
          </Text>
          {textStyle === "isHighlighted" ? (
            <ActivityDotRow count={count} />
          ) : null}
        </View>
      </View>
      <TransferIcon transferType={transferType} />
    </TouchableOpacity>
  );
};

const dateItemWidth = (responsiveWidth(100) - 48) / 7;
const styles = StyleSheet.create({
  weekDayTextArea: {
    height: 16,
    width: dateItemWidth,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  cityName: {
    ...constants.fontCustom(constants.primarySemiBold, 10),
    color: constants.firstColor,
    marginBottom: 2,
    ...Platform.select({
      ios: {
        height: 10
      }
    })
  },
  weekDayWrapper: {
    width: dateItemWidth,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  singleDateContainer: {
    backgroundColor: constants.firstColor,
    borderRadius: (dateItemWidth - 8) / 2,
    width: dateItemWidth - 8,
    marginHorizontal: 4
  },
  rightCorner: {
    backgroundColor: constants.firstColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 4,
    width: dateItemWidth - 4
  },
  lastRightCorner: {
    backgroundColor: constants.firstColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 4,
    width: dateItemWidth - 4
  },
  leftCorner: {
    backgroundColor: constants.firstColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 4,
    width: dateItemWidth - 4
  },
  middleSection: {
    backgroundColor: constants.firstColor,
    marginHorizontal: 0
  },
  lastMiddleSection: {
    backgroundColor: constants.firstColor,
    marginHorizontal: 0
  },
  weekDay: {
    fontFamily: constants.primarySemiBold,
    fontSize: 14,
    color: constants.shade3,
    marginTop: -7
  },
  isHighlighted: {
    fontFamily: constants.primarySemiBold,
    fontSize: 14,
    color: "white"
  },
  defaultStyle: {}
});

Date.propTypes = {
  day: PropTypes.object.isRequired,
  dayIndex: PropTypes.number.isRequired,
  dateArray: PropTypes.array.isRequired,
  getDateSelectionMatrixSingle: PropTypes.func.isRequired,
  numOfActivitiesByDay: PropTypes.func.isRequired,
  getTransferTypeByDay: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired
};

// Testing highlight styles
// <View style={[styles.weekDayWrapper, styles.leftCorner]}>
// <Text style={[styles.weekDay, styles.isHighlighted]}>{moment(dates[0]).format("DD")}</Text>
// </View>
// <View style={[styles.weekDayWrapper, styles.middleSection]}>
//   <Text style={[styles.weekDay, styles.isHighlighted]}>{moment(dates[0]).format("DD")}</Text>
// </View>
// <View style={[styles.weekDayWrapper, styles.rightCorner]}>
//   <Text style={[styles.weekDay, styles.isHighlighted]}>{moment(dates[0]).format("DD")}</Text>
// </View>

export default Date;
