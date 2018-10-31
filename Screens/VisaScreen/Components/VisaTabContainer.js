import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import VoucherSplitSection from "../../VoucherScreens/Components/VoucherSplitSection";
import HTMLView from "react-native-htmlview";
import constants from "../../../constants/constants";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import VisaProgressIndicator from "./VisaProgressIndicator/VisaProgressIndicator";

const VisaTabContainer = ({
  regionName,
  processingTime,
  applyByDate,
  visaName,
  onArrival,
  schengen,
  itineraryId,
  visaStatus,
  visaDetailText
}) => {
  const visaDetailsArray = [
    {
      name: "Document received",
      value: ""
    },
    {
      name: "Appointment Booked",
      value: ""
    },
    {
      name: "Final Document Review",
      value: ""
    },
    {
      name: "Visa Appointment",
      value: ""
    },
    {
      name: "Visa Issual",
      value: ""
    }
  ];

  return (
    <ScrollView style={styles.visaTabContainer}>
      <VisaProgressIndicator completed={3} totalSteps={5} />
      <VoucherSplitSection sections={visaDetailsArray} />
      <HTMLView
        style={styles.htmlViewContainer}
        addLineBreaks={false}
        value={visaDetailText}
        stylesheet={constants.htmlStyleSheet}
      />
      <XSensorPlaceholder />
    </ScrollView>
  );
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
