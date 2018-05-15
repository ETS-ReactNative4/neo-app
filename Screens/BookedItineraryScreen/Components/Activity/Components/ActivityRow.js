import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ActivityRow = ({ title, text }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoTitleWrapper}>
        <Text style={styles.infoTitle} numberOfLines={1} ellipsizeMode={"tail"}>
          {title}
        </Text>
        <Image
          source={constants.notificationIcon}
          style={styles.titleIcon}
          resizeMode={"contain"}
        />
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoText} numberOfLines={3} ellipsizeMode={"tail"}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginLeft: 8
  },
  infoTitleWrapper: {
    height: 24,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  infoTitle: {
    fontFamily: constants.primaryLight,
    color: constants.shade2,
    fontSize: 14
  },
  titleIcon: {
    height: 18,
    width: 18
  },
  infoTextWrapper: {
    minHeight: 24,
    width: responsiveWidth(75)
  },
  infoText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    lineHeight: 20,
    color: constants.black1,
    marginTop: -6
  }
});

export default ActivityRow;
