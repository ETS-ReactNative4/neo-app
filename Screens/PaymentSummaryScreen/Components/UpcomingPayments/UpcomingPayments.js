import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomScrollView from "../../../../CommonComponents/CustomScrollView/CustomScrollView";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import PlatoPayments from "./Components/PlatoPayments";
import ProductPayments from "./Components/ProductPayments";
import XSensorPlaceholder from "../../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";

class UpcomingPayments extends Component {
  static propTypes = forbidExtraProps({
    isLoading: PropTypes.bool.isRequired,
    loadPaymentData: PropTypes.func.isRequired,
    isPaidWithPlato: PropTypes.bool.isRequired,
    paymentOptions: PropTypes.array,
    platoBankDetails: PropTypes.array,
    isPaymentExpired: PropTypes.bool.isRequired,
    paymentDue: PropTypes.string,
    paymentHistory: PropTypes.array,
    openSupport: PropTypes.func,
    platoPendingInstallments: PropTypes.array.isRequired
  });

  render() {
    const {
      isLoading,
      loadPaymentData,
      isPaidWithPlato,
      paymentOptions = [],
      platoBankDetails,
      isPaymentExpired,
      openSupport,
      paymentDue,
      paymentHistory,
      platoPendingInstallments
    } = this.props;
    return (
      <CustomScrollView
        style={styles.summaryContainer}
        refreshing={isLoading}
        onRefresh={loadPaymentData}
      >
        {isPaidWithPlato ? (
          <PlatoPayments
            platoPendingInstallments={platoPendingInstallments}
            platoBankDetails={platoBankDetails}
            openSupport={openSupport}
          />
        ) : (
          <ProductPayments
            paymentHistory={paymentHistory}
            paymentDue={paymentDue}
            isPaymentExpired={isPaymentExpired}
            openSupport={openSupport}
            paymentOptions={paymentOptions}
          />
        )}
        <XSensorPlaceholder />
      </CustomScrollView>
    );
  }
}

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: "white"
  }
});

export default UpcomingPayments;
