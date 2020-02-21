import React, { ReactNode } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import Icon from "../../CommonComponents/Icon/Icon";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import { CONSTANT_white } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_arrowRight } from "../../constants/imageAssets";

interface ParallaxScrollViewProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
  bannerImage: string;
  smallText: string;
  titleText: string;
  titleNumberOfLines?: number;
}

const BANNER_WIDTH = responsiveWidth(100);
const BANNER_HEIGHT = ratioCalculator(3, 2, BANNER_WIDTH);

const ParallaxScrollView = ({
  containerStyle,
  bannerImage,
  smallText,
  titleText,
  titleNumberOfLines,
  children
}: ParallaxScrollViewProps) => {
  return (
    <View style={[styles.parallaxScrollViewContainer, containerStyle]}>
      <View style={styles.parallaxBannerImageContainer}>
        <ImageBackground
          source={{ uri: bannerImage }}
          resizeMode={"cover"}
          style={styles.bannerImageStyle}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <View style={styles.backArrowWrapper}>
              <View style={styles.backArrowIconStyle}>
                <Icon
                  name={CONSTANT_arrowRight}
                  size={14}
                  color={CONSTANT_white}
                />
              </View>

              <Text style={styles.backTextStyle}>BACK</Text>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.smallTextStyle}>{smallText}</Text>
            <Text
              style={styles.titleTextStyle}
              numberOfLines={titleNumberOfLines}
              ellipsizeMode={"tail"}
            >
              {titleText}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentOffset={{ x: 0, y: -BANNER_HEIGHT + 20 }}
        contentInset={{ top: BANNER_HEIGHT - 20 }}
      >
        {children}
      </ScrollView>
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
    paddingVertical: 56,
    paddingHorizontal: 24,
    justifyContent: "space-between"
  },
  backArrowWrapper: {
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
  smallTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15),
    textTransform: "uppercase",
    marginBottom: 8
  },
  titleTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 28)
  },

  scrollViewBodyContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: CONSTANT_white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 20
  }
});

export default ParallaxScrollView;
