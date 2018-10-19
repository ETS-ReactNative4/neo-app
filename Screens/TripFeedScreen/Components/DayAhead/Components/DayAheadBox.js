import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import constants from "../../../../../constants/constants";
import FastImage from "react-native-fast-image";
import UpcomingBadge from "./UpcomingBadge";

const DayAheadBox = () => {
  return (
    <TouchableOpacity onPress={() => null} activeOpacity={0.7}>
      <FastImage
        source={constants.starterBackground}
        style={styles.dayAheadBoxContainer}
      >
        <View style={styles.textAreaWrapper}>
          <UpcomingBadge />
          <View style={styles.timeTextWrapper}>
            <Text style={styles.timeText}>
              {"8:00am "}
              <Text style={styles.whiteText}>{"Pickup"}</Text>
            </Text>
          </View>
          <Text
            numberOfLines={3}
            ellipsizeMode={"tail"}
            style={styles.descriptionText}
          >
            {
              "City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer"
            }
          </Text>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayAheadBoxContainer: {
    height: 136,
    width: 152,
    marginRight: 8,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  textAreaWrapper: {
    marginHorizontal: 8,
    marginBottom: 16
  },
  timeTextWrapper: {
    marginTop: 6
  },
  timeText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.secondColor
  },
  whiteText: {
    color: "white"
  },
  descriptionText: {
    ...constants.fontCustom(constants.primaryLight, 11),
    color: "white",
    lineHeight: 14
  }
});

export default DayAheadBox;
