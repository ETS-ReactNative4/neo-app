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

  const today = moment();
  const dueDateDifference = moment(paymentDue).diff(today, "days");

  /**
   * Find Valid and Invalid payment options
   */
  const validPayments = paymentOptions.filter(
    payment => payment.paymentAllowed
  );
  const invalidPayments = paymentOptions.filter(
    payment => !payment.paymentAllowed
  );

  const [currentPaymentOption, ...otherPaymentOptions] = validPayments;
  const numberOfInstallments = validPayments.length;
  const currentInstallment = paymentHistory.length + 1;
  const isPaymentAllowed =
    !isPaymentExpired && currentPaymentOption.paymentAllowed;

  /**
   * Get data required to display the current payment installment
   */
  const paymentTitle = currentPaymentOption
    ? currentPaymentOption.percentage
    : null;
  const currentPaymentData = currentPaymentOption
    ? {
        cardInfo: [
          {
            title: `${getTitleCase(
              ordinalConverter.toWordsOrdinal(currentInstallment)
            )} Installment`,
            text: currentPaymentOption.amount
          },
          {
            title: `Due`,
            text: !isPaymentExpired
              ? dueDateDifference > 7
                ? moment(paymentDue).format(constants.shortCommonDateFormat)
                : dueDateDifference === 0
                  ? "Today"
                  : moment(paymentDue).fromNow()
              : "Expired"
          }
        ],
        actionText: isPaymentAllowed ? "Pay Now" : "Call Support",
        action: isPaymentAllowed ? currentPaymentOption.action : openSupport,
        actionIcon: isPaymentAllowed ? constants.backIcon : constants.callIcon
      }
    : null;

  /**
   * Get data required to display the next installment information
   */
  const nextPaymentOption = otherPaymentOptions.length
    ? otherPaymentOptions[0]
    : null;
  const nextPaymentDue = nextPaymentOption
    ? moment(parseInt(nextPaymentOption.paymentDue)).format(
        constants.shortCommonDateFormat
      )
    : null;

  /**
   * Get data required to display the final installment details (used to clear all payments)
   */
  const lastPaymentOption = otherPaymentOptions.length
    ? otherPaymentOptions[otherPaymentOptions.length - 1]
    : null;
  const lastPaymentOptionTitle = lastPaymentOption
    ? lastPaymentOption.percentage
    : null;
  const lastPaymentData = lastPaymentOption
    ? {
        cardInfo: [
          {
            title: `Amount`,
            text: lastPaymentOption.amount
          }
        ],
        action: lastPaymentOption.action,
        actionIcon: constants.backIcon
      }
    : null;

  /**
   * If payment has expired, display the final installment with expired message
   */
  const expiredPaymentOption =
    isPaymentExpired && invalidPayments.length
      ? invalidPayments[invalidPayments.length - 1]
      : null;
  const expiredPaymentData = expiredPaymentOption
    ? {
        cardInfo: [
          {
            title: `Amount`,
            text: expiredPaymentOption.amount
          },
          {
            title: `Due by`,
            text: "Expired"
          }
        ],
        action: openSupport,
        actionText: "Expired",
        actionIcon: constants.callIcon,
        color: constants.shade2
      }
    : null;

  return (
    <View style={styles.productPaymentsContainer}>
      {!isPaymentExpired ? (
        <Fragment>
          <Text
            style={styles.paymentScheduleText}
          >{`You have ${numberOfInstallments} scheduled payment${
            numberOfInstallments > 1 ? "s" : ""
          }`}</Text>
          <Text style={styles.paymentTitleText}>{paymentTitle}</Text>
          <PayNowCard {...currentPaymentData} />
        </Fragment>
      ) : (
        <Fragment>
          <Text style={styles.paymentScheduleText}>
            {"Your payment has Expired"}
          </Text>
          <Text style={styles.paymentTitleText}>
            {"Please contact Support"}
          </Text>
          <PayNowCard {...expiredPaymentData} />
        </Fragment>
      )}

      {!isPaymentExpired && lastPaymentOption ? (
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
            <PayNowCard
              {...lastPaymentData}
              containerStyle={styles.clearPaymentCard}
              textColor={constants.shade1}
            />
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
  },
  clearPaymentCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: constants.shade4
  }
});

export default ProductPayments;
