import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../constants/constants";

const PaymentSuccess = () => {
  return (
    <View style={styles.paymentSuccessContainer}>
      <Text style={styles.paymentSuccessText}>Payment Successful!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentSuccessContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  paymentSuccessText: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1
  }
});

export default PaymentSuccess;
