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
  return (
    <ScrollView style={styles.visaTabContainer}>
      <VisaProgressIndicator completed={3} totalSteps={5} />
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
