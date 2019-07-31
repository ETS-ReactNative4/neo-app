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

const HotelSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((hotel, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Hotel
            key={index}
            hotel={hotel}
            isLast={isLast}
            navigation={navigation}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

HotelSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Hotel = ({ hotel, isLast, navigation, spinValue }) => {
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
      type: constants.Bookings.type.hotels
    });
    resolveLinks(false, false, {
      voucherType: constants.hotelVoucherType,
      costingIdentifier: hotel.costingKey
    });
  };

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      isProcessing={!hotel.voucher.booked}
      onClick={openVoucher}
      content={getTitleCase(hotel.name)}
      title={
        hotel.voucher.checkInDate
          ? moment(hotel.voucher.checkInDate, "YYYY-MM-DD").format(
              constants.commonDateFormat
            )
          : moment(hotel.checkInDate, "DD/MMM/YYYY").format(
              constants.commonDateFormat
            )
      }
      isImageContain={false}
      defaultSource={constants.hotelThumbPlaceholderIllus}
      sectionImage={{ uri: hotel.imageURL }}
      isDataSkipped={_.get(hotel, "voucher.skipVoucher")}
      voucherTitle={_.get(hotel, "voucher.title")}
    />
  );
};

Hotel.propTypes = forbidExtraProps({
  hotel: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default HotelSection;
