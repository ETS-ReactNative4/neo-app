import React from "react";
import { View, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PropTypes from "prop-types";

const OtpBar = ({ keyboardSpace, resendOtp, verifyOtp }) => {
  return (
    <View>
      <View
        style={[styles.otpButtonContainer, { marginBottom: keyboardSpace }]}
        elevation={5}
      >
        <SimpleButton
          containerStyle={{
            height: 40,
            width: 160,
            marginRight: 8
          }}
          text={"ResendOtp"}
          action={resendOtp}
          textColor={"white"}
          underlayColor={constants.firstColorAlpha(0.4)}
          color={constants.firstColor}
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
  verifyOtp: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  otpButtonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56
  }
});

export default OtpBar;
