import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import { toastBottom } from "../../../../../Services/toast/toast";

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
    if (ferry.voucher.booked) {
      recordEvent(constants.bookingsHomeAccordionFerriesVoucherClick);
      navigation.navigate("TransferVoucher", {
        transfer: { ...ferry, vehicle: "FERRY" }
      });
    } else {
      toastBottom(constants.bookingProcessText.message);
    }
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
      defaultImageUri={constants.transferPlaceHolder}
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

export default FerriesSection;
