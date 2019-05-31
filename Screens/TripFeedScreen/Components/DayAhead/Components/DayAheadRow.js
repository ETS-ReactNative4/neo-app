import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import UpcomingBadge from "./UpcomingBadge";
import { responsiveWidth } from "react-native-responsive-dimensions";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const DayAheadRow = ({
  image,
  label,
  title,
  text,
  deepLink,
  voucherType,
  costingIdentifier,
  isLast,
  widgetName,
  link = "",
  modalData = {}
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (widgetName) recordEvent(widgetName);
        resolveLinks(
          link,
          modalData,
          deepLink || { voucherType, costingIdentifier }
        );
      }}
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
        <Image source={image} style={styles.image} resizeMode={"cover"} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerTextWrapper}>
          <UpcomingBadge text={label} containerStyle={{ marginRight: 8 }} />
          <View style={styles.headerTimeTextWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.headerTimeText}
            >
              {title}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionTextWrapper}>
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

DayAheadRow.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  voucherType: PropTypes.string.isRequired,
  costingIdentifier: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  deepLink: PropTypes.object,
  widgetName: PropTypes.string,
  link: PropTypes.string,
  modalData: PropTypes.object
});

const styles = StyleSheet.create({
  dayAheadRowContainer: {
    height: 80,
    flexDirection: "row"
  },
  imageContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 8,
    marginLeft: 12,
    marginTop: 16,
    marginBottom: 8
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  textContainer: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  headerTextWrapper: {
    flexDirection: "row"
  },
  headerTimeTextWrapper: {
    height: 16,
    justifyContent: "flex-start"
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
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1
  }
});

export default DayAheadRow;
