import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

const MultiLineHeader = ({ duration, title, disableDropDown }) => {
  return (
    <View style={styles.bookingTitleView}>
      {duration ? (
        <View style={styles.durationTextWrapper}>
          <Text
            style={styles.duration}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {duration}
          </Text>
        </View>
      ) : null}
      <View style={styles.titleTextWrapper}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={"tail"}>
          {title}
        </Text>
        {!disableDropDown ? (
          <Image
            resizeMode={"contain"}
            style={[
              styles.dropDownIcon,
              duration && Platform.OS === "ios" ? { marginTop: 8 } : {}
            ]}
            source={constants.dropDownArrow}
          />
        ) : null}
      </View>
    </View>
  );
};

MultiLineHeader.propTypes = {
  duration: PropTypes.string,
  title: PropTypes.string.isRequired,
  disableDropDown: PropTypes.bool
};

const styles = StyleSheet.create({
  bookingTitleView: {
    flex: 1,
    alignItems: "center",
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
    color: constants.black2,
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
    color: constants.black2
  },
  dropDownIcon: {
    height: 8,
    width: 8,
    marginLeft: 4,
    marginTop: 4
  }
});

export default MultiLineHeader;
