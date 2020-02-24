import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
  StyleSheet
} from "react-native";
import LottieView from "lottie-react-native";

export interface AnimatedLoopToEndProps {
  loopAnimation: any;
  endingAnimation: any;
  loopSpeed?: number;
  endingSpeed?: number;
  isComplete?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Given two lottie animations
 * - animates one in loop while loading
 * - gracefully transitions to ending animation when complete
 */
const AnimatedLoopToEnd = ({
  loopAnimation,
  endingAnimation,
  loopSpeed = 1000,
  endingSpeed = 1000,
  isComplete = false,
  style
}: AnimatedLoopToEndProps) => {
  const loopAnimationTiming = useRef(new Animated.Value(0)).current;
  const endingAnimationTiming = useRef(new Animated.Value(0)).current;
  const [animationSource, setAnimationSource] = useState(loopAnimation);
  const [isEnding, setIsEnding] = useState(false);

  const animateEnding = () => {
    setAnimationSource(endingAnimation);
    setIsEnding(true);
    Animated.timing(endingAnimationTiming, {
      toValue: 1,
      duration: endingSpeed,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  const animateLoop = () => {
    loopAnimationTiming.setValue(0);
    Animated.timing(loopAnimationTiming, {
      toValue: 1,
      duration: loopSpeed,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      if (isComplete) {
        animateEnding();
      } else {
        animateLoop();
      }
    });
  };

  useEffect(() => {
    animateLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style}>
      <LottieView
        style={styles.lottieContainer}
        source={animationSource}
        progress={isEnding ? endingAnimationTiming : loopAnimationTiming}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1
  }
});

export default AnimatedLoopToEnd;
