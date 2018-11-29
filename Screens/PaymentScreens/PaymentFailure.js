import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import constants from "../../constants/constants";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

const PaymentFailure = () => {
  return (
    <View style={styles.paymentFailureContainer}>
      <Image
        source={constants.paymentFailureIllus}
        style={styles.illustration}
        resizeMode={"contain"}
      />
      <Text style={styles.paymentFailureText}>Payment Failed!!</Text>
    </View>
  );
};

PaymentFailure.navigationOptions = ({ navigation }) => {
  return {
    header: <CommonHeader title={"Payment Failed"} navigation={navigation} />
  };
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
  },
  illustration: {
    height: 330,
    width: 285
  }
});

export default PaymentFailure;
