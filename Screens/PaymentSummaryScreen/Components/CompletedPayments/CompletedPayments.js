import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import CompletedPaymentCard from "./Components/CompletedPaymentCard";
import getLocaleString from "../../../../Services/getLocaleString/getLocaleString";
import moment from "../../PaymentSummary";
import constants from "../../../../constants/constants";
import CustomScrollView from "../../../../CommonComponents/CustomScrollView/CustomScrollView";
import openCustomTab from "../../../../Services/openCustomTab/openCustomTab";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import { inject, observer } from "mobx-react/custom";
import getTitleCase from "../../../../Services/getTitleCase/getTitleCase";
import XSensorPlaceholder from "../../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import EmptyListPlaceholder from "../../../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";

const CompletedPayments = inject("userStore")(
  observer(
    ({
      userStore,
      isPaymentComplete,
      paymentHistory,
      isLoading,
      loadPaymentData
    }) => {
      const { userDetails } = userStore;
      const { name } = userDetails;
      return (
        <CustomScrollView
          style={styles.summaryContainer}
          refreshing={isLoading}
          onRefresh={loadPaymentData}
        >
          <Image
            source={constants.helpSupportIllus}
            resizeMode={"contain"}
            style={styles.paymentIllustration}
          />
          {paymentHistory.length ? (
            <Text
              style={styles.completedPaymentText}
            >{`${constants.paymentText.paymentSummaryText(
              getTitleCase(name)
            )}`}</Text>
          ) : null}
          {paymentHistory.map((payment, paymentIndex) => {
            const viewReceipt = () =>
              payment.salesReceipt ? openCustomTab(payment.salesReceipt) : null;
            return (
              <CompletedPaymentCard
                key={paymentIndex}
                amount={payment.paymentAmount}
                mode={payment.mode}
                date={payment.date}
                referenceId={payment.transactionId}
                action={viewReceipt}
                containerStyle={{ marginVertical: 16 }}
                salesReceipt={payment.salesReceipt}
              />
            );
          })}
          {!paymentHistory.length ? (
            <EmptyListPlaceholder
              containerStyle={{ marginVertical: 16 }}
              text={constants.paymentText.noPaymentsText}
            />
          ) : null}
          <XSensorPlaceholder />
        </CustomScrollView>
      );
    }
  )
);

CompletedPayments.propTypes = forbidExtraProps({
  paymentHistory: {}
});

const styles = StyleSheet.create({
  completedPaymentsContainer: {},
  paymentIllustration: {
    height: responsiveHeight(40),
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24
  },
  completedPaymentText: {
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primaryRegular, 18, 28),
    marginBottom: 16,
    color: constants.black2
  }
});

export default CompletedPayments;
