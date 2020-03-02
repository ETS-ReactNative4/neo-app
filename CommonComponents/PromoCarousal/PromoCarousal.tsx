import React, { useState } from "react";
import { StyleSheet, View, ScrollView, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import { CONSTANT_shade2 } from "../../constants/colorPallete";
import PromoCarousalImage from "./Components/PromoCarousalImage";

const {
  Value,
  event,
  Extrapolate,
  interpolate,
  createAnimatedComponent
} = Animated;

const AnimatedScrollView = createAnimatedComponent(ScrollView);
const AnimatedView = createAnimatedComponent(View);

interface PromoCarousalProps {
  containerStyle?: ViewStyle;
  images: string[];
}

const PromoCarousal = ({ containerStyle, images = [] }: PromoCarousalProps) => {
  const [scrollX] = useState(new Value(0));

  return (
    <View style={(styles.promoCarousalContainer, containerStyle)}>
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
        {images.slice(0, 5).map((imageData, index) => {
          return (
            <PromoCarousalImage
              key={index}
              image={{
                uri: imageData
              }}
              fallbackImage={{
                uri:
                  "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg"
              }}
            />
          );
        })}
      </AnimatedScrollView>

      <View style={styles.dotContainer}>
        {images.slice(0, 5).map((imageData, index) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  promoCarousalContainer: {},

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
