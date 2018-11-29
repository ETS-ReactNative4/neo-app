import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import constants from "../../../../../constants/constants";
import FastImage from "react-native-fast-image";
import UpcomingBadge from "./UpcomingBadge";
import SmartImage from "../../../../../CommonComponents/SmartImage/SmartImage";

const DayAheadBox = () => {
  return (
    <TouchableOpacity
      style={styles.dayAheadBoxTouchable}
      onPress={() => null}
      activeOpacity={0.7}
    >
      <View style={styles.dayAheadBoxContainer}>
        <SmartImage
          style={styles.imageThumbnail}
          defaultImageUri={constants.activity2MediumPlaceHolder}
          uri={
            "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
          }
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textAreaWrapper}>
          <View style={styles.timeTextWrapper}>
            <Text style={styles.nextText}>
              {"NEXT: "}
              <Text style={styles.timeText}>{"8:00am - 12:00pm"}</Text>
            </Text>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={styles.descriptionText}
          >
            {
              "City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer"
            }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayAheadBoxTouchable: {
    backgroundColor: "white",
    ...constants.elevationFive,
    height: 64,
    width: 200,
    borderRadius: 32.5,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  dayAheadBoxContainer: {
    height: 64,
    width: 200,
    borderRadius: 32.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imageThumbnail: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: 8
  },
  textAreaWrapper: {},
  timeTextWrapper: {
    marginTop: 6
  },
  nextText: {
    ...constants.fontCustom(constants.primarySemiBold, 11),
    color: constants.seventhColor
  },
  timeText: {
    color: constants.firstColor
  },
  descriptionText: {
    ...constants.fontCustom(constants.primaryLight, 11),
    color: constants.black1,
    lineHeight: 14,
    width: 128
  }
});

export default DayAheadBox;
