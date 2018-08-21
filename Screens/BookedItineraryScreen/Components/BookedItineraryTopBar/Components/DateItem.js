import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Platform,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import constants from "../../../../../constants/constants";
import { observer, inject } from "mobx-react/custom";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const DateItem = inject("itineraries")(
  observer(
    ({ day, selectDay, selectedDay, onHeaderLayout, index, itineraries }) => {
      const date = moment(day).format("DDMMYYYY");

      const layoutEvent = nativeEvent => {
        onHeaderLayout(nativeEvent, date);
      };

      const selectionMatrix = itineraries.getDateSelectionMatrixSingle(index);
      let selectionStyle, touchableStyleAndroid;
      if (selectionMatrix[0] === 0 && selectionMatrix[2] === 0) {
        selectionStyle = "singleDateContainer";
        touchableStyleAndroid = "singleDateTouchable";
      } else if (selectionMatrix[0] === 0) {
        selectionStyle = "leftCorner";
        touchableStyleAndroid = "leftTouchable";
      } else if (selectionMatrix[2] === 0) {
        selectionStyle = "rightCorner";
        touchableStyleAndroid = "rightTouchable";
      } else {
        selectionStyle = "middleSection";
        touchableStyleAndroid = "middleTouchable";
      }

      return (
        <TouchableWithoutFeedback
          onPress={() => selectDay(date)}
          style={[styles.touchableContainer, styles[touchableStyleAndroid]]}
          onLayout={layoutEvent}
        >
          <View style={[styles.dateContainer, styles[selectionStyle]]}>
            {date === selectedDay ? <View style={styles.activeBubble} /> : null}
            <Text style={[styles.dateText, styles.fdDateText]}>
              {date.substring(0, 2)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  )
);

DateItem.propTypes = forbidExtraProps({
  day: PropTypes.object.isRequired,
  selectDay: PropTypes.func.isRequired,
  selectedDay: PropTypes.string,
  onHeaderLayout: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
});

const styles = StyleSheet.create({
  touchableContainer: {
    ...Platform.select({
      ios: {
        marginHorizontal: 4
      }
    }),
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center"
  },

  // Normal
  dateContainer: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  dateText: {
    fontFamily: constants.primarySemiBold,
    color: "white",
    fontSize: 10
  },

  // Single Day
  singleDateContainer: {
    borderRadius: 12,
    backgroundColor: constants.firstColor,
    marginHorizontal: 4
  },
  singleDateTouchable: {
    paddingRight: 4,
    paddingLeft: 4
  },

  // Selected Section

  leftCorner: {
    backgroundColor: constants.firstColor,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0,
    marginLeft: 4,
    ...Platform.select({
      ios: {
        width: 31
      },
      android: {
        width: 28
      }
    })
  },
  leftTouchable: {
    ...Platform.select({
      android: {
        paddingLeft: 4,
        paddingRight: 4,
        width: 28,
        backgroundColor: constants.firstColor,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        marginLeft: 4
      }
    })
  },

  middleSection: {
    backgroundColor: constants.firstColor,
    marginHorizontal: 0,
    width: 32
  },
  middleTouchable: {
    ...Platform.select({
      android: {
        paddingLeft: 4,
        paddingRight: 4,
        width: 40,
        backgroundColor: constants.firstColor
      }
    })
  },

  rightCorner: {
    backgroundColor: constants.firstColor,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
    marginRight: 4,
    width: 28
  },
  rightTouchable: {
    ...Platform.select({
      android: {
        paddingLeft: 4,
        paddingRight: 4,
        width: 32,
        backgroundColor: constants.firstColor,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginRight: 4
      }
    })
  },

  selectedText: {
    marginTop: -1,
    color: "white"
  },

  activeBubble: {
    position: "absolute",
    backgroundColor: constants.black2,
    ...Platform.select({
      ios: {
        height: 31,
        width: 31,
        borderWidth: 2,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
      },
      android: {
        height: 28,
        width: 28,
        borderWidth: 2,
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
