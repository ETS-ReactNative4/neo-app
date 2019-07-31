import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

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
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.rentalCars
    });
    resolveLinks(false, false, {
      voucherType: constants.rentalCarVoucherType,
      costingIdentifier: rentalCar.key
    });
  };

  const { pickup, drop } = rentalCar;

  const { pickupLocation, dropLocation } = rentalCar.voucher;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      sectionImage={{
        uri: getTransferImage(rentalCar.vehicle, rentalCar.type)
      }}
      containerStyle={customStyle}
      isProcessing={!rentalCar.voucher.booked}
      onClick={openVoucher}
      content={
        pickupLocation && dropLocation
          ? `${pickupLocation} to ${dropLocation}`
          : `${pickup} to ${drop}`
      }
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
      isDataSkipped={_.get(rentalCar, "voucher.skipVoucher")}
      voucherTitle={_.get(rentalCar, "voucher.title")}
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

export default RentalCarSection;
