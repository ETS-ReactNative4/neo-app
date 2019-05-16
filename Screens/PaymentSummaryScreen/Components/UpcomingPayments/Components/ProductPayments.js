import React, { Fragment } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import constants from "../../../../../constants/constants";
import PayNowCard from "../../PayNowCard";
import moment from "moment";
import ordinalConverter from "number-to-words";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { isIphoneX } from "react-native-iphone-x-helper";

const ProductPayments = ({
  paymentOptions,
  isPaymentExpired,
  openSupport,
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
        text: !isPaymentExpired
          ? moment(paymentDue).format(constants.shortCommonDateFormat)
          : "Expired"
      }
    ],
    actionText: !isPaymentExpired ? "Pay Now" : "Call Support",
    action: !isPaymentExpired ? currentPaymentOption.action : openSupport
  };

  const nextPaymentOption = otherPaymentOptions.length
    ? otherPaymentOptions[0]
    : null;
  const nextPaymentDue = nextPaymentOption
    ? moment(parseInt(nextPaymentOption.paymentDue)).format(
        constants.shortCommonDateFormat
      )
    : null;

  const lastPaymentOption = otherPaymentOptions[otherPaymentOptions.length - 1];
  const lastPaymentOptionTitle = lastPaymentOption.percentage;
  const lastPaymentData = {
    cardInfo: [
      {
        title: `Amount`,
        text: lastPaymentOption.amount
      }
    ],
    action: lastPaymentOption.action
  };

  return (
    <View style={styles.productPaymentsContainer}>
      <Text
        style={styles.paymentScheduleText}
      >{`You have ${numberOfInstallments} scheduled payment${
        numberOfInstallments > 1 ? "s" : ""
      }`}</Text>

      <Text style={styles.paymentTitleText}>{paymentTitle}</Text>
      <PayNowCard {...currentPaymentData} />

      {!isPaymentExpired ? (
        <Fragment>
          {otherPaymentOptions.length ? (
            <Fragment>
              <Text style={styles.nextPaymentTitleText}>{`Next Payment`}</Text>
              <Text
                style={styles.nextPaymentText}
              >{`Next payment due on ${nextPaymentDue}`}</Text>
            </Fragment>
          ) : null}

          <View style={styles.clearPaymentContainer}>
            <Text
              style={styles.paymentTitleText}
            >{`Or ${lastPaymentOptionTitle}`}</Text>
            <PayNowCard {...lastPaymentData} />
          </View>
        </Fragment>
      ) : null}
    </View>
  );
};

const headerHeight = constants.headerHeight;
const tabBarHeight = 50;

const androidStatusBarHeight =
  Platform.OS === constants.platformAndroid ? StatusBar.currentHeight : 0;

const xNotchHeight = constants.xNotchHeight;
const xSensorAreaHeight = constants.xSensorAreaHeight;
const xArea = isIphoneX() ? xNotchHeight + xSensorAreaHeight : 0;

const availableAreaHeight =
  responsiveHeight(100) -
  tabBarHeight -
  headerHeight -
  xArea -
  androidStatusBarHeight;

const styles = StyleSheet.create({
  productPaymentsContainer: {
    marginHorizontal: 24,
    height: availableAreaHeight
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
  },
  clearPaymentContainer: {
    position: "absolute",
    bottom: 24
  }
});

export default ProductPayments;
