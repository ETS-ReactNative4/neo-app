import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageStyle,
  StyleProp
} from "react-native";
import Animated from "react-native-reanimated";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SmartImageV2 from "../../SmartImage/SmartImageV2";
import {
  CONSTANT_shade6,
  CONSTANT_black1
} from "../../../constants/colorPallete";
import { Text } from "react-native-animatable";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

const {
  Value,
  event,
  Extrapolate,
  interpolate,
  createAnimatedComponent
} = Animated;

const AnimatedScrollView = createAnimatedComponent(ScrollView);
const AnimatedView = createAnimatedComponent(View);

interface ItineraryCardImageProps {
  images: string[];
  imageStyle?: StyleProp<ImageStyle>;
  tripType: string;
}

const ItineraryCardImage = ({
  images = [],
  tripType = "",
  imageStyle
}: ItineraryCardImageProps) => {
  const [scrollX] = useState(new Value(0));

  return (
    <View style={styles.scrollImageContainer}>
      <View style={styles.tripTypeContainer}>
        <Text style={styles.tripTypeTextStyle}>{tripType}</Text>
      </View>

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
            <SmartImageV2
              key={index}
              source={{
                uri: imageData
              }}
              fallbackSource={{
                uri:
                  "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg"
              }}
              resizeMode="cover"
              style={[styles.itineraryImage, imageStyle]}
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
  itineraryImage: {
    height: 200,
    width: responsiveWidth(100)
  },
  scrollImageContainer: {
    alignItems: "center",
    backgroundColor: CONSTANT_shade6
  },
  tripTypeContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: 8,
    backgroundColor: CONSTANT_shade6,
    borderRadius: 4,
    zIndex: 1
  },
  tripTypeTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 18)
  },
  dotContainer: {
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    zIndex: 1
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 0.5,
    marginHorizontal: 4
  }
});

export default ItineraryCardImage;
