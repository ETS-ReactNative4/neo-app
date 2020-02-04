import React from "react";
import { View, StyleSheet } from "react-native";
// @ts-ignore
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_changeIcon } from "../../../constants/imageAssets";
import {
  CONSTANT_shade1,
  CONSTANT_shade4,
  CONSTANT_black1
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

export interface OtpInputProps {
  code: string;
  onInputChange: (text: string) => any;
  onCodeFilled: (text: string) => any;
}

const OtpInput = ({
  code = "",
  onInputChange = () => null,
  onCodeFilled = () => null
}: OtpInputProps) => {
  const onCodeChange = (changedCode: string) => {
    onInputChange(changedCode);
  };

  return (
    <View style={styles.otpInputContainer}>
      <View style={styles.iconWrapper}>
        <Icon name={CONSTANT_changeIcon} size={20} color={CONSTANT_shade1} />
      </View>
      <View style={styles.otpWrapper}>
        <OTPInputView
          pinCount={6}
          code={code}
          onCodeChanged={onCodeChange}
          codeInputFieldStyle={[
            styles.underlineStyleBase,
            styles.otpInputField
          ]}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onCodeFilled}
          placeholderCharacter={"-"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpInputContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderBottomColor: CONSTANT_shade4,
    borderBottomWidth: 1
  },
  iconWrapper: {
    paddingLeft: 16
  },
  otpWrapper: {
    flex: 1,
    paddingHorizontal: 16
  },
  otpInputField: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 30),
    lineHeight: undefined,
    color: CONSTANT_black1
  },
  underlineStyleBase: {
    borderWidth: 0
  },
  underlineStyleHighLighted: {
    borderWidth: 0
  }
});

export default OtpInput;
