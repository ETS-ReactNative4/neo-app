import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../constants/constants";

const PaymentFailure = () => {
  return (
    <View style={styles.paymentFailureContainer}>
      <Text style={styles.paymentFailureText}>Payment Failed!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentFailureContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  paymentFailureText: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1
  }
});

export default PaymentFailure;
