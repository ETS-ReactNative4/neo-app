import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import AnimatedLoopToEnd from "./AnimatedLoopToEnd";
import {
  CONSTANT_pytAnimatedTick,
  CONSTANT_pytAnimatedLoop
} from "../../constants/imageAssets";
import { CONSTANT_shade1 } from "../../constants/colorPallete";

const styles = StyleSheet.create({
  animatedContainer: {
    alignSelf: "center",
    height: 250,
    width: 250,
    backgroundColor: CONSTANT_shade1
  }
});

const AnimatedWrapper = () => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    const animatedTimeout = setTimeout(() => {
      setComplete(true);
    }, 10000);
    return () => clearTimeout(animatedTimeout);
  }, [setComplete]);

  return (
    <AnimatedLoopToEnd
      style={styles.animatedContainer}
      loopAnimation={CONSTANT_pytAnimatedLoop()}
      endingAnimation={CONSTANT_pytAnimatedTick()}
      isComplete={isComplete}
    />
  );
};

const AnimatedLoopToEndTestCases: ITestCase[] = [
  {
    title: "Animated Loop",
    Component: (
      <AnimatedLoopToEnd
        style={styles.animatedContainer}
        loopAnimation={CONSTANT_pytAnimatedLoop()}
        endingAnimation={CONSTANT_pytAnimatedTick()}
      />
    )
  },
  {
    title: "Animated Loop ending in 10s",
    Component: <AnimatedWrapper />
  }
];

export default AnimatedLoopToEndTestCases;
