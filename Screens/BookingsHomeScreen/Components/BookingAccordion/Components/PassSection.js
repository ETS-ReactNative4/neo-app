import React from "react";
import { View } from "react-native";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const PassSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((pass, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Pass
            key={index}
            pass={pass}
            isLast={isLast}
            navigation={navigation}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

PassSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Pass = ({ pass, isLast, navigation, spinValue }) => {
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
      type: constants.Bookings.type.passes
    });
    navigation.navigate("PassVoucher", { pass });
  };

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{ uri: pass.image }}
      isProcessing={false}
      onClick={openVoucher}
      content={pass.name}
      title={moment(pass.start, "DD/MMM/YYYY").format(
        constants.commonDateFormat
      )}
      isImageContain={false}
      defaultSource={constants.passThumbPlaceholderIllus}
    />
  );
};

Pass.propTypes = forbidExtraProps({
  pass: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default PassSection;
