import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import PromoContent from "./Components/PromoContent";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";
import { CONSTANT_white } from "../../constants/colorPallete";
import { responsiveHeight } from "react-native-responsive-dimensions";
import {
  SCREEN_PROMO_PAGE,
  SCREEN_LISTING_PAGE
} from "../../NavigatorsV2/ScreenNames";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import resolveLinks from "../../Services/resolveLinks/resolveLinks";

type PromoLandingNavTypes = AppNavigatorProps<typeof SCREEN_PROMO_PAGE>;

export interface PromoLandingProps extends PromoLandingNavTypes {}

export interface IPromoData {
  html: string;
  coverImage: string;
  cta: string;
}

const PromoLanding = ({ navigation, route }: PromoLandingProps) => {
  const { slug, promoData: promoDataUrl } = route.params || {};

  const goBack = () => {
    navigation.goBack();
  };

  const [promoData, setPromoData] = useState<IPromoData | null>(null);
  const [promoLoadFailed, setPromoLoadFailed] = useState<boolean>(false);

  useEffect(() => {
    fetch(promoDataUrl)
      .then(result => result.json())
      .then((response: IPromoData) => {
        setPromoData(response);
      })
      .catch(() => {
        setPromoLoadFailed(true);
      });
  });

  if (promoLoadFailed) {
    /**
     * PT TODO: Failure message needed
     */
    return null;
  }

  if (!promoData) {
    return null;
  }

  return (
    <View style={styles.promoLandingContainer}>
      <ParallaxScrollView
        bannerImage={getImgIXUrl({
          src: promoData.coverImage
        })}
        backAction={goBack}
      >
        <BlankSpacer height={20} />
        <PromoContent html={promoData.html} />
        <BlankSpacer height={responsiveHeight(20)} />
        {/**
         * PT TODO: Calculate it more accurately
         * Android needs additional spacing since it is using margin for parallax scroll
         */}
        <BlankSpacer height={responsiveHeight(50)} />
      </ParallaxScrollView>

      <BottomButtonBar
        containerStyle={styles.bottomBar}
        disableLeftButton
        rightButtonName={promoData.cta}
        rightButtonAction={() => {
          resolveLinks(SCREEN_LISTING_PAGE, {
            slug
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  promoLandingContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  bottomBar: {
    paddingBottom: 24
  }
});

export default PromoLanding;
