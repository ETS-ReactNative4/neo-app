import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Platform } from "react-native";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const WeekNameRow = () => {
  return (
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
        <Text style={styles.weekName}>{"S"}</Text>
      </View>
    </View>
  );
};

const itemWidth = (responsiveWidth(100) - 48) / 7;
const styles = StyleSheet.create({
  weekNameRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  weekNameWrapper: {
    height: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    backgroundColor: constants.shade4
  },
  weekName: {
    fontFamily: constants.primarySemiBold,
    fontSize: 12,
    color: "white"
  }
});

export default WeekNameRow;
