import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import constants from "../../constants/constants";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";

const PaymentSuccess = ({ transactionId = "" }) => {
  return (
    <View style={styles.paymentSuccessContainer}>
      <Image
        source={constants.paymentSuccessIllus}
        style={styles.illustration}
        resizeMode={"contain"}
      />
      <Text style={styles.paymentSuccessText}>
        {constants.paymentText.successTitle}
      </Text>
      <Text style={styles.message}>{constants.paymentText.successMessage}</Text>
      <Text style={styles.transId}>{transactionId}</Text>
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
    justifyContent: "center",
    paddingHorizontal: 40
  },
  paymentSuccessText: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1,
    marginVertical: 16
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2,
    textAlign: "center"
  },
  illustration: {
    width: responsiveWidth(100) - 48,
    height: responsiveHeight(25)
  },
  transId: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    marginVertical: 8,
    color: constants.thirdColor
  }
});

export default PaymentSuccess;
