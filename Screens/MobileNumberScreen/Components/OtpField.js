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
        placeholder={""}
        value={otp}
        placeholderTextColor={constants.shade3}
        style={styles.numberInput}
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
        textStyle={isWaiting ? { width: 110, textAlign: "left" } : {}}
        text={isWaiting ? `Resend (${waitTime}s)` : "Resend?"}
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
    fontSize: 36,
    textAlign: "justify",
    ...Platform.select({
      android: {
        height: 56
      }
    }),
    color: constants.black2,
    letterSpacing: Platform.OS === "ios" ? 8 : 4
  }
});

export default OtpField;
