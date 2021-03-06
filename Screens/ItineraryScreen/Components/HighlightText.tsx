import React from "react";
import { View, ViewStyle, StyleSheet, Text } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import { CONSTANT_backIcon } from "../../../constants/imageAssets";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_eighteenthColor,
  CONSTANT_twentiethColor
} from "../../../constants/colorPallete";
import { BOTTOM_BUTTON_CONTAINER_HEIGHT } from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";

interface ItineraryProps {
  containerStyle?: ViewStyle;
  textBackgroundColor?: string;
  textColor?: string;
  afterCost?: boolean;
  titleText: string;
  infoText?: string;
  afterCostAction?: () => any;
}

const HighlightText = ({
  containerStyle,
  textBackgroundColor = "rgba(233, 251, 255, 1)",
  textColor = "rgba(20, 128, 153, 1)",
  afterCost = false,
  titleText = "",
  infoText = "",
  afterCostAction = () => null
}: ItineraryProps) => {
  const highlightTextBgColor = {
    backgroundColor: `${
      !afterCost ? textBackgroundColor : CONSTANT_eighteenthColor
    }`
  };

  const textColorStyle = {
    color: `${!afterCost ? textColor : CONSTANT_twentiethColor}`
  };

  return (
    <View
      style={[
        styles.highlightTextContainer,
        highlightTextBgColor,
        containerStyle,
        afterCost ? styles.afterCostHighlightTextContainer : null
      ]}
    >
      {!afterCost ? (
        <Text style={[styles.textStyle, textColorStyle]}>
          <Text style={styles.boldText}>{titleText}</Text>
          {infoText ? `, ${infoText}` : ""}
        </Text>
      ) : (
        <Text
          onPress={afterCostAction}
          style={[styles.textStyle, textColorStyle]}
        >
          <Text style={styles.boldText}>{titleText}</Text>
          {infoText ? ` - ${infoText}` : ""}
        </Text>
      )}

      {afterCost ? (
        <View style={styles.arrowStyle}>
          <Icon
            name={CONSTANT_backIcon}
            size={13}
            color={CONSTANT_twentiethColor}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  highlightTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    minHeight: 40
  },
  afterCostHighlightTextContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: BOTTOM_BUTTON_CONTAINER_HEIGHT,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  textStyle: {
    color: "#148099",
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15)
  },
  boldText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15)
  },
  arrowStyle: {
    transform: [
      {
        scaleX: -1
      }
    ]
  }
});

export default HighlightText;
