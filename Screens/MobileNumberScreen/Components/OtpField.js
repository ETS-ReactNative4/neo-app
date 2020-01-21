import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import constants from "../../../constants/constants";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";

const OtpField = ({
  setOtpInputRef,
  otp,
  editOtp,
  submitOtp,
  resendOtp,
  isWaiting,
  waitTime
}) => {
  const buttonStyle = { width: null };
  const buttonTextStyle = { width: 110, textAlign: "left" };

  return (
    <View style={styles.otpNumberBox}>
      <TextInput
        ref={setOtpInputRef}
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
        containerStyle={buttonStyle}
        textStyle={isWaiting ? buttonTextStyle : {}}
        text={isWaiting ? `Resend (${waitTime}s)` : "Resend?"}
        action={() => {
          if (isWaiting) {
            return null;
          }
          recordEvent(constants.MobileNumber.event, {
            click: constants.MobileNumber.click.resendOtp
          });
          resendOtp();
        }}
        textColor={isWaiting ? constants.shade3 : constants.firstColor}
        color={"white"}
        underlayColor={"transparent"}
      />
    </View>
  );
};

OtpField.propTypes = {
  setOtpInputRef: PropTypes.object.isRequired,
  otp: PropTypes.string.isRequired,
  editOtp: PropTypes.func.isRequired,
  submitOtp: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  waitTime: PropTypes.number.isRequired
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
