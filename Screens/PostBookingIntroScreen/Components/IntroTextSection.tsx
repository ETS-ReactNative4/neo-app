import React from "react";
import { StyleSheet, View, Text, ViewStyle, StyleProp } from "react-native";

import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_black2
} from "../../../constants/colorPallete";

interface IntroTextSectionProps {
  title: string;
  description: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const IntroTextSection = ({
  title = "",
  description = "",
  containerStyle
}: IntroTextSectionProps) => {
  return (
    <View style={[containerStyle]}>
      <Text style={styles.titleText} numberOfLines={1} ellipsizeMode={"tail"}>
        {title}
      </Text>
      <Text style={styles.descText} numberOfLines={2} ellipsizeMode={"tail"}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 8,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20)
  },
  descText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 20),
    color: CONSTANT_black2
  }
});

export default IntroTextSection;
