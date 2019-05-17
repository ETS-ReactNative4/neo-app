import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import getLocaleString from "../../../../../Services/getLocaleString/getLocaleString";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PlatoPaymentsCard from "./PlatoPaymentsCard";
import VoucherSplitSection from "../../../../VoucherScreens/Components/VoucherSplitSection";

const PlatoPayments = ({
  platoPendingInstallments,
  platoBankDetails,
  openSupport
}) => {
  const contactSupport = () => openSupport();

  const pendingInstallments = platoPendingInstallments.map(payment => {
    const today = moment();
    const paymentDue = moment(payment.paymentDueTime);
    const isExpired = today.isAfter(paymentDue, "date");

    return {
      amount: getLocaleString(payment.amount),
      dueBy: paymentDue.format(constants.shortCommonDateFormat),
      isExpired,
      action: contactSupport
    };
  });
  return (
    <View>
      <Text style={styles.paymentTitle}>{`You have ${
        pendingInstallments.length
      } scheduled payments`}</Text>
      <PlatoPaymentsCard payments={pendingInstallments} />
      <Text style={styles.bankTitleText}>{`Bank Details`}</Text>
      <VoucherSplitSection
        containerStyle={{ marginHorizontal: 24 }}
        sections={platoBankDetails}
      />
    </View>
  );
};

PlatoPayments.propTypes = forbidExtraProps({
  platoPendingInstallments: PropTypes.array.isRequired,
  platoBankDetails: PropTypes.array.isRequired,
  openSupport: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  paymentTitle: {
    marginLeft: 24,
    marginTop: 32,
    marginBottom: 24,
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.black1
  },
  bankTitleText: {
    marginHorizontal: 24,
    marginTop: 32,
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.black1
  }
});

export default PlatoPayments;
