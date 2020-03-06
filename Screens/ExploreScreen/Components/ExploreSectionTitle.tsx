import React, { Fragment } from "react";
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
} from "../../../constants/fonts";

import { CONSTANT_black1 } from "../../../constants/colorPallete";

interface ExploreSectionTitleProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  description?: string;
  titleColor?: string;
  descriptionTextStyle?: StyleProp<TextStyle>;
}

const ExploreSectionTitle = ({
  containerStyle,
  title = "",
  titleColor = `${CONSTANT_black1}`,
  description = "",
  descriptionTextStyle
}: ExploreSectionTitleProps) => {
  const titleTextColor = {
    color: titleColor
  };

  return (
    <Fragment>
      {title || description ? (
        <View style={containerStyle}>
          {title ? (
            <Text
              style={[styles.titleStyle, titleTextColor]}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text
              style={[styles.descriptionStyle, descriptionTextStyle]}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    marginBottom: 8
  },
  descriptionStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14)
  }
});

export default ExploreSectionTitle;
