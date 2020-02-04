import React from "react";
import { View, StyleSheet, Platform } from "react-native";
// @ts-ignore
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_changeIcon } from "../../../constants/imageAssets";
import {
  CONSTANT_shade1,
  CONSTANT_shade4
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

export interface OtpInputProps {
  code: string;
  onInputChange: (text: string) => any;
  onCodeFilled: (text: string) => any;
  pinCount?: number;
}

const OtpInput = ({
  code = "",
  onInputChange = () => null,
  onCodeFilled = () => null,
  pinCount = 6
}: OtpInputProps) => {
  const onCodeChange = (changedCode: string) => {
    onInputChange(changedCode);
  };

  return (
    <View style={styles.otpInputContainer}>
      <View style={styles.iconWrapper}>
        <Icon name={CONSTANT_changeIcon} size={30} color={CONSTANT_shade1} />
      </View>
      <View style={styles.otpWrapper}>
        <OTPInputView
          pinCount={pinCount}
          code={code}
          onCodeChanged={onCodeChange}
          codeInputFieldStyle={[
            styles.underlineStyleBase,
            styles.otpInputField
          ]}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onCodeFilled}
          placeholderCharacter={"-"}
          placeholderTextColor={CONSTANT_shade1}
          autoFocusOnLoad={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpInputContainer: {
    flexDirection: "row",
    ...Platform.select({
      ios: {
        height: 40
      },
      android: {
        height: 62
      }
    }),
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
    color: CONSTANT_shade1,
    marginBottom: 8,
    ...Platform.select({
      android: {
        marginTop: 8,
        height: 62
      }
    })
  },
  underlineStyleBase: {
    borderWidth: 0
  },
  underlineStyleHighLighted: {
    borderWidth: 0
  }
});

export default OtpInput;
