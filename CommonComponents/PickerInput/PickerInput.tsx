import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
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

export interface PickerInputFieldProps {
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder: string;
  value: string;
  secondaryText?: string;
  secondaryTextAction?: () => any;
  onPressAction: () => any;
  hasError: boolean;
}

const PickerInputField = ({
  containerStyle,
  textInputStyle,
  label = "",
  placeholder = "",
  value = "",
  hasError = false,
  secondaryText = "",
  secondaryTextAction = () => null,
  onPressAction = () => null
}: PickerInputFieldProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={onPressAction}
      style={[styles.inputFieldWrapper, containerStyle]}
    >
      {label ? <Text style={styles.labelStyle}>{label}</Text> : null}

      <View
        style={[styles.inputFieldInner, hasError ? styles.hasErrorStyle : null]}
      >
        <Text
          style={[
            styles.textInput,
            !value ? { color: CONSTANT_shade3 } : null,
            textInputStyle
          ]}
        >
          {value ? value : placeholder}
        </Text>
        <Text style={styles.secondaryTextStyle} onPress={secondaryTextAction}>
          {secondaryText}
        </Text>
      </View>
    </TouchableOpacity>
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

export default PickerInputField;
