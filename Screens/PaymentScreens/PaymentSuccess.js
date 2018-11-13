import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import constants from "../../constants/constants";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

const PaymentSuccess = () => {
  return (
    <View style={styles.paymentSuccessContainer}>
      <Image
        source={constants.paymentSuccessIllus}
        style={styles.illustration}
        resizeMode={"contain"}
      />
      <Text style={styles.paymentSuccessText}>Payment Successful!</Text>
    </View>
  );
};

PaymentSuccess.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <CommonHeader title={"Payment Successful"} navigation={navigation} />
    )
  };
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
  },
  illustration: {
    height: 330,
    width: 285
  }
});

export default PaymentSuccess;
