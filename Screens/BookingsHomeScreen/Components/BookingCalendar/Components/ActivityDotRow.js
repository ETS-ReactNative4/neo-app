import React from "react";
import { View, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";

const ActivityDotRow = ({ count }) => {
  return (
    <View style={styles.activityIndicatorRow}>
      {[...Array(count)].map((e, index) => (
        <View key={index} style={styles.dot} />
      ))}
    </View>
  );
};

ActivityDotRow.propTypes = {
  count: PropTypes.number.isRequired
};

const dateItemWidth = (responsiveWidth(100) - 24 - 4 * 14) / 7 - 2;
const styles = StyleSheet.create({
  activityIndicatorRow: {
    height: 4,
    width: dateItemWidth,
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    height: 4,
    width: 4,
    margin: 1,
    borderRadius: 2,
    backgroundColor: "white"
  }
});

export default ActivityDotRow;
