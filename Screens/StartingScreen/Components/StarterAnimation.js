import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  LayoutAnimation,
  Platform
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import debouncer from "../../../Services/debouncer/debouncer";
import { isIphoneX } from "react-native-iphone-x-helper";

const StarterAnimation = () => {
  const [stage, setStage] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (!isAnimated) {
      setIsAnimated(true);
      animateViews();
    }
  }, [isAnimated]);

  const animateViews = () => {
    const firstAnimationDuration = 1200;
    debouncer(() => {
      LayoutAnimation.configureNext({
        duration: firstAnimationDuration,
        update: {
          type: LayoutAnimation.Types.easeOut
        }
      });
      setStage(1);
    });
  };

  return (
    <View style={styles.starterAnimationContainer}>
      <Image
        source={constants.starterTopImage}
        style={[
          styles.topImage,
          stage === 0 ? styles.topImageStart : styles.topImageEnd
        ]}
      />
      <Image
        source={constants.starterBottomImage}
        style={[
          styles.bottomImage,
          stage === 0 ? styles.bottomImageStart : styles.bottomImageEnd
        ]}
      />
    </View>
  );
};

const topImageHeight = Platform.OS === constants.platformAndroid ? 400 : 360;

const styles = StyleSheet.create({
  starterAnimationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: "white"
  },
  topImage: {
    position: "absolute",
    overflow: "visible",
    width: responsiveWidth(100),
    height: topImageHeight
  },
  topImageStart: {
    top: -topImageHeight
  },
  topImageEnd: {
    top: isIphoneX() ? 0 : -60
  },
  bottomImage: {
    position: "absolute",
    overflow: "visible",
    width: responsiveWidth(100),
    height: responsiveHeight(35)
  },
  bottomImageStart: {
    bottom: -responsiveHeight(35),
    right: Platform.OS === constants.platformAndroid ? 0 : -responsiveWidth(75)
  },
  bottomImageEnd: {
    bottom: 0,
    right: 0
  }
});

export default StarterAnimation;
