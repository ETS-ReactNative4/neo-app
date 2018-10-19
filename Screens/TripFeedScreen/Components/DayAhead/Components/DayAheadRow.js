import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import FastImage from "react-native-fast-image";
import UpcomingBadge from "./UpcomingBadge";
import { responsiveWidth } from "react-native-responsive-dimensions";

const DayAheadRow = ({ isLast }) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayAheadRowContainer,
        !isLast
          ? {
              borderBottomColor: constants.shade3,
              borderBottomWidth: StyleSheet.hairlineWidth
            }
          : null
      ]}
    >
      <View style={styles.imageContainer}>
        <FastImage source={constants.splashBackground} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerTextWrapper}>
          <UpcomingBadge containerStyle={{ marginRight: 8 }} />
          <View style={styles.headerTimeTextWrapper}>
            <Text style={styles.headerTimeText}>{"8:00am Pick up"}</Text>
          </View>
        </View>
        <View style={styles.descriptionTextWrapper}>
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={styles.descriptionText}
          >{`City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

DayAheadRow.propTypes = {
  isLast: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  dayAheadRowContainer: {
    height: 80,
    flexDirection: "row"
  },
  imageContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginLeft: 12
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  headerTextWrapper: {
    flexDirection: "row"
  },
  headerTimeTextWrapper: {
    height: 16,
    justifyContent: "center"
  },
  headerTimeText: {
    color: constants.shade2,
    ...constants.fontCustom(constants.primaryLight, 14),
    ...Platform.select({
      ios: {
        marginTop: 2
      },
      android: {
        marginTop: 1
      }
    })
  },
  descriptionTextWrapper: {
    width: responsiveWidth(100) - (24 + 24 + 8 + 12 + 40 + 8),
    marginTop: 4
  },
  descriptionText: {
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.black1
  }
});

export default DayAheadRow;
