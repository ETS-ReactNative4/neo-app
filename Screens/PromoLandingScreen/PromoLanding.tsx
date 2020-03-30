import React from "react";
import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import PromoContent from "./Components/PromoContent";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";

export interface PromoLandingProps {}

const PromoLanding = ({}: PromoLandingProps) => {
  const goBack = () => {};

  return (
    <View style={styles.promoLandingContainer}>
      <ParallaxScrollView
        bannerImage={getImgIXUrl({
          src: "https://pyt-images.imgix.net/images//city/london.jpg"
        })}
        backAction={goBack}
      >
        <BlankSpacer height={20} />
        <PromoContent />
      </ParallaxScrollView>

      <BottomButtonBar
        containerStyle={styles.bottomBar}
        disableLeftButton
        rightButtonName={"Visit Australia for T20"}
        rightButtonAction={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  promoLandingContainer: {
    flex: 1
  },
  bottomBar: {
    paddingBottom: 24
  }
});

export default PromoLanding;
