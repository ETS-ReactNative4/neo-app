import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity
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
}

const PrimaryButton = ({
  containerStyle,
  text,
  clickAction = () => null,
  buttonStyle
}: PrimaryButtonProps) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        activeOpacity={0.8}
        onPress={clickAction}
      >
        <View style={[styles.buttonWrapper, styles.button, buttonStyle]}>
          <Text style={[styles.textStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
    height: 56
  },

  button: {
    backgroundColor: CONSTANT_firstColor,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24
  },

  textStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 17),
    textAlign: "center"
  }
});

export default PrimaryButton;
