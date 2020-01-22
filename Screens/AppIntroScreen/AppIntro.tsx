import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import Animated from "react-native-reanimated";
import {
  responsiveWidth,
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import IntroCoverImage from "./Components/IntroCoverImage";
import IntroTextSection from "./Components/IntroTextSection";
import IntroCarouselActionBar from "./Components/IntroCarouselActionBar";

import { CONSTANT_white1 } from "../../constants/colorPallete";

export interface IAppIntroData {
  title: string;
  description: string;
  image: string;
}

export interface AppIntroProps {
  appIntroData: IAppIntroData[];
}

const { Value, event } = Animated;

const AppIntro = ({ appIntroData }: AppIntroProps) => {
  const scrollX = new Value(0);

  return (
    <View style={styles.appIntroContainer}>
      {/* Cover image component starts */}
      <IntroCoverImage
        containerStyle={styles.coverImageContainer}
        appIntroData={appIntroData}
        scrollX={scrollX}
      />
      {/* Cover image component ends */}

      {/* Text section component starts */}
      <Animated.ScrollView
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
        {appIntroData.map((appIntroObj, index) => {
          return (
            <IntroTextSection
              key={index}
              title={appIntroObj.title}
              description={appIntroObj.description}
              containerStyle={styles.introTextContainer}
            />
          );
        })}
      </Animated.ScrollView>
      {/* Text section component ends */}

      {/* Carousel Action Bar component starts */}
      <IntroCarouselActionBar
        containerStyle={styles.introCarouselContainer}
        hideBackButton={true}
        appIntroData={appIntroData}
        scrollX={scrollX}
        clickBackButton={() => Alert.alert("Click Back")}
        clickNextButton={() => Alert.alert("Click Next")}
      />
      {/* Carousel Action Bar component ends */}
    </View>
  );
};

/* ACTIONBAR BASE SPACER */
const ACTIONBAR_SPACING = 32;

const ACTIONBAR_BOTTOM_SPACING = ACTIONBAR_SPACING;
const ACTIONBAR_LEFT_SPACING = ACTIONBAR_SPACING;
const ACTIONBAR_RIGHT_SPACING = ACTIONBAR_SPACING;

const styles = StyleSheet.create({
  appIntroContainer: {
    flex: 1,
    height: responsiveHeight(100),
    backgroundColor: CONSTANT_white1
  },

  coverImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: responsiveWidth(100),
    height: responsiveHeight(60)
  },

  introCarouselContainer: {
    position: "absolute",
    left: ACTIONBAR_LEFT_SPACING,
    right: ACTIONBAR_RIGHT_SPACING,
    bottom: ACTIONBAR_BOTTOM_SPACING,
    width:
      responsiveWidth(100) - ACTIONBAR_LEFT_SPACING - ACTIONBAR_RIGHT_SPACING
  },

  introTextContainer: {
    width: responsiveWidth(100),
    justifyContent: "flex-end",
    paddingHorizontal: ACTIONBAR_SPACING,
    marginBottom: ACTIONBAR_BOTTOM_SPACING + 88
  }
});

export default AppIntro;
