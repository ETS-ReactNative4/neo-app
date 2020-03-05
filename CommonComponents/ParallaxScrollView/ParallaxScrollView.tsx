import React, { ReactNode, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import Animated from "react-native-reanimated";

import Icon from "../../CommonComponents/Icon/Icon";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import { CONSTANT_white, CONSTANT_shade1 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_arrowRight } from "../../constants/imageAssets";
import {
  CONSTANT_platformIos,
  CONSTANT_platformAndroid
} from "../../constants/stringConstants";

interface ParallaxScrollViewProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
  bannerImage: string;
  backAction: () => any;
  smallText: string;
  titleText: string;
  titleNumberOfLines?: number;
}

const BANNER_WIDTH = responsiveWidth(100);
const BANNER_HEIGHT = ratioCalculator(3, 2, BANNER_WIDTH);
const SCROLL_OFFSET = -BANNER_HEIGHT + 20;
const SCROLL_INSET = BANNER_HEIGHT - 20;

const {
  Value,
  event,
  createAnimatedComponent,
  Code,
  call,
  interpolate,
  Extrapolate
} = Animated;
const AnimatedScrollView = createAnimatedComponent(ScrollView);
const AnimatedImageBackground = createAnimatedComponent(ImageBackground);
const AnimatedView = createAnimatedComponent(View);
const AnimatedText = createAnimatedComponent(Text);

const ParallaxScrollView = ({
  containerStyle,
  bannerImage,
  backAction = () => {},
  smallText,
  titleText,
  titleNumberOfLines = 1,
  children
}: ParallaxScrollViewProps) => {
  const animatedScrollIndex = useRef(
    new Value(Platform.OS === CONSTANT_platformAndroid ? 0 : SCROLL_OFFSET)
  ).current;

  const range =
    Platform.OS === CONSTANT_platformIos
      ? [SCROLL_OFFSET, 0]
      : [0, BANNER_HEIGHT];

  const [blurRadius, setBlurRadius] = useState(0);

  const animatedBlurRadius = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [0, 8],
    extrapolate: Extrapolate.CLAMP
  });

  const titlePositionX = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [24, 150],
    extrapolate: Extrapolate.CLAMP
  });

  const titlePostionY = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [150, 17],
    extrapolate: Extrapolate.CLAMP
  });

  const infoTextOpacity = interpolate(animatedScrollIndex, {
    inputRange: [
      Platform.OS === CONSTANT_platformIos ? SCROLL_OFFSET : 0,
      BANNER_HEIGHT - BANNER_HEIGHT / 1.1
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const infoTextPostionY = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [184, 24],
    extrapolateLeft: Extrapolate.CLAMP
  });

  const bannerHeight = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [BANNER_HEIGHT, 84],
    extrapolateLeft: Extrapolate.EXTEND,
    extrapolateRight: Extrapolate.CLAMP
  });

  const bannerZIndex = interpolate(animatedScrollIndex, {
    inputRange:
      Platform.OS === CONSTANT_platformIos
        ? [SCROLL_OFFSET, SCROLL_OFFSET / 2]
        : [0, BANNER_HEIGHT / 2],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const titleTextStyle = {
    left: titlePositionX,
    top: titlePostionY
  };

  const infoTextStyle = {
    opacity: infoTextOpacity,
    top: infoTextPostionY
  };

  const bannerContainerStyle = {
    height: bannerHeight,
    zIndex: bannerZIndex
  };

  return (
    <View style={[styles.parallaxScrollViewContainer, containerStyle]}>
      <Code>
        {() =>
          call([animatedBlurRadius], ([blurRadiusValue]) =>
            setBlurRadius(blurRadiusValue)
          )
        }
      </Code>
      <AnimatedView
        style={[styles.parallaxBannerImageContainer, bannerContainerStyle]}
      >
        <AnimatedImageBackground
          source={{ uri: bannerImage }}
          resizeMode={"cover"}
          style={styles.bannerImageStyle}
          blurRadius={blurRadius}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={backAction}
            style={styles.backArrowWrapper}
          >
            <View style={styles.backArrowIconStyle}>
              <Icon
                name={CONSTANT_arrowRight}
                size={14}
                color={CONSTANT_white}
              />
            </View>

            <Text style={styles.backTextStyle}>BACK</Text>
          </TouchableOpacity>

          <View>
            <AnimatedText
              style={[styles.titleTextStyle, titleTextStyle]}
              numberOfLines={titleNumberOfLines}
              ellipsizeMode={"tail"}
            >
              {titleText}
            </AnimatedText>
            <AnimatedText style={[styles.infoTextStyle, infoTextStyle]}>
              {smallText}
            </AnimatedText>
          </View>
        </AnimatedImageBackground>
      </AnimatedView>

      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        contentOffset={{ x: 0, y: SCROLL_OFFSET }}
        contentInset={{ top: SCROLL_INSET }}
        contentContainerStyle={styles.scrollViewBodyContainer}
        scrollEventThrottle={1}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: animatedScrollIndex
              }
            }
          }
        ])}
      >
        {children}
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parallaxScrollViewContainer: {
    flex: 1
  },
  parallaxBannerImageContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: BANNER_HEIGHT
  },
  bannerImageStyle: {
    flex: 1,
    backgroundColor: CONSTANT_shade1
  },
  backArrowWrapper: {
    position: "absolute",
    top: 24,
    left: 24,
    width: 64,
    flexDirection: "row",
    alignItems: "center"
  },
  backArrowIconStyle: {
    transform: [{ scaleX: -1 }]
  },
  backTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 18),
    textTransform: "uppercase",
    paddingLeft: 4
  },
  infoTextStyle: {
    position: "absolute",
    color: CONSTANT_white,
    left: 24,
    width: responsiveWidth(60),
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 16)
  },
  titleTextStyle: {
    position: "absolute",
    marginBottom: 8,
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 28)
  },

  scrollViewBodyContainer: {
    backgroundColor: CONSTANT_white,
    ...Platform.select({
      android: {
        marginTop: BANNER_HEIGHT
      },
      ios: {
        /**
         * Only iOS can have border radius
         * Due to https://github.com/facebook/react-native/issues/15826
         */
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
      }
    })
  }
});

export default ParallaxScrollView;
