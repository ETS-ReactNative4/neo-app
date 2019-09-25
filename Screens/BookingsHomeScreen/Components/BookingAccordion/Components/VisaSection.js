import React from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import * as VisaMobX from "../../../../../mobx/Visa";
import { observer, inject } from "mobx-react/custom";

const VisaSection = inject("visaStore")(
  observer(({ visaStore, section, navigation, spinValue }) => {
    const customStyle = {
      paddingBottom: 16
    };

    const { visaList, isSingleVisa, isVisaInitialized } = visaStore;

    const openVoucher = () => {
      recordEvent(constants.Bookings.event, {
        click: constants.Bookings.click.accordionVoucher,
        type: constants.Bookings.type.visa
      });
      VisaMobX.default.visaOpener({
        navigation,
        isVisaInitialized,
        isSingleVisa,
        visaList
      });
    };

    let content = "",
      title = "";

    if (visaList.length === 1) {
      title = visaList[0].visaStr;
      content = visaList[0].title;
    } else if (visaList.length > 1) {
      title = "MULTIPLE VISAS";
      content = `${visaList[0].title} & ${visaList.length - 1} more`;
    } else {
      title = "";
      content = "";
    }

    return (
      <View>
        <BookingSectionComponent
          spinValue={spinValue}
          containerStyle={customStyle}
          sectionImage={constants.visaThumbnailIllus}
          isProcessing={false}
          onClick={openVoucher}
          content={content}
          title={title}
          isImageContain={false}
        />

        {/* Old Visa Section data */}
        {/*{section.items.map((visa, index) => {*/}
        {/*  let isLast = index === section.items.length - 1;*/}

        {/*  return (*/}
        {/*    <Visa*/}
        {/*      key={index}*/}
        {/*      navigation={navigation}*/}
        {/*      visa={visa}*/}
        {/*      isLast={isLast}*/}
        {/*      spinValue={spinValue}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
      </View>
    );
  })
);

VisaSection.propTypes = {
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
};

const VisaComponent = inject("visaStore")(
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

VisaComponent.propTypes = forbidExtraProps({
  visa: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default VisaSection;
