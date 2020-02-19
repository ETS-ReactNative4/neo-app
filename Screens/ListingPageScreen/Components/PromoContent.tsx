import React from "react";

import { StyleSheet, View, Text, ViewStyle } from "react-native";

import {
  CONSTANT_black1,
  CONSTANT_shade6
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";

interface PromoContentProps {
  containerStyle?: ViewStyle;
}

const PromoContent = ({ containerStyle }: PromoContentProps) => {
  return (
    <View style={[styles.promoListContentWrapper, containerStyle]}>
      <Text style={styles.promoListTextStyle}>
        Key information on how to avail the promotional offer.
      </Text>

      <View style={styles.promoList}>
        <Text style={styles.promoListTitle}>Step 1</Text>
        <Text style={styles.promoListDecription}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Text>
      </View>
      <View style={styles.promoList}>
        <Text style={styles.promoListTitle}>Step 3</Text>
        <Text style={styles.promoListDecription}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Text>
      </View>
      <View style={styles.promoList}>
        <Text style={styles.promoListTitle}>Step 3</Text>
        <Text style={styles.promoListDecription}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Text>
      </View>

      <View style={styles.promoListFooter}>
        <PrimaryButton text={"Visit Australia for T20"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promoListContentWrapper: {},
  promoListTextStyle: {
    width: 240,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 24),
    marginBottom: 32
  },
  promoList: {
    marginBottom: 32
  },
  promoListTitle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 8
  },
  promoListDecription: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 24)
  },

  promoListFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: CONSTANT_shade6,
    paddingHorizontal: 32,
    paddingVertical: 20
  }
});

export default PromoContent;
