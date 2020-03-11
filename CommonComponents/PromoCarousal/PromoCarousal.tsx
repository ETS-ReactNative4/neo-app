import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import { CONSTANT_shade2 } from "../../constants/colorPallete";
import PromoCarousalImage from "./Components/PromoCarousalImage";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";
import BlankSpacer from "../BlankSpacer/BlankSpacer";

const {
  Value,
  event,
  Extrapolate,
  interpolate,
  createAnimatedComponent
} = Animated;

const AnimatedScrollView = createAnimatedComponent(ScrollView);
const AnimatedView = createAnimatedComponent(View);

export interface ICarouselImage {
  url: string;
  action: () => any;
}

export interface PromoCarousalProps {
  containerStyle?: ViewStyle;
  images: ICarouselImage[];
}

const PromoCarousal = ({ containerStyle, images = [] }: PromoCarousalProps) => {
  const scrollX = useRef(new Value(0)).current;

  return (
    <View style={containerStyle}>
      <AnimatedScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX
              }
            }
          }
        ])}
      >
        {images.map((imageData, index) => {
          return (
            <PromoCarousalImage
              key={index}
              image={{
                uri: imageData.url
              }}
              action={imageData.action}
              fallbackImage={{
                uri: CONSTANT_defaultPlaceImage
              }}
            />
          );
        })}
      </AnimatedScrollView>

      <View style={styles.dotContainer}>
        {images.map((imageData, index) => {
          let width: number | Animated.Node<number> = 8,
            opacity: number | Animated.Node<number> = 0.5;
          if (scrollX) {
            width = interpolate(scrollX, {
              inputRange: [
                responsiveWidth(100) * (index - 1),
                responsiveWidth(100) * index,
                responsiveWidth(100) * (index + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: Extrapolate.CLAMP
            });
            opacity = interpolate(scrollX, {
              inputRange: [
                responsiveWidth(100) * (index - 1),
                responsiveWidth(100) * index,
                responsiveWidth(100) * (index + 1)
              ],
              outputRange: [0.5, 1, 0.5],
              extrapolate: Extrapolate.CLAMP
            });
          }
          const widthStyle = { width, opacity };
          return (
            <AnimatedView key={index} style={[styles.dotStyle, widthStyle]} />
          );
        })}
      </View>

      <BlankSpacer height={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: CONSTANT_shade2,
    opacity: 0.5,
    marginHorizontal: 4
  }
});

export default PromoCarousal;
