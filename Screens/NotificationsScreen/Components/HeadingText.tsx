import React from "react";

import { View, Text, StyleSheet, ViewStyle } from "react-native";

import {
  CONSTANT_shade5,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom
} from "../../../constants/fonts";

interface HeadingTextProps {
  containerStyle?: ViewStyle;
  title: string;
}

const HeadingText = ({ containerStyle, title }: HeadingTextProps) => {
  return (
    <View style={[styles.headingTextWrapper, containerStyle]}>
      <Text style={styles.headingTextStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headingTextWrapper: {
    backgroundColor: "rgb(250, 250, 250)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  headingTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    textTransform: "uppercase"
  },
  newSavedItineraryBgColor: {
    backgroundColor: "rgb(229, 249, 243)"
  }
});

export default HeadingText;
