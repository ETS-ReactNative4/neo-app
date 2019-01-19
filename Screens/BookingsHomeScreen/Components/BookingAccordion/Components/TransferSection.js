import React from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import _ from "lodash";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import { toastBottom } from "../../../../../Services/toast/toast";

const TransferSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((transfer, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Transfer
            key={index}
            navigation={navigation}
            transfer={transfer}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

TransferSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Transfer = ({ transfer, isLast, navigation, spinValue }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    if (transfer.voucher.booked) {
      recordEvent(constants.bookingsHomeAccordionTransfersVoucherClick);
      navigation.navigate("TransferVoucher", { transfer });
    } else {
      toastBottom(constants.bookingProcessText.message);
    }
  };

  const { pickupTime } = transfer.voucher;
  const { dateMillis } = transfer;

  const vehicle = _.toUpper(transfer.vehicle);
  const transferType = _.toUpper(transfer.type);

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{ uri: getTransferImage(vehicle, transferType) }}
      isProcessing={!transfer.voucher.booked}
      onClick={openVoucher}
      content={transfer.text}
      title={`${moment(
        pickupTime && pickupTime > 1 ? pickupTime : dateMillis
      ).format(constants.commonDateFormat)}`}
      isImageContain={
        vehicle === "CAR" || vehicle === "BUS" || vehicle === "SHUTTLE"
          ? true
          : false
      }
    />
  );
};

Transfer.propTypes = forbidExtraProps({
  transfer: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default TransferSection;
