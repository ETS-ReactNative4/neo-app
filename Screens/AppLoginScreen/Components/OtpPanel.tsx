import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import OtpInput from "./OtpInput";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_fifteenthColor,
  CONSTANT_seventeenthColor
} from "../../../constants/colorPallete";
import DismissKeyboardView from "../../../CommonComponents/DismissKeyboardView/DismissKeyboardView";
import moment from "moment";

export interface OtpPanelProps {
  containerStyle?: StyleProp<ViewStyle>;
  onResend: () => any;
  onCodeFilled: (code: string) => any;
  updateCode: (code: string) => any;
  code: string;
  expiryTime?: number;
  onTimedOut: () => any;
  isTimedOut: boolean;
}

const OtpPanel = ({
  containerStyle,
  code,
  updateCode,
  onCodeFilled,
  onResend,
  expiryTime,
  onTimedOut,
  isTimedOut
}: OtpPanelProps) => {
  const calculateTimeLeft = () => {
    if (expiryTime) {
      const difference = moment(expiryTime).diff(moment());
      if (difference <= 0) {
        /**
         * PT TODO - Timeout not tested yet
         */
        onTimedOut();
      }
      return `${Math.floor(moment.duration(difference).asMinutes())
        .toString()
        .padStart(2, "0")}:${Math.trunc(
        moment.duration(difference).asSeconds() % 60
      )
        .toString()
        .padStart(2, "0")}`;
    }
    return "";
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isTimedOut) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearTimeout(timer);
  });

  return (
    <DismissKeyboardView style={[styles.otpPanelContainer, containerStyle]}>
      <Text style={styles.infoHeaderText}>{"AUTHENTICATE"}</Text>
      <Text style={styles.infoText}>
        {"We’ve sent you a 6 digit one time password for security."}
      </Text>
      <OtpInput
        code={code}
        onInputChange={updateCode}
        onCodeFilled={onCodeFilled}
      />
      <View style={styles.optionsSection}>
        <View>
          <Text style={[styles.optionText, styles.leftText]}>
            {isTimedOut ? "" : "TIMING OUT IN"}
          </Text>
          <Text
            style={[
              styles.optionText,
              styles.leftText,
              isTimedOut ? styles.expiredText : null
            ]}
          >
            {isTimedOut ? "OTP TIMED OUT" : `${timeLeft} MINS`}
          </Text>
        </View>
        <View>
          <Text style={[styles.optionText, styles.rightText]}>
            {"DIDN’T RECEIVE IT?"}
          </Text>
          <Text
            onPress={onResend}
            style={[styles.optionText, styles.rightText, styles.textLink]}
          >
            {"RESEND OTP"}
          </Text>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  otpPanelContainer: {},
  infoHeaderText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10),
    color: CONSTANT_black1,
    marginBottom: 8
  },
  infoText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20),
    color: CONSTANT_black1,
    marginBottom: 32
  },
  optionsSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16
  },
  optionText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10, 15),
    color: CONSTANT_shade1
  },
  rightText: {
    textAlign: "right"
  },
  leftText: {
    textAlign: "left"
  },
  expiredText: {
    color: CONSTANT_seventeenthColor
  },
  textLink: {
    color: CONSTANT_fifteenthColor
  }
});

export default OtpPanel;
