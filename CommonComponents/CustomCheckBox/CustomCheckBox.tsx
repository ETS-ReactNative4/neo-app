import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Text,
  TextStyle
} from "react-native";

import Icon from "../Icon/Icon";
import { CONSTANT_checkIcon } from "../../constants/imageAssets";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom
} from "../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade3,
  CONSTANT_firstColor
} from "../../constants/colorPallete";

export interface ICheckBoxData {
  text: string;
}

export interface ISuggestedDetails {
  index: number;
  text: string;
  isChecked: boolean;
}

interface CustomCheckBoxProps {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  isChecked: boolean;
  action: () => void;
  checkboxStyle?: StyleProp<ViewStyle>;
  checkboxTextStyle?: StyleProp<TextStyle>;
}

const CustomCheckBox = ({
  containerStyle,
  text,
  action = () => null,
  isChecked = false,
  checkboxStyle,
  checkboxTextStyle
}: CustomCheckBoxProps) => {
  return (
    <View style={[styles.checkboxContainerStyle, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={action}
        style={styles.checkboxTouchableStyle}
      >
        <View style={[styles.checkbox, checkboxStyle]}>
          {isChecked ? (
            <Icon
              name={CONSTANT_checkIcon}
              size={18}
              color={CONSTANT_firstColor}
            />
          ) : null}
        </View>

        <Text style={[styles.textStyle, checkboxTextStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainerStyle: {
    marginBottom: 24
  },
  checkboxTouchableStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: CONSTANT_shade3,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 18),
    paddingLeft: 18
  }
});

export default CustomCheckBox;
