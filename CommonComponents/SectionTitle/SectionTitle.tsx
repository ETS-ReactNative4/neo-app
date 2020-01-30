import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle
} from "react-native";

import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

import { CONSTANT_black1, CONSTANT_black2 } from "../../constants/colorPallete";

interface SectionTitleProps {
  smallTitle?: string;
  title: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleNumberOfLines?: number;
  smallTitleTextStyle?: StyleProp<TextStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
}

const SectionTitle = ({
  smallTitle,
  title = "",
  description = "",
  containerStyle,
  titleNumberOfLines = 1,
  smallTitleTextStyle,
  titleTextStyle,
  descriptionTextStyle
}: SectionTitleProps) => {
  return (
    <View style={[containerStyle]}>
      {smallTitle ? (
        <Text style={[styles.smallTitleStyle, smallTitleTextStyle]}>
          {smallTitle}
        </Text>
      ) : null}
      <Text
        style={[styles.titleStyle, titleTextStyle]}
        numberOfLines={titleNumberOfLines}
        ellipsizeMode={"tail"}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={[styles.descriptionStyle, descriptionTextStyle]}
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
  smallTitleStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10),
    textTransform: "uppercase",
    marginBottom: 8
  },
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
