import React from "react";
import { View, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PropTypes from "prop-types";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import { responsiveWidth } from "react-native-responsive-dimensions";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const OtpBar = ({ resendOtp, verifyOtp, isWaiting, waitTime, isLoading }) => {
  return [
    <SimpleButton
      containerStyle={{
        height: 40,
        width: 160,
        marginRight: 8,
        borderWidth: 0.5
      }}
      key={0}
      text={isWaiting ? `ResendOtp (${waitTime}s)` : "ResendOtp"}
      hasBorder={true}
      action={
        isWaiting
          ? () => {}
          : () => {
              recordEvent(constants.mobileNumberResendOtp);
              resendOtp();
            }
      }
      textColor={isWaiting ? constants.shade5 : constants.black2}
      underlayColor={constants.shade4}
      color={"white"}
    />,
    <SimpleButton
      containerStyle={{
        height: 40,
        width: 160
      }}
      key={1}
      text={isLoading ? "Verifying..." : "Verify"}
      action={() => {
        if (!isLoading) {
          recordEvent(constants.mobileNumberVerifyOtp);
          verifyOtp();
        }
      }}
      textColor={isLoading ? constants.firstColor : "white"}
      underlayColor={constants.firstColorAlpha(0.4)}
      color={isLoading ? "white" : constants.firstColor}
    />
  ];
};

OtpBar.propTypes = forbidExtraProps({
  resendOtp: PropTypes.func.isRequired,
  verifyOtp: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  waitTime: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
});

const styles = StyleSheet.create({
  otpButtonContainer: {
    backgroundColor: "white",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OtpBar;
