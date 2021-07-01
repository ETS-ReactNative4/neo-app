import React from "react";
import {
  Text,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import LinearGradient from "react-native-linear-gradient";
import SmartImageV2 from "../../../../../CommonComponents/SmartImage/SmartImageV2";

const ExpandedView = ({
  coverImage,
  title,
  desc,
  isHidden,
  journalOwner,
  journalPublishedTime,
  editAction,
  journalCreatedTime,
  isJournalPublished
}) => {
  return (
    <SmartImageV2
      source={coverImage}
      resizeMode={"cover"}
      style={isHidden ? styles.hidden : styles.expandedViewContainer}
      useFastImage={true}
    >
      <LinearGradient
        locations={[0.1, 0.2, 0.8, 1]}
        colors={[
          constants.darkGradientAlpha(0.6),
          constants.darkGradientAlpha(0),
          constants.darkGradientAlpha(0),
          constants.darkGradientAlpha(0.6)
        ]}
        style={styles.gradientView}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.editTouchableContainer}
          onPress={editAction}
        >
          <View style={styles.editIconContainer}>
            <Icon name={constants.editIcon} size={16} color={"white"} />
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.authorInfo}>{`By ${journalOwner}${
            isJournalPublished
              ? `, ${journalPublishedTime}`
              : `, ${journalCreatedTime}`
          }`}</Text>
          <Text style={styles.descText}>{desc}</Text>
        </View>
      </LinearGradient>
    </SmartImageV2>
  );
};

ExpandedView.propTypes = forbidExtraProps({
  coverImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  journalOwner: PropTypes.string.isRequired,
  journalPublishedTime: PropTypes.string,
  editAction: PropTypes.func.isRequired,
  journalCreatedTime: PropTypes.string.isRequired,
  isJournalPublished: PropTypes.bool.isRequired
});

const headerHeight = constants.headerHeight;
const tabBarHeight = 50;

const androidStatusBarHeight =
  Platform.OS === constants.platformAndroid ? StatusBar.currentHeight : 0;

const xNotchHeight = constants.xNotchHeight;
const xSensorAreaHeight = constants.xSensorAreaHeight;
const xArea = isIphoneX() ? xNotchHeight + xSensorAreaHeight : 0;

const availableAreaHeight =
  responsiveHeight(100) -
  tabBarHeight -
  headerHeight -
  xArea -
  androidStatusBarHeight;

const styles = StyleSheet.create({
  hidden: {
    height: 0,
    width: responsiveWidth(100)
  },
  expandedViewContainer: {
    justifyContent: "space-between",
    height: availableAreaHeight,
    width: responsiveWidth(100)
  },
  gradientView: {
    flex: 1,
    justifyContent: "space-between"
  },
  textContainer: {
    marginHorizontal: 24
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 24, 28),
    color: "white",
    marginBottom: 12
  },
  authorInfo: {
    ...constants.fontCustom(constants.primarySemiBold, 12, 12),
    color: "white",
    marginBottom: 24
  },
  descText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 26),
    color: "white",
    marginBottom: 32
  },
  editTouchableContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    margin: 24
  },
  editIconContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `rgba(0,0,0,0.6)`
  }
});

export default ExpandedView;
