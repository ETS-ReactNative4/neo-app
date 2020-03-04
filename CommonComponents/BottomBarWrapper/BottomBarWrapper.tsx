import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import {
  CONSTANT_bottomBarHeight,
  CONSTANT_xSensorAreaHeight
} from "../../constants/styles";

const BottomBarWrapper = (BottomBar: (prop: object) => ReactElement) => (
  props: object
) => (
  <View style={styles.bottomBarWrapper}>
    <BottomBar {...props} />
  </View>
);

const styles = StyleSheet.create({
  bottomBarWrapper: {
    height: CONSTANT_bottomBarHeight + CONSTANT_xSensorAreaHeight,
    alignItems: "flex-start",
    backgroundColor: "white"
  }
});

export default BottomBarWrapper;
