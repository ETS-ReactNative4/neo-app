import React from "react";
import LottieView from "lottie-react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { CONSTANT_preLoaderAnimation } from "../../../constants/imageAssets";

export interface ExploreCardLodingIndicatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  height?: number;
}

const ExploreCardLodingIndicator = ({
  containerStyle,
  height
}: ExploreCardLodingIndicatorProps) => {
  const loadingAnimationWrapperHeight = {
    height: height
  };
  return (
    <View
      style={[
        styles.loadingAnimationWrapper,
        loadingAnimationWrapperHeight,
        containerStyle
      ]}
    >
      <LottieView
        source={CONSTANT_preLoaderAnimation()}
        style={[styles.loadingAnimation]}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingAnimationWrapper: {
    width: responsiveWidth(100)
  },
  loadingAnimation: {
    flex: 1
  }
});

export default ExploreCardLodingIndicator;
