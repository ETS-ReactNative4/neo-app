import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import { toastBottom } from "../../../../../Services/toast/toast";

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
      toastBottom(constants.bookingProcessText.message);
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
      isImageContain={true}
      defaultImageUri={constants.transferPlaceHolder}
    />
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
