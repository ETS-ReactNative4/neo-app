import React from "react";
import { Text, View, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const CheckInCheckOut = ({
  containerStyle = {},
  checkInTitle = "CHECK IN",
  checkInDate,
  checkInTime,
  checkOutTitle = "CHECK OUT",
  checkOutDate,
  checkOutTime
}) => {
  return (
    <View style={[styles.checkInRow, containerStyle]}>
      <View style={styles.checkInBox}>
        <Text style={styles.checkTitle}>{checkInTitle}</Text>
        <Text style={styles.checkDate}>{checkInDate}</Text>
        <Text style={styles.checkTime}>{checkInTime}</Text>
      </View>
      <View style={styles.checkOutBox}>
        <Text style={styles.checkTitle}>{checkOutTitle}</Text>
        <Text style={styles.checkDate}>{checkOutDate}</Text>
        <Text style={styles.checkTime}>{checkOutTime}</Text>
      </View>
    </View>
  );
};

CheckInCheckOut.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  checkInTitle: PropTypes.string,
  checkInDate: PropTypes.string.isRequired,
  checkInTime: PropTypes.string.isRequired,
  checkOutTitle: PropTypes.string,
  checkOutDate: PropTypes.string.isRequired,
  checkOutTime: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  checkInRow: {
    height: 64,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16
  },
  checkInBox: {
    alignItems: "flex-start"
  },
  checkOutBox: {
    alignItems: "flex-end"
  },
  checkTitle: {
    fontFamily: constants.primarySemiBold,
    fontSize: 11,
    color: constants.black2
  },
  checkDate: {
    fontSize: 17,
    fontFamily: constants.primarySemiBold,
    color: constants.seventhColor
  },
  checkTime: {
    fontSize: 17,
    fontFamily: constants.primaryLight,
    color: constants.shade1,
    marginTop: 5
  }
});

export default CheckInCheckOut;
