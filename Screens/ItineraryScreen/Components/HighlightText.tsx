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

interface ItineraryProps {
  containerStyle?: ViewStyle;
  textBackgroundColor?: string;
  textColor?: string;
  afterCost?: boolean;
}

const HighlightText = ({
  containerStyle,
  textBackgroundColor = "rgba(233, 251, 255, 1)",
  textColor = "rgba(20, 128, 153, 1)",
  afterCost = false
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
          <Text style={styles.boldText}>Kuta</Text>, 3 nights
        </Text>
      ) : (
        <Text style={[styles.textStyle, textColorStyle]}>
          <Text style={styles.boldText}>₹10,02,214</Text> - See what’s included
          in your trip
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
    bottom: 76,
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
