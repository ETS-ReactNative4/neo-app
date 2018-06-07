import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment/moment";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ActivityDotRow from "./ActivityDotRow";
import TransferIcon from "./TransferIcon";

const Date = ({
  day,
  dayIndex,
  dateArray,
  getDateSelectionMatrixSingle,
  numOfActivitiesByDay,
  getTransferTypeByDay,
  navigation
}) => {
  const date = moment(day).format("DDMMYYYY");
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
      if (dayIndex === 6) containerStyle = "lastRightCorner";
      else containerStyle = "rightCorner";
    } else {
      if (dayIndex === 6) containerStyle = "lastMiddleSection";
      else containerStyle = "middleSection";
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.push("BookedItinerary", {
          selectedDate: date
        });
      }}
    >
      <View style={[styles.weekDayWrapper, styles[containerStyle]]}>
        <Text style={[styles.weekDay, styles[textStyle]]}>
          {moment(day).format("DD")}
        </Text>
        {textStyle === "isHighlighted" ? (
          <ActivityDotRow count={count} />
        ) : null}
      </View>
      <TransferIcon transferType={transferType} />
    </TouchableOpacity>
  );
};

const dateItemWidth = (responsiveWidth(100) - 24 - 4 * 14) / 7 - 2;
const styles = StyleSheet.create({
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
  lastRightCorner: {
    backgroundColor: constants.firstColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 4,
    width: dateItemWidth - 6
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
  lastMiddleSection: {
    backgroundColor: constants.firstColor,
    width: dateItemWidth - 3,
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
  defaultStyle: {
    marginHorizontal: 4
  }
});

Date.propTypes = {
  day: PropTypes.object.isRequired,
  dayIndex: PropTypes.number.isRequired,
  dateArray: PropTypes.array.isRequired,
  getDateSelectionMatrixSingle: PropTypes.func.isRequired,
  numOfActivitiesByDay: PropTypes.func.isRequired,
  getTransferTypeByDay: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
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
