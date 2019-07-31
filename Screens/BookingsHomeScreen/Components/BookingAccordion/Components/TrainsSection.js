import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";

const TrainsSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((train, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Train
            key={index}
            navigation={navigation}
            train={train}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

TrainsSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Train = ({ train, isLast, navigation, spinValue }) => {
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
      type: constants.Bookings.type.trains
    });
    resolveLinks(false, false, {
      voucherType: constants.trainVoucherType,
      costingIdentifier: train.key
    });
  };

  const { pickupTime } = train.voucher;
  const { dateMillis } = train;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{ uri: constants.miscImageBaseUrl + "transfers-train.jpg" }}
      isProcessing={!train.voucher.booked}
      onClick={openVoucher}
      content={train.text}
      title={`${
        pickupTime && pickupTime > 1
          ? moment(pickupTime).format(constants.commonDateFormat)
          : dateMillis
            ? moment(dateMillis).format(constants.commonDateFormat)
            : moment(
                `${train.day}/${train.mon}/${constants.currentYear}`,
                "DD/MMM/YYYY"
              ).format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      isDataSkipped={_.get(train, "voucher.skipVoucher")}
      voucherTitle={_.get(train, "voucher.title")}
    />
  );
};

Train.propTypes = forbidExtraProps({
  train: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default TrainsSection;
