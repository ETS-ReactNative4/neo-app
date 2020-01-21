import React from "react";
import Animated from "react-native-reanimated";

import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";

// @ts-ignore
import { responsiveWidth } from "react-native-responsive-dimensions";

import Icon from "../../../CommonComponents/Icon/Icon";

import {
  CONSTANT_shade6,
  CONSTANT_firstColor,
  CONSTANT_white1
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";
import { IAppIntroData } from "../AppIntro";

const { View: AnimatedView, Extrapolate, interpolate } = Animated;

interface IntroCarouselActionBarProps {
  containerStyle?: StyleProp<ViewStyle>;
  hideBackButton?: boolean;
  scrollX?: Animated.Value<number>;
  appIntroData: IAppIntroData[];
}

const IntroCarouselActionBar = ({
  containerStyle,
  hideBackButton = false,
  appIntroData = [],
  scrollX
}: IntroCarouselActionBarProps) => {
  return (
    <View style={[styles.actionBarContainer, containerStyle]}>
      <View style={styles.buttonViewStyle}>
        {hideBackButton ? (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => Alert.alert("Click Back")}
          >
            <View style={styles.backArrowIconStyle}>
              <Icon
                name={CONSTANT_arrowRight}
                size={16}
                color={CONSTANT_white1}
              />
            </View>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.dotContainer}>
        {appIntroData.map((appIntroObj, index) => {
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

      <View style={styles.buttonViewStyle}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Click Next")}
        >
          <Text style={styles.buttonText}>Next</Text>
          <View style={styles.nextArrowIconStyle}>
            <Icon
              name={CONSTANT_arrowRight}
              size={16}
              color={CONSTANT_white1}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBarContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 4,
    height: 56,
    backgroundColor: CONSTANT_firstColor
  },
  buttonViewStyle: {
    width: 88
  },
  button: {
    width: 88,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: CONSTANT_shade6,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 17)
  },
  backArrowIconStyle: {
    marginRight: 4,
    marginBottom: 4,
    transform: [{ scaleX: -1 }]
  },
  nextArrowIconStyle: {
    marginLeft: 4,
    marginBottom: 2
  },
  dotContainer: {
    flexDirection: "row"
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

export default IntroCarouselActionBar;
