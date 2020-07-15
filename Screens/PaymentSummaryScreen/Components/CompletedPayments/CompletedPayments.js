import React, { Fragment } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import CompletedPaymentCard from "./Components/CompletedPaymentCard";
import constants from "../../../../constants/constants";
import CustomScrollView from "../../../../CommonComponents/CustomScrollView/CustomScrollView";
import openCustomTab from "../../../../Services/openCustomTab/openCustomTab";
import { inject, observer } from "mobx-react";
import getTitleCase from "../../../../Services/getTitleCase/getTitleCase";
import XSensorPlaceholder from "../../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import EmptyListPlaceholder from "../../../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import Icon from "../../../../CommonComponents/Icon/Icon";

const CompletedPayments = inject("userStore")(
  observer(
    ({ userStore, paymentHistory, isLoading, loadPaymentData, gstReceipt }) => {
      const { userDetails } = userStore;
      const { name } = userDetails;
      const openGSTInvoice = () =>
        openCustomTab(
          gstReceipt,
          () => null,
          () => null
        );
      return (
        <CustomScrollView
          style={styles.summaryContainer}
          refreshing={isLoading}
          onRefresh={loadPaymentData}
        >
          <Image
            source={constants.paymentCompleteIllus}
            resizeMode={"contain"}
            style={styles.paymentIllustration}
          />
          {isLoading && !paymentHistory.length ? null : (
            <Fragment>
              {paymentHistory.length ? (
                gstReceipt ? (
                  <Fragment>
                    <Text
                      style={styles.completedPaymentText}
                    >{`${constants.paymentText.gstInvoiceText(
                      getTitleCase(name)
                    )}`}</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={openGSTInvoice}
                      style={styles.downloadInvoiceWrapper}
                    >
                      <Text style={styles.downloadInvoiceText}>
                        {constants.paymentText.gstInvoiceDownloadText}
                      </Text>
                      <View style={styles.payNowIcon}>
                        <Icon
                          name={constants.backIcon}
                          color={constants.ninthColor}
                          size={14}
                        />
                      </View>
                    </TouchableOpacity>
                  </Fragment>
                ) : (
                  <Text
                    style={styles.completedPaymentText}
                  >{`${constants.paymentText.paymentSummaryText(
                    getTitleCase(name)
                  )}`}</Text>
                )
              ) : null}
              {paymentHistory.map((payment, paymentIndex) => {
                const viewReceipt = () =>
                  payment.salesReceipt
                    ? openCustomTab(
                        payment.salesReceipt,
                        () => null,
                        () => null,
                        "PaymentPDFViewerScreen"
                      )
                    : null;
                return (
                  <CompletedPaymentCard
                    key={paymentIndex}
                    amount={payment.paymentAmount}
                    mode={payment.mode}
                    date={payment.date}
                    referenceId={payment.transactionId}
                    action={viewReceipt}
                    containerStyle={styles.verticalSpacing}
                    salesReceipt={payment.salesReceipt}
                  />
                );
              })}
              {!paymentHistory.length ? (
                <EmptyListPlaceholder
                  containerStyle={styles.verticalSpacing}
                  text={constants.paymentText.noPaymentsText}
                />
              ) : null}
              <XSensorPlaceholder />
            </Fragment>
          )}
        </CustomScrollView>
      );
    }
  )
);

CompletedPayments.propTypes = {
  isPaymentComplete: PropTypes.bool.isRequired,
  paymentHistory: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadPaymentData: PropTypes.func.isRequired,
  gstReceipt: PropTypes.string
};

const styles = StyleSheet.create({
  completedPaymentsContainer: {},
  paymentIllustration: {
    height: 112,
    width: 96,
    marginHorizontal: 24,
    marginVertical: 24,
    alignSelf: "center"
  },
  completedPaymentText: {
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primaryRegular, 18, 28),
    marginBottom: 16,
    color: constants.black2
  },
  downloadInvoiceText: {
    color: constants.ninthColor,
    ...constants.fontCustom(constants.primaryRegular, 14)
  },
  payNowIcon: {
    marginLeft: 4,
    transform: [{ rotateY: "180deg" }],
    marginTop: -2
  },
  downloadInvoiceWrapper: {
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  verticalSpacing: {
    marginVertical: 16
  }
});

export default CompletedPayments;
