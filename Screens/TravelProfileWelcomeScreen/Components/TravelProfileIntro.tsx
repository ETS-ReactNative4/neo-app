import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  Alert
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import {
  CONSTANT_shade4,
  CONSTANT_black1
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";

interface TravelProfileIntroProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const TravelProfileIntro = ({ containerStyle }: TravelProfileIntroProps) => {
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
      <Text style={styles.nameTextStyle}>WELCOME KOUSHIK,</Text>

      <SectionTitle
        title={"Travel styles vary and we’d like to get to know yours."}
        description={
          "We’ll use your preference info to make better and more relevant recommendations."
        }
        titleNumberOfLines={2}
      />

      <View style={styles.buttonWrapperStyle}>
        <PrimaryButton
          text={"Sure, let’s do this"}
          clickAction={() => Alert.alert("Click Button")}
        />
      </View>
    </View>
  );
};

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

const styles = StyleSheet.create({
  profileIntroContainer: {
    paddingHorizontal: GUTTER_SPACING,
    flex: 1,
    flexDirection: "column"
  },

  introImageStyle: {
    height: 314,
    marginBottom: 40,
    borderRadius: 4,
    backgroundColor: CONSTANT_shade4
  },

  nameTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10),
    textTransform: "uppercase",
    marginBottom: 8
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
