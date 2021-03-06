import React from "react";
import { View, StyleSheet, Text } from "react-native";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import VoucherSplitSection from "../../VoucherScreens/Components/VoucherSplitSection";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

/**
 * Displays Submitted info for the user after he has requested the quote
 */
const ForexSubmittedInfo = ({ opportunityId, submittedData }) => {
  const splitSectionData = [
    {
      name: "Name",
      value: submittedData.name || ""
    },
    {
      name: "Email",
      value: submittedData.email || ""
    },
    {
      name: "Mobile",
      value: submittedData.mobileNumber || ""
    },
    {
      name: "Product",
      value: getTitleCase(submittedData.forexType) || ""
    },
    {
      name: "Amount",
      value:
        submittedData.requiredCurrency && submittedData.amount
          ? `${submittedData.requiredCurrency} ${submittedData.amount}`
          : ""
    }
  ];
  return (
    <View style={styles.forexSubmittedInfoContainer}>
      <SectionHeader sectionName={"Information Sent"} />
      <VoucherSplitSection sections={splitSectionData} />
      <Text style={styles.submittedText}>
        {constants.forexText.forexSubmittedText}
      </Text>
      <Text style={styles.infoText}>
        {constants.forexText.requestIdInfoText}
      </Text>
      <Text style={styles.opportunityIdText}>{opportunityId}</Text>
    </View>
  );
};

ForexSubmittedInfo.propTypes = forbidExtraProps({
  opportunityId: PropTypes.string.isRequired,
  submittedData: PropTypes.object.isRequired
});

const styles = StyleSheet.create({
  forexSubmittedInfoContainer: {
    marginHorizontal: 24
  },
  submittedText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 20),
    color: constants.shade1,
    marginTop: 24
  },
  infoText: {
    marginTop: 24,
    ...constants.fontCustom(constants.primaryRegular, 15, 20),
    color: constants.shade1
  },
  opportunityIdText: {
    ...constants.font30(constants.primarySemiBold),
    color: constants.seventhColor
  }
});

export default ForexSubmittedInfo;
