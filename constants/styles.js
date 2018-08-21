import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform, StyleSheet } from "react-native";
import colorPallete from "./colorPallete";
import fonts from "./fonts";

const styles = {
  tabBarBottomHeight: isIphoneX() ? 86 : 56,
  headerHeight: Platform.OS === "ios" ? 44 : 56,
  xSensorAreaHeight: 30,
  xNotchHeight: 30,
  currentYear: new Date().getYear() + 1900,
  htmlStyleSheet: StyleSheet.create({
    div: {
      fontFamily: fonts.primaryLight,
      color: colorPallete.black2,
      fontSize: 17,
      lineHeight: 24
    },
    p: {
      fontFamily: fonts.primaryLight,
      color: colorPallete.black2,
      fontSize: 17,
      lineHeight: 24
    },
    li: {
      fontFamily: fonts.primaryLight,
      color: colorPallete.black2,
      fontSize: 17,
      lineHeight: 24
    }
  })
};

export default styles;
