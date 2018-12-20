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
  );
};

const itemWidth = (responsiveWidth(100) - 48) / 7;
const styles = StyleSheet.create({
  weekNameRow: {
    height: 40,
    flexDirection: "row"
  },
  weekNameWrapper: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: itemWidth
  },
  weekName: {
    fontFamily: constants.primarySemiBold,
    fontSize: 14,
    color: constants.shade2
  }
});

export default WeekNameRow;
