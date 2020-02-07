import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
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
import { IAnimatedScrollViewRef } from "../../TypeInterfaces/RNComponents/IAnimatedScrollViewRef";
import { NavigationStackProp } from "react-navigation-stack";
import { openSOFeedback } from "../../Services/launchPostBooking/launchPostBooking";
import storeService from "../../Services/storeService/storeService";

export interface IPostBookingIntroData {
  title: string;
  description: string;
  image: string;
}

export interface PostBookingIntroProps {
  navigation: NavigationStackProp<{ introData: IPostBookingIntroData[] }>;
}

const { Value, event, createAnimatedComponent } = Animated;

const AnimatedScrollView = createAnimatedComponent(ScrollView);

const PostBookingIntro = ({ navigation }: PostBookingIntroProps) => {
  const introData: IPostBookingIntroData[] = navigation.getParam(
    "introData",
    []
  );
  const scrollX = new Value(0);
  let activeIndex = 0;
  const animatedScrollView: IAnimatedScrollViewRef = useRef<any>(null);

  const onMomentumScrollEnd = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const activeOffset = scrollEvent.nativeEvent.contentOffset.x;
    activeIndex = Math.ceil(activeOffset / responsiveWidth(100));
  };

  const moveForward = () => {
    if (animatedScrollView.current) {
      animatedScrollView.current.getNode().scrollTo({
        x: (activeIndex + 1) * responsiveWidth(100)
      });
    }
    if (activeIndex === introData.length - 1) {
      openSOFeedback(navigation, storeService.itineraries.selectedItineraryId);
    }
  };

  const moveBack = () => {
    if (animatedScrollView.current) {
      animatedScrollView.current.getNode().scrollTo({
        x: Math.max(0, activeIndex - 1) * responsiveWidth(100)
      });
    }
  };

  return (
    <View style={styles.appIntroContainer}>
      {/* Cover image component starts */}
      <IntroCoverImage
        containerStyle={styles.coverImageContainer}
        appIntroData={introData}
        scrollX={scrollX}
      />
      {/* Cover image component ends */}

      {/* Text section component starts */}
      <AnimatedScrollView
        ref={animatedScrollView}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onMomentumScrollEnd={onMomentumScrollEnd}
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
        {introData.map((appIntroObj, index) => {
          return (
            <IntroTextSection
              key={index}
              title={appIntroObj.title}
              description={appIntroObj.description}
              containerStyle={styles.introTextContainer}
            />
          );
        })}
      </AnimatedScrollView>
      {/* Text section component ends */}

      {/* Carousel Action Bar component starts */}
      <IntroCarouselActionBar
        containerStyle={styles.introCarouselContainer}
        hideBackButton={true}
        appIntroData={introData}
        scrollX={scrollX}
        clickBackButton={moveBack}
        clickNextButton={moveForward}
      />
      {/* Carousel Action Bar component ends */}
    </View>
  );
};

PostBookingIntro.navigationOptions = {
  header: null
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

export default PostBookingIntro;
