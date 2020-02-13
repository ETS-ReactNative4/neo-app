import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
  TextStyle
} from "react-native";
import {
  CONSTANT_firstColor,
  CONSTANT_white1
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

interface PrimaryButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  clickAction?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
}

const PrimaryButton = ({
  containerStyle,
  text,
  clickAction = () => null,
  buttonStyle,
  buttonTextStyle
}: PrimaryButtonProps) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={clickAction}
        style={[styles.buttonHeightStyle, buttonStyle]}
      >
        <View style={[styles.buttonHeightStyle, styles.button, buttonStyle]}>
          <Text style={[styles.textStyle, buttonTextStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonHeightStyle: {
    height: 56
  },

  button: {
    justifyContent: "center",
    backgroundColor: CONSTANT_firstColor,
    borderRadius: 4,
    paddingHorizontal: 24
  },

  textStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 17),
    textAlign: "center"
  }
});

export default PrimaryButton;
