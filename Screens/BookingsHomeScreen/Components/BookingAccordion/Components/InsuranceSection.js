import React from "react";
import { View } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import storeService from "../../../../../Services/storeService/storeService";
import { inject, observer } from "mobx-react/custom";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import openCustomTab from "../../../../../Services/openCustomTab/openCustomTab";
import { toastBottom } from "../../../../../Services/toast/toast";

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
          recordEvent(constants.Bookings.event, {
            click: constants.Bookings.click.accordionVoucher,
            type: constants.Bookings.type.insurance
          });
          if (insurance.voucher && insurance.voucher.voucherUrl) {
            openCustomTab(insurance.voucher.voucherUrl);
          } else {
            /**
             * TODO: Use toast bottom instead of this info modal after insurance is implemented in plato
             */
            storeService.infoStore.setInfo(
              insuranceComingSoonText.title,
              insuranceComingSoonText.message,
              constants.infoBoxIllus,
              insuranceComingSoonText.actionText
            );
            // toastBottom(constants.bookingProcessText.message);
          }
        };

        return (
          <BookingSectionComponent
            spinValue={spinValue}
            containerStyle={customStyle}
            sectionImage={constants.insuranceThumbnailIllus}
            isProcessing={!(insurance.voucher && insurance.voucher.voucherUrl)}
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
