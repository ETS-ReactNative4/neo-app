import React, { ReactNode, useRef } from "react";
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
import { CONSTANT_white, CONSTANT_shade6 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_arrowRight } from "../../constants/imageAssets";
import {
  CONSTANT_platformIos,
  CONSTANT_platformAndroid
} from "../../constants/stringConstants";
import {
  CONSTANT_xNotchHeight,
  CONSTANT_statusBarHeight
} from "../../constants/styles";
import { isIphoneX } from "react-native-iphone-x-helper";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import BlankSpacer from "../BlankSpacer/BlankSpacer";

interface ParallaxScrollViewProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
  bannerImage: string;
  backAction?: () => any;
  smallText?: string;
  titleText?: string;
  titleNumberOfLines?: number;
  enableGradient?: boolean;
  hideStickyHeader?: boolean;
}

export const PARALLAX_BANNER_WIDTH = responsiveWidth(100);
export const PARALLAX_BANNER_HEIGHT =
  ratioCalculator(3, 2, PARALLAX_BANNER_WIDTH) +
  (isIphoneX() ? CONSTANT_xNotchHeight : 0);
const SCROLL_OFFSET = -PARALLAX_BANNER_HEIGHT + 20;
const SCROLL_INSET = PARALLAX_BANNER_HEIGHT - 20;

export const ParallaxScrollViewBannerHeight = PARALLAX_BANNER_HEIGHT;

const {
  Value,
  event,
  createAnimatedComponent,
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
  backAction,
  smallText,
  titleText,
  titleNumberOfLines = 1,
  children,
  enableGradient = false,
  hideStickyHeader = false
}: ParallaxScrollViewProps) => {
  const blurViewRef = useRef<BlurView>(null);

  const animatedScrollIndex = useRef(
    new Value(Platform.OS === CONSTANT_platformAndroid ? 0 : SCROLL_OFFSET)
  ).current;

  const range =
    Platform.OS === CONSTANT_platformIos
      ? [SCROLL_OFFSET, 0]
      : [0, PARALLAX_BANNER_HEIGHT];

  const titlePostionY = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [150, 66],
    extrapolate: Extrapolate.CLAMP
  });

  const textOpacity = interpolate(animatedScrollIndex, {
    inputRange: [
      Platform.OS === CONSTANT_platformIos ? SCROLL_OFFSET : 0,
      Platform.OS === CONSTANT_platformIos
        ? SCROLL_OFFSET / 2
        : PARALLAX_BANNER_HEIGHT / 2
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const infoTextPostionY = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [184, 100],
    extrapolateLeft: Extrapolate.CLAMP
  });

  const bannerHeight = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [PARALLAX_BANNER_HEIGHT, 84],
    extrapolateLeft: Extrapolate.EXTEND,
    extrapolateRight: Extrapolate.CLAMP
  });

  const headerOpacity = interpolate(animatedScrollIndex, {
    inputRange: range,
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const titleTextStyle = {
    opacity: textOpacity,
    top: titlePostionY
  };

  const infoTextStyle = {
    opacity: textOpacity,
    top: infoTextPostionY
  };

  const bannerContainerStyle = {
    height: bannerHeight
  };

  const parallaxHeaderStyle = {
    opacity: headerOpacity
  };

  const gradientOptions = {
    locations: [0.25, 0.5, 0.6, 1],
    colors: [
      "rgba(0,0,0,0.05)",
      "rgba(0,0,0,0.25)",
      "rgba(0,0,0,0.45)",
      "rgba(0,0,0,0.65)"
    ]
  };

  const transparentGradient = {
    colors: ["transparent"],
    locations: [1]
  };

  const bgImageStyle = {
    backgroundColor: enableGradient ? "rgba(0,0,0,0.65)" : CONSTANT_shade6
  };

  const gradient = enableGradient ? gradientOptions : transparentGradient;

  const ItineraryCover = enableGradient ? LinearGradient : View;

  return (
    <View style={[styles.parallaxScrollViewContainer, containerStyle]}>
      <AnimatedView
        style={[styles.parallaxBannerImageContainer, bannerContainerStyle]}
      >
        <AnimatedImageBackground
          source={{ uri: bannerImage }}
          resizeMode={"cover"}
          style={[styles.bannerImageStyle, bgImageStyle]}
        >
          <ItineraryCover {...gradient} style={styles.gradientView}>
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
          </ItineraryCover>
        </AnimatedImageBackground>
      </AnimatedView>

      <AnimatedScrollView
        removeClippedSubviews
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
        {/** Android uses margin to push content below banner hence additional blank spacer is needed */}
        {Platform.OS === CONSTANT_platformAndroid ? (
          <BlankSpacer height={PARALLAX_BANNER_HEIGHT} />
        ) : null}
      </AnimatedScrollView>
      {!hideStickyHeader ? (
        <AnimatedView style={[styles.parallaxHeader, parallaxHeaderStyle]}>
          {Platform.OS === CONSTANT_platformAndroid ? (
            <View style={styles.headerViewAndroid} />
          ) : (
            <BlurView
              ref={blurViewRef}
              blurType={"dark"}
              blurAmount={50}
              blurRadius={5}
              style={styles.blurViewStyle}
            />
          )}
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={styles.headerTitle}
          >
            {titleText}
          </Text>
        </AnimatedView>
      ) : null}
      {backAction ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={backAction}
          style={styles.backArrowWrapper}
        >
          <View style={styles.backArrowIconStyle}>
            <Icon name={CONSTANT_arrowRight} size={14} color={CONSTANT_white} />
          </View>

          <Text style={styles.backTextStyle}>BACK</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const BLUR_HEADER_HEIGHT =
  64 + CONSTANT_statusBarHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0);

const styles = StyleSheet.create({
  parallaxScrollViewContainer: {
    flex: 1
  },
  parallaxBannerImageContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: PARALLAX_BANNER_HEIGHT
  },
  bannerImageStyle: {
    flex: 1
  },
  gradientView: {
    flex: 1
  },
  backArrowWrapper: {
    position: "absolute",
    top:
      24 + CONSTANT_statusBarHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0),
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
  parallaxHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: responsiveWidth(100),
    height: BLUR_HEADER_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  infoTextStyle: {
    position: "absolute",
    color: CONSTANT_white,
    left: 24,
    width: responsiveWidth(60),
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 16)
  },
  titleTextStyle: {
    position: "absolute",
    marginBottom: 8,
    left: 24,
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 28)
  },
  blurViewStyle: {
    position: "absolute",
    width: responsiveWidth(100),
    height: BLUR_HEADER_HEIGHT
  },
  headerViewAndroid: {
    position: "absolute",
    width: responsiveWidth(100),
    height: BLUR_HEADER_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  headerTitle: {
    marginBottom: 19,
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 28),
    width: responsiveWidth(30)
  },
  scrollViewBodyContainer: {
    backgroundColor: CONSTANT_white,
    ...Platform.select({
      android: {
        marginTop: PARALLAX_BANNER_HEIGHT
      },
      ios: {
        /**
         * Only iOS can have border radius
         * Due to https://github.com/facebook/react-native/issues/15826 😭
         */
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
      }
    })
  }
});

export default ParallaxScrollView;
