import React from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import storeService from "../../../../../Services/storeService/storeService";
import { inject, observer } from "mobx-react/custom";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";

const { insuranceComingSoonText } = constants;

const InsuranceSection = ({ section: insurance, navigation, spinValue }) => {
  return (
    <View>
      <Insurance
        navigation={navigation}
        insurance={insurance.items}
        isLast={true}
        spinValue={spinValue}
      />
    </View>
  );
};

InsuranceSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Insurance = inject("passportDetailsStore")(
  inject("itineraries")(
    observer(
      ({
        passportDetailsStore,
        itineraries,
        insurance,
        isLast,
        navigation,
        spinValue
      }) => {
        const { countries } = itineraries;
        const { passengerCount } = passportDetailsStore;

        const countriesText = countries.reduce((countryText, country) => {
          if (!countryText) return country.name;
          countryText += `, ${country.name}`;
          return countryText;
        }, "");

        let customStyle = {};
        if (isLast) {
          customStyle = {
            // borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 16
          };
        }

        const openVoucher = () => {
          recordEvent(constants.bookingsHomeAccordionInsuranceVoucherClick);
          storeService.infoStore.setInfo(
            insuranceComingSoonText.title,
            insuranceComingSoonText.message,
            constants.infoBoxIllus,
            insuranceComingSoonText.actionText
          );
        };

        return (
          <BookingSectionComponent
            spinValue={spinValue}
            containerStyle={customStyle}
            sectionImage={constants.insuranceThumbnailIllus}
            isProcessing={false}
            onClick={openVoucher}
            content={`${insurance.plan} for ${passengerCount} person${
              passengerCount > 1 ? "s" : ""
            }`}
            title={countriesText}
            isImageContain={false}
          />
        );
      }
    )
  )
);

Insurance.propTypes = forbidExtraProps({
  insurance: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default InsuranceSection;
