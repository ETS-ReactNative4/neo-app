import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
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
            sectionImage={constants.splashBackground}
            isProcessing={false}
            onClick={openVoucher}
            content={`${insurance.plan} for ${passengerCount} person${
              passengerCount > 1 ? "s" : ""
            }`}
            title={countriesText}
            isImageContain={false}
            defaultImageUri={constants.transferPlaceHolder}
          />
        );

        return (
          <TouchableOpacity
            onPress={openVoucher}
            style={[styles.contentContainer, customStyle]}
          >
            <View style={styles.iconWrapper}>
              <CircleThumbnail
                isContain={false}
                containerStyle={styles.contentIcon}
                image={constants.splashBackground}
                defaultImageUri={constants.transferPlaceHolder}
              />
            </View>
            <View style={styles.contentTextContainer}>
              <View style={styles.contentHeaderWrapper}>
                <Text
                  style={styles.contentHeader}
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                >
                  {countriesText}
                </Text>
              </View>
              <View style={styles.contentTextWrapper}>
                <Text style={styles.contentText} numberOfLines={2}>
                  {`${insurance.plan} for ${passengerCount} person${
                    passengerCount > 1 ? "s" : ""
                  }`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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

export default InsuranceSection;
