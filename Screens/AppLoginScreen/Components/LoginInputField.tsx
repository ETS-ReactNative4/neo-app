import React, { RefObject } from "react";
import {
  View,
  StyleSheet,
  TextInputProps,
  TextInput,
  Platform,
  StyleProp,
  ViewStyle
} from "react-native";
import {
  CONSTANT_shade1,
  CONSTANT_seventeenthColor
} from "../../../constants/colorPallete";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import Icon from "../../../CommonComponents/Icon/Icon";

export interface LoginInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  icon: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => any;
  hasError: boolean;
  textInputRef?: RefObject<TextInput>;
}

const LoginInputField = ({
  placeholder = "",
  value = "",
  icon = "",
  onChangeText,
  hasError = false,
  containerStyle,
  textInputRef,
  ...otherProps
}: LoginInputProps) => {
  return (
    <View
      style={[
        styles.inputContainer,
        hasError ? styles.inputHasError : null,
        containerStyle
      ]}
    >
      <View style={styles.inputIconWrapper}>
        <Icon size={16} name={icon} color={CONSTANT_shade1} />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...otherProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    borderBottomColor: CONSTANT_shade1,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        height: 36
      }
    })
  },
  inputHasError: {
    borderBottomColor: CONSTANT_seventeenthColor
  },
  inputIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: 16
  },
  textInputWrapper: {
    flex: 1,
    marginLeft: 8
  },
  textInput: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18),
    color: CONSTANT_shade1,
    ...Platform.select({
      ios: {
        height: 36,
        paddingLeft: 8
      }
    }),
    lineHeight: undefined
  }
});

export default LoginInputField;
