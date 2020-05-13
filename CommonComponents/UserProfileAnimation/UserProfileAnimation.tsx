import React from "react";
import LottieView from "lottie-react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { View, StyleSheet, ImageStyle, StyleProp, Text } from "react-native";
import SmartImageV2 from "../SmartImage/SmartImageV2";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import {
  CONSTANT_twentyFifthColor,
  CONSTANT_twentySixthColor
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_preLoaderAnimation } from "../../constants/imageAssets";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";

interface UserProfileAnimationProps {
  containerStyle?: StyleProp<ImageStyle>;
}

const UserProfileAnimation = ({
  containerStyle
}: UserProfileAnimationProps) => {
  return (
    <SmartImageV2
      source={{
        uri:
          "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/animation-bg.png"
      }}
      resizeMode={"cover"}
      style={[styles.userProfileAnimationContainer, containerStyle]}
    >
      <View>
        <Text style={styles.titleStyle}>YAY! BOOKING COMPLETE</Text>
        <Text style={styles.descriptionStyle}>
          Looks like someone’s going on a holiday real soon :)
        </Text>
      </View>

      <View style={styles.lottieImageContainer}>
        <View style={styles.lottieImage}>
          <LottieView source={CONSTANT_preLoaderAnimation()} autoPlay loop />
        </View>
      </View>

      <PrimaryButton
        text={"Start trip mode"}
        clickAction={() => {}}
        buttonStyle={styles.buttonStyle}
      />
    </SmartImageV2>
  );
};

const styles = StyleSheet.create({
  userProfileAnimationContainer: {
    flex: 1,
    paddingTop: 96
  },
  titleStyle: {
    color: CONSTANT_twentySixthColor,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    textAlign: "center",
    marginBottom: 16
  },
  descriptionStyle: {
    color: CONSTANT_twentyFifthColor,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 22, 28),
    textAlign: "center",
    paddingHorizontal: 48,
    marginBottom: 16
  },
  lottieImageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: responsiveWidth(100)
  },
  lottieImage: {
    width: 200,
    height: 200
  },
  buttonStyle: {
    marginHorizontal: 32,
    marginBottom: 24 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0),
    height: 56
  }
});

export default UserProfileAnimation;
