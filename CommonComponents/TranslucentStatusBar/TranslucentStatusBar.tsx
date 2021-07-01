import React from "react";
import { StatusBar } from "react-native";
import { CONSTANT_transparent } from "../../constants/colorPallete";
import { useIsFocused } from "@react-navigation/native";

/**
 * A component that can automatically make status bar translucent on the
 * screen in which it is rendered.
 *
 * Integrated with react navigation focused state to ensure only the included
 * screen's status bar is made translucent.
 */
const TranslucentStatusBar = () => {
  const isScreenFocused = useIsFocused();

  if (!isScreenFocused) {
    return null;
  }

  return (
    <StatusBar
      translucent={true}
      barStyle={"dark-content"}
      backgroundColor={CONSTANT_transparent}
    />
  );
};

export default TranslucentStatusBar;
