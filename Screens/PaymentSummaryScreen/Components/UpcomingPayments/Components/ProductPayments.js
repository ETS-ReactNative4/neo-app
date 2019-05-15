import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import PayNowCard from "../../PayNowCard";
import moment from "moment";
import ordinalConverter from "number-to-words";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";

const ProductPayments = ({
  paymentOptions,
  isPaymentExpired,
  paymentDue,
  paymentHistory
}) => {
  if (!paymentOptions.length) return null;

  const [currentPaymentOption, ...otherPaymentOptions] = paymentOptions;
  const numberOfInstallments = paymentOptions.length;
  const currentInstallment = paymentHistory.length + 1;

  const paymentTitle = currentPaymentOption.percentage;

  const currentPaymentData = {
    cardInfo: [
      {
        title: `${getTitleCase(
          ordinalConverter.toWordsOrdinal(currentInstallment)
        )} Installment`,
        text: currentPaymentOption.amount
      },
      {
        title: `Due by`,
        text: moment(paymentDue).format(constants.shortCommonDateFormat)
      }
    ],
    actionText: "Pay Now",
    action: currentPaymentOption.action
  };

  const nextPaymentOption = otherPaymentOptions.length
    ? otherPaymentOptions[0]
    : null;
  const nextPaymentDue = nextPaymentOption
    ? moment(parseInt(nextPaymentOption.paymentDue)).format(
        constants.shortCommonDateFormat
      )
    : null;

  return (
    <View style={styles.productPaymentsContainer}>
      <Text
        style={styles.paymentScheduleText}
      >{`You have ${numberOfInstallments} scheduled payment${
        numberOfInstallments > 1 ? "s" : ""
      }`}</Text>

      <Text style={styles.paymentTitleText}>{paymentTitle}</Text>
      <PayNowCard {...currentPaymentData} />

      {otherPaymentOptions.length ? (
        <Fragment>
          <Text style={styles.nextPaymentTitleText}>{`Next Payment`}</Text>
          <Text
            style={styles.nextPaymentText}
          >{`Next payment due on ${nextPaymentDue}`}</Text>
          <Text style={styles.otherOptionsTitle}>{"Or"}</Text>
        </Fragment>
      ) : null}

      {otherPaymentOptions.map((paymentOption, paymentOptionIndex) => {
        const paymentOptionTitle = paymentOption.percentage;
        const paymentData = {
          cardInfo: [
            {
              title: `Amount`,
              text: paymentOption.amount
            }
          ],
          action: paymentOption.action
        };
        return (
          <Fragment key={paymentOptionIndex}>
            <Text style={styles.paymentTitleText}>{paymentOptionTitle}</Text>
            <PayNowCard {...paymentData} />
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  productPaymentsContainer: {
    marginHorizontal: 24
  },
  paymentScheduleText: {
    ...constants.fontCustom(constants.primaryRegular, 18),
    color: constants.black1,
    marginVertical: 24
  },
  paymentTitleText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    marginBottom: 16,
    color: constants.shade1
  },
  nextPaymentTitleText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.shade1,
    marginTop: 16
  },
  nextPaymentText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 25),
    color: constants.shade1
  },
  otherOptionsTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    marginVertical: 24,
    color: constants.shade1
  }
});

export default ProductPayments;
