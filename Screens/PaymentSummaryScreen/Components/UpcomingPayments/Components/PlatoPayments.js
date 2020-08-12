import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import getLocaleString, {
  getLocaleStringGlobal
} from "../../../../../Services/getLocaleString/getLocaleString";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PlatoPaymentsCard from "./PlatoPaymentsCard";
import VoucherSplitSection from "../../../../VoucherScreens/Components/VoucherSplitSection";
import ordinalConverter from "number-to-words";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import ConditionsApplyText from "../../../../VoucherScreens/Components/ConditionsApplyText";

/**
 * Will render all the upcoming payments from PLATO
 */
const PlatoPayments = ({
  platoPendingInstallments,
  platoBankDetails,
  openSupport,
  platoPaidInstallmentsCount,
  displayCurrency
}) => {
  const contactSupport = () => openSupport();

  const pendingInstallments = platoPendingInstallments.map(
    (payment, paymentIndex) => {
      const today = moment();
      const paymentDue = moment(payment.paymentDueTime);
      const dueDateDifference = paymentDue.diff(today, "days");
      const isExpired = today.isAfter(paymentDue, "date");
      const installmentText = `${getTitleCase(
        ordinalConverter.toWordsOrdinal(
          platoPaidInstallmentsCount + paymentIndex + 1
        )
      )} Installment`;

      return {
        amount: displayCurrency
          ? getLocaleStringGlobal(payment.amount)
          : getLocaleString(payment.amount),
        paymentUrl: payment.paymentUrl,
        dueBy:
          dueDateDifference > 7
            ? paymentDue.format(constants.commonDateFormat)
            : dueDateDifference === 0
            ? "Today"
            : paymentDue.fromNow(),

        isExpired,
        action: contactSupport,
        installmentText
      };
    }
  );
  return (
    <View>
      <Text
        style={styles.paymentTitle}
      >{`You have ${pendingInstallments.length} scheduled payments`}</Text>
      <PlatoPaymentsCard payments={pendingInstallments} />
      <Text style={styles.bankTitleText}>{`Bank Details`}</Text>
      <VoucherSplitSection
        containerStyle={styles.voucherSplitSection}
        sections={platoBankDetails}
      />
      <ConditionsApplyText
        text={constants.paymentText.paymentUpdateConditions}
        containerStyle={styles.conditionsWrapper}
      />
    </View>
  );
};

PlatoPayments.propTypes = {
  platoPendingInstallments: PropTypes.array.isRequired,
  platoBankDetails: PropTypes.array.isRequired,
  openSupport: PropTypes.func.isRequired,
  platoPaidInstallmentsCount: PropTypes.number,
  displayCurrency: PropTypes.string
};

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
  },
  conditionsWrapper: {
    marginVertical: 16,
    marginHorizontal: 24
  },
  voucherSplitSection: {
    marginHorizontal: 24
  }
});

export default PlatoPayments;
