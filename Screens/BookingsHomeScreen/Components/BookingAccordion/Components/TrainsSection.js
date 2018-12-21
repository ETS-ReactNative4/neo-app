import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import storeService from "../../../../../Services/storeService/storeService";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import SectionRightPlaceHolder from "./Components/SectionRightPlaceHolder";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "./Components/BookingSectionComponent";

const TrainsSection = ({ section, navigation }) => {
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
          />
        );
      })}
    </View>
  );
};

TrainsSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
});

const Train = ({ train, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    if (train.voucher.booked) {
      recordEvent(constants.bookingsHomeAccordionTrainsVoucherClick);
      navigation.navigate("TransferVoucher", {
        transfer: { ...train, vehicle: "TRAIN" }
      });
    } else {
      storeService.infoStore.setInfo(
        constants.bookingProcessText.title,
        constants.bookingProcessText.message,
        constants.bookingProcessingIcon,
        constants.bookingProcessText.actionText
      );
    }
  };

  const { pickupTime } = train.voucher;
  const { dateMillis } = train;

  return (
    <BookingSectionComponent
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
      defaultImageUri={constants.miscImageBaseUrl + "transfers-train.jpg"}
    />
  );

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <CircleThumbnail
          isContain={false}
          containerStyle={styles.contentIcon}
          image={{ uri: constants.miscImageBaseUrl + "transfers-train.jpg" }}
          defaultImageUri={constants.miscImageBaseUrl + "transfers-train.jpg"}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${
            pickupTime && pickupTime > 1
              ? moment(pickupTime).format(constants.commonDateFormat)
              : dateMillis
                ? moment(dateMillis).format(constants.commonDateFormat)
                : moment(
                    `${train.day}/${train.mon}/${constants.currentYear}`,
                    "DD/MMM/YYYY"
                  ).format(constants.commonDateFormat)
          }`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {train.text}
          </Text>
        </View>
      </View>
      <SectionRightPlaceHolder isProcessing={!train.voucher.booked} />
    </TouchableOpacity>
  );
};

Train.propTypes = forbidExtraProps({
  train: PropTypes.object.isRequired,
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
  },
  rightPlaceholder: {
    flex: 1,
    alignItems: "flex-end"
  },
  rightPlaceholderText: {
    fontFamily: constants.primaryLight,
    fontSize: 10,
    color: constants.black2
  }
});

export default TrainsSection;
