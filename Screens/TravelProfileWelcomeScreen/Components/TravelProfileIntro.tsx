import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { CONSTANT_shade4 } from "../../../constants/colorPallete";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import {
  CONSTANT_travelProfileWelcome,
  CONSTANT_defaultPlaceImage
} from "../../../constants/imageAssets";

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
        source={CONSTANT_travelProfileWelcome()}
        fallbackSource={{
          uri: CONSTANT_defaultPlaceImage
        }}
        style={styles.introImageStyle}
      />
      <SectionTitle
        smallTitle={"Hello,"}
        title={"It’s time to explore the world, your way!"}
        description={
          "Tell us what’s on top of your bucket list & we’ll curate a list of exclusive experiences for you."
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
