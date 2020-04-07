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
import { hotelCategoriesType } from "../../Screens/TravellerProfileDetailsScreen/hooks/useRetrieveTravelProfile";

export interface ICheckBoxData {
  text: hotelCategoriesType;
}

export interface ISuggestedDetails {
  index: number;
  text: hotelCategoriesType;
  isChecked: boolean;
}

interface CustomCheckBoxProps {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  isChecked: boolean;
  action: () => void;
  checkboxStyle?: StyleProp<ViewStyle>;
  checkboxTextStyle?: StyleProp<TextStyle>;
  checkIconSize?: number;
}

const CustomCheckBox = ({
  containerStyle,
  text,
  action = () => null,
  isChecked = false,
  checkboxStyle,
  checkboxTextStyle,
  checkIconSize = 18
}: CustomCheckBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.checkboxContainerStyle, containerStyle]}
    >
      <View style={[styles.checkbox, checkboxStyle]}>
        {isChecked ? (
          <Icon
            name={CONSTANT_checkIcon}
            size={checkIconSize}
            color={CONSTANT_firstColor}
          />
        ) : null}
      </View>

      <Text style={[styles.textStyle, checkboxTextStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24
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
