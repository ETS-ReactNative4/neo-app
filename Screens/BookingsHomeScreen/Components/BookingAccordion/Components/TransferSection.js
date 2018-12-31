import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
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
      defaultImageUri={constants.transferPlaceHolder}
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
    minHeight: 40,
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
    minHeight: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  }
});

export default TransferSection;
