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
import constants from "../../../constants/constants";
import moment from "moment";
import PropTypes from "prop-types";
import _ from "lodash";

const BookingCalendar = ({
  startEndDates,
  days,
  getDateSelectionMatrixSingle
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
    return moment(day).format("DDMMYYYY");
  });

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
              const date = moment(day).format("DDMMYYYY");
              const dateIndex = dateArray.findIndex(
                singleDate => date === singleDate
              );
              const selectionMatrix = getDateSelectionMatrixSingle(dateIndex);

              let textStyle = "defaultStyle",
                containerStyle = "defaultStyle";
              if (dateIndex !== -1) {
                textStyle = "isHighlighted";
                if (selectionMatrix[0] === 0 && selectionMatrix[2] === 0) {
                  containerStyle = "singleDateContainer";
                } else if (selectionMatrix[0] === 0) {
                  containerStyle = "leftCorner";
                } else if (selectionMatrix[2] === 0) {
                  containerStyle = "rightCorner";
                } else {
                  containerStyle = "middleSection";
                }
              }

              return (
                <View
                  key={dayIndex}
                  style={[styles.weekDayWrapper, styles[containerStyle]]}
                >
                  <Text style={[styles.weekDay, styles[textStyle]]}>
                    {moment(day).format("DD")}
                  </Text>
                </View>
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
  getDateSelectionMatrixSingle: PropTypes.func.isRequired
};

const dateItemWidth = (responsiveWidth(100) - 24 - 4 * 14) / 7 - 2;

const styles = StyleSheet.create({
  calendarContainer: {
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
    flexDirection: "row"
  },
  weekDayWrapper: {
    width: dateItemWidth,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  singleDateContainer: {
    backgroundColor: constants.firstColor,
    borderRadius: dateItemWidth / 2
  },
  rightCorner: {
    backgroundColor: constants.firstColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 4,
    width: dateItemWidth + 4
  },
  leftCorner: {
    backgroundColor: constants.firstColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 4,
    width: dateItemWidth + 4
  },
  middleSection: {
    backgroundColor: constants.firstColor,
    width: dateItemWidth + 8,
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
  },
  defaultStyle: {
    marginHorizontal: 4
  }
});

export default BookingCalendar;
