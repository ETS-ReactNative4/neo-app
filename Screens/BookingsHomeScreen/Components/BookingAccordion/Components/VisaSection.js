import React from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import * as VisaMobX from "../../../../../mobx/Visa";
import { observer, inject } from "mobx-react/custom";

const VisaSection = ({ section, navigation, spinValue }) => {
  return (
    <View>
      {section.items.map((visa, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Visa
            key={index}
            navigation={navigation}
            visa={visa}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

VisaSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Visa = inject("visaStore")(
  observer(({ visaStore, visa, isLast, navigation, spinValue }) => {
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
        type: constants.Bookings.type.visa
      });
      const { isVisaInitialized, isSingleVisa, visaList } = visaStore;
      VisaMobX.default.visaOpener({
        navigation,
        isVisaInitialized,
        isSingleVisa,
        visaList
      });
    };

    const isSchengen = visa.schengen;

    return (
      <BookingSectionComponent
        spinValue={spinValue}
        containerStyle={customStyle}
        sectionImage={constants.visaThumbnailIllus}
        isProcessing={false}
        onClick={openVoucher}
        content={visa.country}
        title={isSchengen ? "Schengen" : ""}
        isImageContain={false}
        hideTitle={!isSchengen}
      />
    );
  })
);

Visa.propTypes = forbidExtraProps({
  visa: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default VisaSection;
