import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";

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
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.activities
    });
    resolveLinks(false, false, {
      voucherType: constants.activityVoucherType,
      costingIdentifier: activity.costing.key
    });
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
      isDataSkipped={_.get(activity, "voucher.skipVoucher")}
      voucherTitle={_.get(activity, "voucher.title")}
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
