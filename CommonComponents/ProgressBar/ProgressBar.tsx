import React from "react";
import * as Progress from "react-native-progress";

import { View, ViewStyle, StyleSheet, Text } from "react-native";
import { CONSTANT_white } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

interface ProgressBarProps {
  containerStyle?: ViewStyle;
  progressBarStyle?: ViewStyle;
  progress: number;
}

const ProgressBar = ({
  containerStyle,
  progressBarStyle,
  progress = 0
}: ProgressBarProps) => {
  return (
    <View style={[styles.progressBarContainer, containerStyle]}>
      <Progress.Bar
        progress={progress / 100}
        height={6}
        width={82}
        color={"#EEE81E"}
        unfilledColor={"#41AE89"}
        borderWidth={0}
        borderColor={"transparent"}
        borderRadius={14}
        style={[styles.progressBarStyle, progressBarStyle]}
      />

      <Text style={styles.progressBarText}>
        <Text style={styles.boldText}>{progress}% </Text>Completed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {},
  progressBarStyle: {
    marginBottom: 10
  },
  progressBarText: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12)
  },
  boldText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12)
  }
});

export default ProgressBar;
