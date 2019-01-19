import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import constants from "../../../constants/constants";

const CompletedCard = () => {
  return (
    <View style={styles.completedCardContainer}>
      <View style={styles.dateContainer}>
        <View style={styles.dateSection}>
          <View style={styles.startDateWrapper}>
            <View style={styles.monthWrapper}>
              <Text style={styles.month}>APR</Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>03</Text>
            </View>
          </View>
          <View style={styles.dateSeparator} />
          <View style={styles.endDateWrapper}>
            <View style={styles.monthWrapper}>
              <Text style={styles.month}>APR</Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>08</Text>
            </View>
          </View>
        </View>
        <View style={styles.bookingIDSection}>
          <Text style={styles.bookingID}>{`PYT2039490`}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoHeaderWrapper}>
          <Text
            style={styles.infoHeader}
          >{`Anand’s family vacation to Europe`}</Text>
        </View>
        <View style={styles.infoTextWrapper}>
          <Text
            style={styles.infoText}
          >{`3 adults, departing Chennai. \nNot reviewed.`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  completedCardContainer: {
    height: 88,
    flexDirection: "row",
    marginTop: 24
  },
  dateContainer: {
    height: 88,
    width: 96,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: constants.shade2
  },
  dateSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  startDateWrapper: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },
  dateSeparator: {
    height: 26,
    width: 1,
    backgroundColor: constants.shade2,
    transform: [{ rotate: "8deg" }]
  },
  endDateWrapper: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8
  },
  monthWrapper: {
    height: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  month: {
    fontSize: 10,
    lineHeight: 10,
    color: constants.shade1,
    fontFamily: constants.primaryLight
  },
  dateWrapper: {
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  date: {
    fontSize: 20,
    lineHeight: 20,
    color: constants.black2,
    fontFamily: constants.primaryLight,
    fontWeight: "300"
  },
  bookingIDSection: {
    height: 24,
    backgroundColor: constants.shade2,
    alignItems: "center",
    justifyContent: "center"
  },
  bookingID: {
    fontFamily: constants.primaryLight,
    fontWeight: "normal",
    color: "white",
    fontSize: 12,
    lineHeight: 12
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16
  },
  infoHeaderWrapper: {
    height: 48,
    flexWrap: "wrap"
  },
  infoHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    fontWeight: "normal",
    color: constants.shade1
  },
  infoTextWrapper: {
    height: 40,
    flexWrap: "wrap"
  },
  infoText: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    fontWeight: "normal",
    color: constants.shade1
  }
});

export default CompletedCard;
