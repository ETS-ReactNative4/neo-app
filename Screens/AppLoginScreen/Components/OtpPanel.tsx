import React, { useState } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import OtpInput from "./OtpInput";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_fifteenthColor
} from "../../../constants/colorPallete";

export interface OtpPanelProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const OtpPanel = ({ containerStyle }: OtpPanelProps) => {
  const [code, setCode] = useState<string>("");
  const updateCode = (newCode: string) => {
    setCode(newCode);
  };
  const onResendClick = () => null;

  return (
    <View style={[styles.otpPanelContainer, containerStyle]}>
      <Text style={styles.infoHeaderText}>{"AUTHENTICATE"}</Text>
      <Text style={styles.infoText}>
        {"We’ve sent you a 6 digit one time password for security."}
      </Text>
      <OtpInput
        code={code}
        onInputChange={updateCode}
        onCodeFilled={updateCode}
      />
      <View style={styles.optionsSection}>
        <View>
          <Text style={[styles.optionText, styles.leftText]}>
            {"TIMING OUT IN"}
          </Text>
          <Text style={[styles.optionText, styles.leftText]}>
            {"1:00 MINS"}
          </Text>
        </View>
        <View>
          <Text style={[styles.optionText, styles.rightText]}>
            {"DIDN’T RECEIVE IT?"}
          </Text>
          <Text
            onPress={onResendClick}
            style={[styles.optionText, styles.rightText, styles.textLink]}
          >
            {"RESEND OTP"}
          </Text>
        </View>
      </View>
    </View>
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
  textLink: {
    color: CONSTANT_fifteenthColor
  }
});

export default OtpPanel;
