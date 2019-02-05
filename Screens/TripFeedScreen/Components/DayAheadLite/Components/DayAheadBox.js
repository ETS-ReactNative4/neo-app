import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import constants from "../../../../../constants/constants";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const DayAheadBox = ({
  image,
  label,
  title,
  text,
  deepLink,
  voucherType,
  costingIdentifier,
  widgetName
}) => {
  return (
    <TouchableOpacity
      style={styles.dayAheadBoxTouchable}
      onPress={() => {
        recordEvent(widgetName);
        resolveLinks("", {}, deepLink || { voucherType, costingIdentifier });
      }}
      activeOpacity={0.7}
    >
      <View style={styles.dayAheadBoxContainer}>
        <Image
          source={image}
          style={styles.imageThumbnail}
          resizeMode={"cover"}
        />
        <View style={styles.textAreaWrapper}>
          <View style={styles.timeTextWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.nextText}
            >
              {`${label} `}
              <Text style={styles.timeText}>{title}</Text>
            </Text>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={styles.descriptionText}
          >
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

DayAheadBox.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  voucherType: PropTypes.string.isRequired,
  costingIdentifier: PropTypes.string.isRequired,
  deepLink: PropTypes.object,
  widgetName: PropTypes.string
});

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
