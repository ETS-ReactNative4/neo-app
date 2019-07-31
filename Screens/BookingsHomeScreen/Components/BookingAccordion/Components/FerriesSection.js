import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";

const FerriesSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((ferry, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Ferry
            key={index}
            navigation={navigation}
            ferry={ferry}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

FerriesSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Ferry = ({ ferry, isLast, navigation, spinValue }) => {
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
      type: constants.Bookings.type.ferries
    });
    resolveLinks(false, false, {
      voucherType: constants.ferryVoucherType,
      costingIdentifier: ferry.key
    });
  };

  const { pickupTime } = ferry.voucher;
  const { dateMillis } = ferry;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      sectionImage={{ uri: getTransferImage("FERRY") }}
      containerStyle={customStyle}
      isProcessing={!ferry.voucher.booked}
      onClick={openVoucher}
      content={ferry.text}
      title={`${
        pickupTime && pickupTime > 1
          ? moment(pickupTime).format(constants.commonDateFormat)
          : dateMillis
            ? moment(dateMillis).format(constants.commonDateFormat)
            : moment(
                `${ferry.day}/${ferry.mon}/${constants.currentYear}`,
                "DD/MMM/YYYY"
              ).format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      isDataSkipped={_.get(ferry, "voucher.skipVoucher")}
      voucherTitle={_.get(ferry, "voucher.title")}
    />
  );
};

Ferry.propTypes = forbidExtraProps({
  ferry: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default FerriesSection;
