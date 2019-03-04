import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
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
    /**
     * Open customtab directly only when voucherUrl is available and it is a viator voucher
     */
    if (
      activity.voucher &&
      activity.voucher.voucherUrl &&
      activity.costing.viator
    ) {
      recordEvent(constants.bookingsHomeAccordionViatorActivitiesVoucherClick);
      if (Platform.OS === constants.platformIos) {
        openCustomTab(
          activity.voucher.voucherUrl,
          () => null,
          () => {
            logError("Unable to launch custom tab for viator voucher!", {});
          }
        );
      } else {
        navigation.navigate("PDFViewerScreen", {
          pdfUri: activity.voucher.voucherUrl
        });
      }
    } else if (activity.voucher.booked || activity.free) {
      recordEvent(constants.bookingsHomeAccordionActivitiesVoucherClick);
      navigation.navigate("ActivityVoucher", { activity });
    } else {
      recordEvent(
        constants.bookingsHomeAccordionProcessingActivitiesVoucherClick
      );
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
      defaultSource={constants.activityThumbPlaceholderIllus}
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

export default ActivitiesSection;
