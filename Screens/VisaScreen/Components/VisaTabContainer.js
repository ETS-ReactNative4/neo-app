import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import VoucherSplitSection from "../../VoucherScreens/Components/VoucherSplitSection";
import HTMLView from "react-native-htmlview";
import constants from "../../../constants/constants";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import VisaProgressIndicator from "./VisaProgressIndicator/VisaProgressIndicator";
import VisaActionBar from "./VisaActionBar";
import PropTypes from "prop-types";

const VisaTabContainer = ({
  regionName,
  processingTime,
  applyByDate,
  visaName,
  onArrival,
  schengen,
  itineraryId,
  visaStatus,
  navigation,
  visaDetailText
}) => {
  const visaDetailsArray = [
    //   {
    //     name: "Document received",
    //     value: ""
    //   },
    //   {
    //     name: "Appointment Booked",
    //     value: ""
    //   },
    //   {
    //     name: "Final Document Review",
    //     value: ""
    //   },
    //   {
    //     name: "Visa Appointment",
    //     value: ""
    //   },
    //   {
    //     name: "Visa Issual",
    //     value: ""
    //   }
  ];

  return [
    <ScrollView style={styles.visaTabContainer} key={0}>
      <VoucherSplitSection sections={visaDetailsArray} />
      <HTMLView
        style={styles.htmlViewContainer}
        addLineBreaks={true}
        paragraphBreak={null}
        lineBreak={"\n"}
        value={visaDetailText}
        stylesheet={{
          ...constants.htmlStyleSheet,
          p: {
            ...constants.htmlStyleSheet.p,
            marginBottom: 8,
            marginTop: 16
          }
        }}
      />
      <XSensorPlaceholder />
    </ScrollView>,
    <VisaActionBar
      isVisaOnArrival={onArrival}
      navigation={navigation}
      key={1}
    />
  ];
};

VisaTabContainer.propTypes = {
  visaDetailText: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  visaTabContainer: {
    paddingHorizontal: 24
  },
  htmlViewContainer: {
    marginTop: 16
  }
});

export default VisaTabContainer;
