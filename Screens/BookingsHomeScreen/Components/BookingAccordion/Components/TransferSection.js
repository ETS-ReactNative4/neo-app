import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import _ from "lodash";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import storeService from "../../../../../Services/storeService/storeService";
import SectionRightPlaceHolder from "./Components/SectionRightPlaceHolder";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "./Components/BookingSectionComponent";

const TransferSection = ({ section, navigation }) => {
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
          />
        );
      })}
    </View>
  );
};

TransferSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
});

const Transfer = ({ transfer, isLast, navigation }) => {
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
      storeService.infoStore.setInfo(
        constants.bookingProcessText.title,
        constants.bookingProcessText.message,
        constants.bookingProcessingIcon,
        constants.bookingProcessText.actionText
      );
    }
  };

  const { pickupTime } = transfer.voucher;
  const { dateMillis } = transfer;

  const vehicle = _.toUpper(transfer.vehicle);
  const transferType = _.toUpper(transfer.type);

  return (
    <BookingSectionComponent
      containerStyle={customStyle}
      sectionImage={{ uri: getTransferImage(vehicle, transferType) }}
      isProcessing={!transfer.voucher.booked}
      onClick={openVoucher}
      content={transfer.text}
      title={`${moment(
        pickupTime && pickupTime > 1 ? pickupTime : dateMillis
      ).format(constants.commonDateFormat)}`}
      isImageContain={
        vehicle === "CAR" && transferType === "PRIVATE"
          ? true
          : vehicle === "BUS" || vehicle === "SHUTTLE"
            ? true
            : false
      }
      defaultImageUri={constants.transferPlaceHolder}
    />
  );

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <CircleThumbnail
          isContain={transfer.vehicle !== "Train"}
          containerStyle={styles.contentIcon}
          image={{ uri: getTransferImage(transfer.vehicle, transfer.type) }}
          defaultImageUri={constants.transferPlaceHolder}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${moment(
            pickupTime && pickupTime > 1 ? pickupTime : dateMillis
          ).format(constants.commonDateFormat)}`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {transfer.text}
          </Text>
        </View>
      </View>
      <SectionRightPlaceHolder isProcessing={!transfer.voucher.booked} />
    </TouchableOpacity>
  );
};

Transfer.propTypes = forbidExtraProps({
  transfer: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
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
