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
const BANNER_HEIGHT =
  ratioCalculator(3, 2, BANNER_WIDTH) +
  (isIphoneX() ? CONSTANT_xNotchHeight : 0);
const SCROLL_OFFSET = -BANNER_HEIGHT + 20;
const SCROLL_INSET = BANNER_HEIGHT - 20;

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
  backAction = () => {},
  smallText,
  titleText,
  titleNumberOfLines = 1,
  children
}: ParallaxScrollViewProps) => {
  const blurViewRef = useRef<BlurView>(null);

  const animatedScrollIndex = useRef(
    new Value(Platform.OS === CONSTANT_platformAndroid ? 0 : SCROLL_OFFSET)
  ).current;

  const range =
    Platform.OS === CONSTANT_platformIos
      ? [SCROLL_OFFSET, 0]
      : [0, BANNER_HEIGHT];

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
        : BANNER_HEIGHT / 2
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
    outputRange: [BANNER_HEIGHT, 84],
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

  return (
    <View style={[styles.parallaxScrollViewContainer, containerStyle]}>
      <AnimatedView
        style={[styles.parallaxBannerImageContainer, bannerContainerStyle]}
      >
        <AnimatedImageBackground
          source={{ uri: bannerImage }}
          resizeMode={"cover"}
          style={styles.bannerImageStyle}
        >
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
      </AnimatedScrollView>
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
        <Text style={styles.headerTitle}>{titleText}</Text>
      </AnimatedView>
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
    </View>
  );
};

const BLUR_HEADER_HEIGHT =
  64 + CONSTANT_statusBarHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0);

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
    backgroundColor: CONSTANT_shade6
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
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 16)
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
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 28)
  },
  scrollViewBodyContainer: {
    backgroundColor: CONSTANT_white,
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: BANNER_HEIGHT
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
