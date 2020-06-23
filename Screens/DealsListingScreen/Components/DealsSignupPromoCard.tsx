import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CONSTANT_DealsSignupPromo } from "../../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import {
  CONSTANT_firstColor,
  CONSTANT_white
} from "../../../constants/colorPallete";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import deepLink from "../../../Services/deepLink/deepLink";
import { CONSTANT_productUrl } from "../../../constants/serverUrls";

const DealsSignupPromoCard = () => {
  return (
    <View style={styles.dealsSignupContainer}>
      <Image
        resizeMode={"contain"}
        style={styles.promoImage}
        source={CONSTANT_DealsSignupPromo()}
      />
      <BlankSpacer height={24} />
      <Text style={styles.titleText}>{"Get early bird access to deals"}</Text>
      <BlankSpacer height={16} />
      <Text style={styles.infoText}>
        {
          "Be the first one to get notified for exclusive offers on staycations with this invite-only membership"
        }
      </Text>
      <BlankSpacer height={24} />
      <PrimaryButton
        clickAction={() =>
          deepLink({
            link: `${CONSTANT_productUrl}deals/staycation`
          })
        }
        buttonStyle={styles.cta}
        text={"Get Access"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dealsSignupContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginHorizontal: 16,
    borderRadius: 4,
    padding: 40
  },
  promoImage: {
    height: 120
  },
  titleText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20),
    color: CONSTANT_firstColor,
    textAlign: "center"
  },
  infoText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 22),
    color: CONSTANT_white,
    textAlign: "center"
  },
  cta: {
    backgroundColor: "transparent",
    borderColor: CONSTANT_firstColor,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    height: null
  }
});

export default DealsSignupPromoCard;
