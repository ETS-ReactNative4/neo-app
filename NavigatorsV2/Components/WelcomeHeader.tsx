import React from "react";
import { View, StyleSheet } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import TravelProfileHeader from "../../Screens/TravelProfileWelcomeScreen/Components/TravelProfileHeader";
import {
  CONSTANT_headerHeight,
  CONSTANT_xNotchHeight
} from "../../constants/styles";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_white1 } from "../../constants/colorPallete";

export interface IWelcomeHeaderConfig {
  rightLinkText: string;
  onRightLinkClick?: () => any;
  leftLinkText?: string;
  onLeftLinkClick?: () => any;
}

const WelcomeHeader = (
  options: StackHeaderProps,
  {
    rightLinkText = "",
    onRightLinkClick = () => null,
    leftLinkText = "",
    onLeftLinkClick = () => null
  }: IWelcomeHeaderConfig
) => {
  const heightStyle = {
    height: CONSTANT_headerHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0)
  };
  return (
    <View style={[styles.headerWrapper, heightStyle]}>
      <TravelProfileHeader
        rightLinkText={rightLinkText}
        clickRightLink={onRightLinkClick}
        leftLinkText={leftLinkText}
        clickLeftLink={onLeftLinkClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    justifyContent: "flex-end",
    backgroundColor: CONSTANT_white1
  }
});

export default WelcomeHeader;
