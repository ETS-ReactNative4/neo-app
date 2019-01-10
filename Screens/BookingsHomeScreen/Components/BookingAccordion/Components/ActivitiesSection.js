import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import _ from "lodash";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import { logError } from "../../../../../Services/errorLogger/errorLogger";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { toastBottom } from "../../../../../Services/toast/toast";
import openCustomTab from "../../../../../Services/openCustomTab/openCustomTab";

const ActivitiesSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((activity, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Activities
            key={index}
            navigation={navigation}
            activity={activity}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

ActivitiesSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Activities = ({ activity, isLast, navigation, spinValue }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    if (activity.voucher && activity.voucher.voucherUrl) {
      /**
       * TODO: Track this click event
       */
      openCustomTab(
        activity.voucher.voucherUrl,
        () => null,
        () => {
          logError("Unable to launch custom tab for viator voucher!", {});
        }
      );
    } else if (activity.voucher.booked || activity.free) {
      recordEvent(constants.bookingsHomeAccordionActivitiesVoucherClick);
      navigation.navigate("ActivityVoucher", { activity });
    } else {
      toastBottom(constants.bookingProcessText.message);
    }
  };

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{
        uri: activity.mainPhoto
      }}
      isProcessing={!(activity.voucher.booked || activity.free)}
      onClick={openVoucher}
      content={getTitleCase(activity.title)}
      title={`${
        activity.voucher.activityTime && activity.voucher.activityTime > 1
          ? moment(activity.voucher.activityTime).format(
              constants.commonDateFormat
            )
          : activity.costing.dateMillis
            ? moment(activity.costing.dateMillis).format(
                constants.commonDateFormat
              )
            : moment(
                `${activity.costing.day}/${activity.costing.mon}/${
                  constants.currentYear
                }`,
                "DD/MMM/YYYY"
              ).format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      defaultImageUri={_.sample([
        constants.activitySmallPlaceHolder,
        constants.activity2SmallPlaceHolder,
        constants.activity3SmallPlaceHolder
      ])}
    />
  );
};

Activities.propTypes = forbidExtraProps({
  activity: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

/**
 * TODO: Fix Line Height for the header and content
 */
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    borderBottomColor: constants.shade4,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    height: 40,
    marginLeft: 16
  },
  contentHeaderWrapper: {
    height: 16,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 14,
    color: constants.shade2
  },
  contentTextWrapper: {
    height: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  }
});

export default ActivitiesSection;
