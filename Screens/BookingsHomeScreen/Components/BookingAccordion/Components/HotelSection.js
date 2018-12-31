import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import storeService from "../../../../../Services/storeService/storeService";
import SectionRightPlaceHolder from "./Components/SectionRightPlaceHolder";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { toastBottom } from "../../../../../Services/toast/toast";

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
    if (hotel.voucher.booked) {
      recordEvent(constants.bookingsHomeAccordionHotelsVoucherClick);
      navigation.navigate("HotelVoucher", { hotel });
    } else {
      toastBottom(constants.bookingProcessText.message);
      // storeService.infoStore.setInfo(
      //   constants.bookingProcessText.title,
      //   constants.bookingProcessText.message,
      //   constants.bookingProcessingIcon,
      //   constants.bookingProcessText.actionText
      // );
    }
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
      defaultImageUri={constants.hotelSmallPlaceHolder}
      sectionImage={{ uri: hotel.imageURL }}
    />
  );

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <CircleThumbnail
          containerStyle={styles.contentIcon}
          image={{ uri: hotel.imageURL }}
          defaultImageUri={constants.hotelSmallPlaceHolder}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>
            {hotel.voucher.checkInDate
              ? moment(hotel.voucher.checkInDate, "YYYY-MM-DD").format(
                  constants.commonDateFormat
                )
              : moment(hotel.checkInDate, "DD/MMM/YYYY").format(
                  constants.commonDateFormat
                )}
          </Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={1}>
            {getTitleCase(hotel.name)}
          </Text>
        </View>
      </View>
      <SectionRightPlaceHolder isProcessing={!hotel.voucher.booked} />
    </TouchableOpacity>
  );
};

Hotel.propTypes = forbidExtraProps({
  hotel: PropTypes.object.isRequired,
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
    height: 40,
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
    height: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  }
});

export default HotelSection;
