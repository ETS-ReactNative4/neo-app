import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import constants from "../../../constants/constants";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const OtpField = ({
  setOtpInputRef,
  otp,
  editOtp,
  submitOtp,
  resendOtp,
  isWaiting,
  waitTime
}) => {
  return (
    <View style={styles.otpNumberBox}>
      <TextInput
        ref={e => setOtpInputRef(e)}
        onChangeText={editOtp}
        placeholder={"Enter OTP"}
        value={otp}
        placeholderTextColor={constants.shade3}
        style={[
          styles.numberInput,
          otp ? { letterSpacing: Platform.OS === "ios" ? 8 : 4 } : {}
        ]}
        keyboardType={"phone-pad"}
        maxLength={6}
        underlineColorAndroid={"transparent"}
        returnKeyType={"next"}
        editable={true}
        onSubmitEditing={() => {
          submitOtp();
        }}
        keyboardAppearance={"dark"}
      />
      <SimpleButton
        containerStyle={{ width: null }}
        textStyle={isWaiting ? { width: 120 } : {}}
        text={isWaiting ? `Resend in ${waitTime}s` : "Resend?"}
        action={() => (isWaiting ? null : resendOtp())}
        textColor={isWaiting ? constants.shade3 : constants.firstColor}
        color={"white"}
        underlayColor={"transparent"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpNumberBox: {
    marginTop: 8,
    marginHorizontal: 24,
    height: 48,
    borderBottomColor: constants.shade3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  numberInput: {
    flex: 1,
    fontFamily: constants.primaryLight,
    textAlign: "justify",
    fontSize: 24,
    ...Platform.select({
      ios: {},
      android: {}
    }),
    color: constants.black1
  }
});

export default OtpField;
