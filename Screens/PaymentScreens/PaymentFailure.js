import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import constants from "../../constants/constants";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { recordEvent } from "../../Services/analytics/analyticsService";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

const PaymentFailure = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "Payment Failure"
        })
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.paymentFailureContainer}>
      <Image
        source={constants.paymentFailureIllus}
        style={styles.illustration}
        resizeMode={"contain"}
      />
      <Text style={styles.paymentFailureText}>
        {constants.paymentText.failureTitle}
      </Text>
      <Text style={styles.message}>{constants.paymentText.failureMessage}</Text>
      <SimpleButton
        containerStyle={{ marginTop: 8 }}
        text={constants.paymentText.contactHelpdesk}
        action={() => {
          recordEvent(constants.Payment.event, {
            click: constants.Payment.click.paymentFailureHelpDesk
          });
          navigation.navigate("SupportCenter");
        }}
        textColor={constants.black2}
        color={"transparent"}
        hasBorder={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentFailureContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40
  },
  paymentFailureText: {
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
  }
});

export default PaymentFailure;
