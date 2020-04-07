import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import {
  CONSTANT_shade2,
  CONSTANT_black1
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

export interface ProfileDetailSectionProps {
  title?: string;
  text?: string;
  titleStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ProfileDetailSection = ({
  title,
  text,
  titleStyle,
  textStyle
}: ProfileDetailSectionProps) => {
  return (
    <>
      {title ? (
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      ) : null}
      {text ? <Text style={[styles.textStyle, textStyle]}>{text}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: CONSTANT_shade2,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15),
    textTransform: "uppercase",
    marginBottom: 4
  },
  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    marginBottom: 20
  }
});

export default ProfileDetailSection;
