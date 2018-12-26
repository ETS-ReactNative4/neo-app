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
import BookingSectionComponent from "./Components/BookingSectionComponent";

const RentalCarSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((rentalCar, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <RentalCar
            key={index}
            navigation={navigation}
            rentalCar={rentalCar}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

RentalCarSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const RentalCar = ({ rentalCar, isLast, navigation, spinValue }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }
  rentalCar.vehicle = "Rental Car";

  const openVoucher = () => {
    if (rentalCar.voucher.booked) {
      navigation.navigate("TransferVoucher", { transfer: rentalCar });
    } else {
      storeService.infoStore.setInfo(
        constants.bookingProcessText.title,
        constants.bookingProcessText.message,
        constants.bookingProcessingIcon,
        constants.bookingProcessText.actionText
      );
    }
  };

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      sectionImage={{
        uri: getTransferImage(rentalCar.vehicle, rentalCar.type)
      }}
      containerStyle={customStyle}
      isProcessing={!rentalCar.voucher.booked}
      onClick={openVoucher}
      content={rentalCar.pickup + " to " + rentalCar.drop}
      title={`${
        rentalCar.voucher.pickupTime && rentalCar.voucher.pickupTime > 0
          ? moment(rentalCar.voucher.pickupTime).format(
              constants.commonDateFormat
            )
          : rentalCar.pDateMillis && rentalCar.pDateMillis > 0
            ? moment(rentalCar.pDateMillis).format(constants.commonDateFormat)
            : moment(
                `${rentalCar.day}/${rentalCar.mon}/${constants.currentYear}`,
                "DD/MMM/YYYY"
              ).format(constants.commonDateFormat)
      }`}
      isImageContain={false}
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
          isContain={rentalCar.vehicle !== "Train"}
          containerStyle={styles.contentIcon}
          image={{ uri: getTransferImage(rentalCar.vehicle, rentalCar.type) }}
          defaultImageUri={constants.transferPlaceHolder}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${
            rentalCar.voucher.pickupTime && rentalCar.voucher.pickupTime > 0
              ? moment(rentalCar.voucher.pickupTime).format(
                  constants.commonDateFormat
                )
              : rentalCar.pDateMillis && rentalCar.pDateMillis > 0
                ? moment(rentalCar.pDateMillis).format(
                    constants.commonDateFormat
                  )
                : moment(
                    `${rentalCar.day}/${rentalCar.mon}/${
                      constants.currentYear
                    }`,
                    "DD/MMM/YYYY"
                  ).format(constants.commonDateFormat)
          }`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {rentalCar.pickup + " to " + rentalCar.drop}
          </Text>
        </View>
      </View>
      <SectionRightPlaceHolder isProcessing={!rentalCar.voucher.booked} />
    </TouchableOpacity>
  );
};

RentalCar.propTypes = forbidExtraProps({
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

export default RentalCarSection;
