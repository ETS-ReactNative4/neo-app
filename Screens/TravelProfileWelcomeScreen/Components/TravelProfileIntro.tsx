import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import { CONSTANT_shade4 } from "../../../constants/colorPallete";

import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";

export interface TravelProfileIntroProps {
  containerStyle?: StyleProp<ViewStyle>;
  onClickContinue: () => any;
}

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

const INTRO_IMAGE_WIDTH = responsiveWidth(100) - GUTTER_SPACING * 2;
const INTRO_IMAGE_HEIGHT = ratioCalculator(592, 626, INTRO_IMAGE_WIDTH);

const TravelProfileIntro = ({
  containerStyle,
  onClickContinue
}: TravelProfileIntroProps) => {
  return (
    <View style={[styles.profileIntroContainer, containerStyle]}>
      <SmartImageV2
        resizeMode={"cover"}
        source={{
          uri: "https://pyt-images.imgix.net/images/cityImages/157/milan-2.jpg"
        }}
        fallbackSource={{
          uri: "https://pyt-images.imgix.net/images/cityImages/157/milan-2.jpg"
        }}
        style={styles.introImageStyle}
      />
      <SectionTitle
        smallTitle={"WELCOME,"}
        title={"Travel styles vary and we’d like to get to know yours."}
        description={
          "We’ll use your preference info to make better and more relevant recommendations."
        }
        titleNumberOfLines={2}
      />

      <View style={styles.buttonWrapperStyle}>
        <PrimaryButton
          text={"Sure, let’s do this"}
          clickAction={onClickContinue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileIntroContainer: {
    paddingHorizontal: GUTTER_SPACING,
    flex: 1,
    flexDirection: "column"
  },

  introImageStyle: {
    width: INTRO_IMAGE_WIDTH,
    height: INTRO_IMAGE_HEIGHT,
    marginBottom: 40,
    borderRadius: 4,
    backgroundColor: CONSTANT_shade4
  },

  buttonWrapperStyle: {
    position: "absolute",
    left: LEFT_SPACING,
    right: RIGHT_SPACING,
    bottom: BOTTOM_SPACING,
    width: responsiveWidth(100) - LEFT_SPACING - RIGHT_SPACING
  }
});

export default TravelProfileIntro;
