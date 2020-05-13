import React from "react";
import { StyleSheet, Text } from "react-native";
import { CONSTANT_black1 } from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

export interface FormTitleProps {
  title: string;
}

const FormTitle = ({ title }: FormTitleProps) => {
  return <Text style={styles.titleStyle}>{title}</Text>;
};

const styles = StyleSheet.create({
  titleStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16)
  }
});

export default FormTitle;
