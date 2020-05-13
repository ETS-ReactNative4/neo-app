import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
  TextStyle
} from "react-native";
import {
  CONSTANT_firstColor,
  CONSTANT_white
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
  buttonTextStyle?: StyleProp<TextStyle>;
}

/**
 * TODO: Here I've added two-button style property, but we only use the `buttonStyle` property
 To avoid the `containerStyle` property.
*/

const PrimaryButton = ({
  containerStyle,
  text,
  clickAction = () => null,
  buttonStyle,
  buttonTextStyle
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={clickAction}
      style={[styles.button, buttonStyle, containerStyle]}
    >
      <Text style={[styles.textStyle, buttonTextStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    backgroundColor: CONSTANT_firstColor,
    borderRadius: 4,
    paddingHorizontal: 24,
    height: 56
  },

  textStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 17),
    textAlign: "center"
  }
});

export default PrimaryButton;
