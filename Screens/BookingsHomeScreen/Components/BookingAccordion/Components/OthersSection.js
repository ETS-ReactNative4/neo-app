import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const OthersSection = ({
  containerStyle = StyleSheet.create({}),
  section = {},
  navigation,
  spinValue
}) => {
  return (
    <View style={[containerStyle, styles.othersSectionContainer]}>
      {section.items.map((customVoucher, customVoucherIndex) => {
        let isLast = customVoucherIndex === section.items.length - 1;

        return (
          <CustomVoucher
            key={customVoucherIndex}
            customVoucher={customVoucher}
            isLast={isLast}
            navigation={navigation}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

OthersSection.propTypes = {
  containerStyle: ViewPropTypes.style,
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  spinValue: PropTypes.object.isRequired
};

const CustomVoucher = ({
  containerStyle = StyleSheet.create({}),
  customVoucher = {},
  isLast,
  spinValue
}) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.customVouchers
    });
  };

  const { title } = customVoucher;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={[containerStyle, customStyle]}
      isProcessing={false}
      onClick={openVoucher}
      content={title}
      hideTitle={true}
      title={""}
      isImageContain={false}
      defaultSource={constants.passThumbPlaceholderIllus}
      sectionImage={constants.passThumbPlaceholderIllus}
      isDataSkipped={false}
    />
  );
};

CustomVoucher.propTypes = {
  containerStyle: ViewPropTypes.style,
  customVoucher: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object,
  spinValue: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  othersSectionContainer: {}
});

export default OthersSection;
