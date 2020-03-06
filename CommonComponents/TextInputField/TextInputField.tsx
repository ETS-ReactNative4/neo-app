import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextInputProps,
  TextStyle
} from "react-native";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade2,
  CONSTANT_shade3,
  CONSTANT_firstColor,
  CONSTANT_seventeenthColor,
  CONSTANT_shade4
} from "../../constants/colorPallete";

export interface TextInputFieldProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => any;
  secondaryText?: string;
  secondaryTextAction?: () => any;
  hasError: boolean;
}

const TextInputField = ({
  containerStyle,
  textInputStyle,
  label = "",
  placeholder = "",
  value = "",
  onChangeText,
  hasError = false,
  secondaryText = "",
  secondaryTextAction = () => {},
  ...otherProps
}: TextInputFieldProps) => {
  return (
    <View style={[styles.inputFieldWrapper, containerStyle]}>
      {label ? <Text style={styles.labelStyle}>{label}</Text> : null}

      <View
        style={[styles.inputFieldInner, hasError ? styles.hasErrorStyle : null]}
      >
        <TextInput
          style={[styles.textInput, textInputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={CONSTANT_shade3}
          {...otherProps}
        />
        <Text style={styles.secondaryTextStyle} onPress={secondaryTextAction}>
          {secondaryText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldWrapper: {
    marginBottom: 20
  },
  inputFieldInner: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: CONSTANT_shade4,
    borderBottomWidth: 1
  },
  labelStyle: {
    color: CONSTANT_shade2,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15),
    textTransform: "uppercase",
    marginBottom: 4
  },
  textInput: {
    flex: 1,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    paddingBottom: 6,
    marginRight: 8
  },
  secondaryTextStyle: {
    color: CONSTANT_firstColor,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15),
    textTransform: "uppercase"
  },
  hasErrorStyle: {
    borderBottomColor: CONSTANT_seventeenthColor
  }
});

export default TextInputField;
