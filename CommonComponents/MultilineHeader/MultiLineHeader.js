import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

const MultiLineHeader = ({ duration, title }) => {
  return (
    <View style={styles.bookingTitleView}>
      <View style={styles.durationTextWrapper}>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <View style={styles.titleTextWrapper}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dropDownIconContainer}>
          <Image
            resizeMode={"contain"}
            style={styles.dropDownIcon}
            source={constants.dropDownArrow}
          />
        </View>
      </View>
    </View>
  );
};

MultiLineHeader.propTypes = {
  duration: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  bookingTitleView: {
    flex: 1,
    justifyContent: "center"
  },
  durationTextWrapper: {
    height: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  duration: {
    fontFamily: constants.primaryLight,
    fontSize: 12,
    ...Platform.select({
      ios: {
        marginBottom: -8
      }
    })
  },
  titleTextWrapper: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: constants.primarySemiBold,
    fontSize: 16,
    ...Platform.select({
      ios: {
        marginTop: -8
      }
    })
  },
  dropDownIconContainer: {
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  dropDownIcon: {
    height: 8,
    width: 8,
    marginLeft: 4,
    ...Platform.select({
      android: {
        marginBottom: -8
      }
    })
  }
});

export default MultiLineHeader;
