import React from "react";
import { View, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PropTypes from "prop-types";

const OtpBar = ({
  keyboardSpace,
  resendOtp,
  verifyOtp,
  isWaiting,
  waitTime
}) => {
  return (
    <View style={styles.otpBarWrapper}>
      <View
        style={[styles.otpButtonContainer, { marginBottom: keyboardSpace }]}
      >
        <SimpleButton
          containerStyle={{
            height: 40,
            width: 160,
            marginRight: 8,
            borderWidth: 0.5
          }}
          text={isWaiting ? `ResendOtp (${waitTime}s)` : "ResendOtp"}
          hasBorder={true}
          action={isWaiting ? () => {} : resendOtp}
          textColor={isWaiting ? constants.shade5 : constants.black2}
          underlayColor={constants.shade4}
          color={"white"}
        />
        <SimpleButton
          containerStyle={{
            height: 40,
            width: 160
          }}
          text={"Verify"}
          action={verifyOtp}
          textColor={"white"}
          underlayColor={constants.firstColorAlpha(0.4)}
          color={constants.firstColor}
        />
      </View>
      {isIphoneX() ? (
        <XSensorPlaceholder containerStyle={{ backgroundColor: "white" }} />
      ) : null}
    </View>
  );
};

OtpBar.propTypes = {
  keyboardSpace: PropTypes.number.isRequired,
  resendOtp: PropTypes.func.isRequired,
  verifyOtp: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  waitTime: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  otpButtonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56
  },
  otpBarWrapper: {
    shadowColor: constants.shade4,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowRadius: 0,
    shadowOpacity: 0.5,
    elevation: 5
  }
});

export default OtpBar;
