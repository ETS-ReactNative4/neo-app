import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "./Components/BookingSectionComponent";

const VisaSection = ({ section, navigation }) => {
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
          />
        );
      })}
    </View>
  );
};

VisaSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
});

const Visa = ({ visa, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.bookingsHomeAccordionVisaVoucherClick);
    navigation.navigate("VisaBooked", {
      country: visa.country
    });
  };

  const isSchengen = visa.schengen;

  return (
    <BookingSectionComponent
      containerStyle={customStyle}
      sectionImage={constants.splashBackground}
      isProcessing={false}
      onClick={openVoucher}
      content={visa.country}
      title={isSchengen ? "Schengen" : ""}
      isImageContain={false}
      defaultImageUri={constants.transferPlaceHolder}
      hideTitle={!isSchengen}
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
        {isSchengen ? (
          <View style={styles.contentHeaderWrapper}>
            <Text style={styles.contentHeader}>{"Schengen"}</Text>
          </View>
        ) : null}
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {visa.country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Visa.propTypes = forbidExtraProps({
  visa: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
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

export default VisaSection;
