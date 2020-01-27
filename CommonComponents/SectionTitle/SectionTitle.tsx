import React from "react";
import { StyleSheet, View, Text, ViewStyle, StyleProp } from "react-native";

import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

import { CONSTANT_black1, CONSTANT_black2 } from "../../constants/colorPallete";

interface SectionTitleProps {
  title: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const SectionTitle = ({
  title = "",
  description = "",
  containerStyle
}: SectionTitleProps) => {
  return (
    <View style={[containerStyle]}>
      <Text style={styles.titleStyle} numberOfLines={1} ellipsizeMode={"tail"}>
        {title}
      </Text>
      {description ? (
        <Text
          style={styles.descriptionStyle}
          numberOfLines={2}
          ellipsizeMode={"tail"}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    marginBottom: 8,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20)
  },
  descriptionStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 20),
    color: CONSTANT_black2
  }
});

export default SectionTitle;
