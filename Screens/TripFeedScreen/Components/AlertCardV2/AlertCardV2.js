import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";
import VisaWidgetWavePattern from "../../../../CommonComponents/AlertWidgetPatterns/VisaWidgetWavePattern";

/**
 * Will be used to show alerts in the tripfeed
 * the pattern uses the react components from `AlertWidgetPatterns` directory.
 */
const AlertCardV2 = ({
  containerStyle = StyleSheet.create({}),
  title,
  message,
  link,
  tag,
  pattern,
  modalData = {},
  icon,
  highlightIcon = true,
  cta,
  backgroundColor = constants.fifteenthColor,
  widgetName,
  deepLink
}) => {
  const iconHighlightStyle = {
    backgroundColor: "rgba(255,255,255,0.2)"
  };
  const clickAction = () => {
    if (widgetName) {
      recordEvent(constants.TripFeed.event, {
        widget: widgetName
      });
    }
    resolveLinks(link, modalData, deepLink);
  };
  let PatternComponent = null;
  switch (pattern) {
    case "VISA_ALERT":
      PatternComponent = VisaWidgetWavePattern;
      break;

    default:
      PatternComponent = Fragment;
      break;
  }
  return (
    <TouchableOpacity
      onPress={clickAction}
      activeOpacity={0.8}
      style={[styles.alertCardV2Container, { backgroundColor }, containerStyle]}
    >
      <PatternComponent />
      {icon ? (
        <View
          style={[
            styles.iconContainer,
            highlightIcon ? iconHighlightStyle : null
          ]}
        >
          <Icon name={icon} size={18} color={"white"} />
        </View>
      ) : (
        <View />
      )}
      <View style={styles.textContainer}>
        {tag ? (
          <View style={styles.tagWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.tagText}
            >
              {tag}
            </Text>
          </View>
        ) : null}
        {title ? (
          <View style={styles.titleWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.titleText}
            >
              {title}
            </Text>
          </View>
        ) : null}
        {message ? (
          <View style={styles.messageWrapper}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}
        {cta ? (
          <View style={styles.ctaWrapper}>
            <SimpleButton
              color={"transparent"}
              text={cta}
              textColor={constants.secondColor}
              underlayColor={"transparent"}
              action={clickAction}
              containerStyle={{
                alignItems: "flex-start",
                justifyContent: "center",
                height: 16
              }}
              textStyle={{
                ...constants.fontCustom(constants.primarySemiBold, 12)
              }}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

AlertCardV2.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  message: PropTypes.string,
  link: PropTypes.string,
  tag: PropTypes.string,
  pattern: PropTypes.string,
  modalData: PropTypes.Object,
  icon: PropTypes.string,
  highlightIcon: PropTypes.string,
  cta: PropTypes.string,
  backgroundColor: PropTypes.string,
  widgetName: PropTypes.string,
  deepLink: PropTypes.Object
};

const styles = StyleSheet.create({
  alertCardV2Container: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 6
  },
  iconContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  textContainer: {},
  tagWrapper: {},
  tagText: {
    ...constants.fontCustom(constants.primarySemiBold, 11),
    color: "white",
    opacity: 0.5,
    width: responsiveWidth(70),
    marginBottom: 4
  },
  titleWrapper: {},
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: "white",
    width: responsiveWidth(70)
  },
  messageWrapper: {},
  messageText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 18),
    color: "white",
    width: responsiveWidth(70),
    marginBottom: 4
  },
  ctaWrapper: {}
});

export default AlertCardV2;
