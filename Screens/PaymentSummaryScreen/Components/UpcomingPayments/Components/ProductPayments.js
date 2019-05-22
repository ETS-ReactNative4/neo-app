import React, { Fragment } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import constants from "../../../../../constants/constants";
import PayNowCard from "../../PayNowCard";
import moment from "moment";
import ordinalConverter from "number-to-words";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { isIphoneX } from "react-native-iphone-x-helper";
import getLocaleString from "../../../../../Services/getLocaleString/getLocaleString";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

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

  const installment =
    paymentHistory && paymentHistory.length ? paymentHistory.length + 1 : 1;

  /**
   * Find Valid and Invalid payment options
   */
  const validPayments = paymentOptions.filter(
    payment => payment.paymentAllowed
  );
  const expiredPayments = paymentOptions.filter(
    payment =>
      !payment.paymentAllowed &&
      payment.paymentStatus === constants.paymentStatusExpired
  );

  const [currentPaymentOption, ...otherPaymentOptions] = validPayments;
  const numberOfInstallments = validPayments.length;
  const isPaymentAllowed =
    !isPaymentExpired &&
    currentPaymentOption &&
    currentPaymentOption.paymentAllowed;

  /**
   * Get data required to display the current payment installment
   */
  const paymentTitle = currentPaymentOption
    ? currentPaymentOption.percentageText
    : null;
  const currentPaymentData = currentPaymentOption
    ? {
        cardInfo: [
          {
            title: `${getTitleCase(
              ordinalConverter.toWordsOrdinal(installment)
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
        actionIcon: isPaymentAllowed ? constants.backIcon : constants.callIcon,
        color:
          dueDateDifference > 2 ? constants.ninthColor : constants.tenthColor,
        nextInstallmentAmount: currentPaymentOption.nextInstallmentAmount
          ? getLocaleString(currentPaymentOption.nextInstallmentAmount)
          : 0,
        nextInstallmentDate: moment(
          currentPaymentOption.nextInstallmentDate
        ).format(constants.commonDateFormat)
      }
    : null;

  /**
   * Get data required to display the final installment details (used to clear all payments)
   */
  const lastPaymentOption = otherPaymentOptions.length
    ? otherPaymentOptions[otherPaymentOptions.length - 1]
    : null;
  const lastPaymentOptionTitle = lastPaymentOption
    ? lastPaymentOption.percentageText
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
    isPaymentExpired && expiredPayments.length ? expiredPayments[0] : null;
  const expiredTitle = expiredPaymentOption
    ? expiredPaymentOption.percentageText
    : null;
  const expiredPaymentData = expiredPaymentOption
    ? {
        cardInfo: [
          {
            title: `${getTitleCase(
              ordinalConverter.toWordsOrdinal(installment)
            )} Installment`,
            text: expiredPaymentOption.amount
          },
          {
            title: `Due Date`,
            text: "Expired"
          }
        ],
        action: openSupport,
        actionText: "Call Support",
        actionIcon: constants.telephoneIcon,
        color: constants.shade2
      }
    : null;

  return (
    <View style={styles.productPaymentsContainer}>
      {!isPaymentExpired ? (
        <Fragment>
          <Text style={styles.paymentScheduleText}>
            {numberOfInstallments
              ? constants.paymentText.noOfInstallmentsText(numberOfInstallments)
              : ""}
          </Text>
          <Text style={styles.paymentTitleText}>{paymentTitle}</Text>
          <PayNowCard
            {...currentPaymentData}
            action={() => {
              recordEvent(constants.paymentScreenStartPayment);
              currentPaymentData.action();
            }}
          />
          {currentPaymentData && currentPaymentData.nextInstallmentAmount ? (
            <Fragment>
              <Text style={styles.nextPaymentTitleText}>{`Next Payment`}</Text>
              <Text style={styles.nextPaymentText}>{`${
                currentPaymentData.nextInstallmentAmount
              } by ${currentPaymentData.nextInstallmentDate}`}</Text>
            </Fragment>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <Text style={styles.paymentScheduleText}>
            {expiredPayments && expiredPayments.length
              ? constants.paymentText.noOfInstallmentsText(
                  expiredPayments.length
                )
              : ""}
          </Text>
          <Text style={styles.expiredPaymentTitleText}>{expiredTitle}</Text>
          <PayNowCard {...expiredPaymentData} />
        </Fragment>
      )}

      {!isPaymentExpired && lastPaymentOption ? (
        <View style={styles.clearPaymentContainer}>
          <Text
            style={styles.paymentTitleText}
          >{`Or ${lastPaymentOptionTitle}`}</Text>
          <PayNowCard
            {...lastPaymentData}
            containerStyle={styles.clearPaymentCard}
            textColor={constants.shade1}
            action={() => {
              recordEvent(constants.paymentScreenClearPayment);
              lastPaymentData.action();
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

ProductPayments.propTypes = forbidExtraProps({
  paymentOptions: PropTypes.array.isRequired,
  isPaymentExpired: PropTypes.bool.isRequired,
  openSupport: PropTypes.func.isRequired,
  paymentDue: PropTypes.number.isRequired,
  paymentHistory: PropTypes.array.isRequired
});

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
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.shade1,
    marginVertical: 24
  },
  paymentTitleText: {
    ...constants.fontCustom(constants.primaryRegular, 18),
    marginBottom: 16,
    color: constants.black1
  },
  expiredPaymentTitleText: {
    ...constants.fontCustom(constants.primaryRegular, 18),
    marginBottom: 16,
    color: constants.thirdColor
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
