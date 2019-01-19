import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform, StyleSheet } from "react-native";
import colorPallete from "./colorPallete";
import fonts from "./fonts";

const styles = {
  tabBarBottomHeight: isIphoneX() ? 86 : 56,
  headerHeight: 56,
  xSensorAreaHeight: 30,
  xNotchHeight: 30,
  commonDateFormat: "MMM DD, ddd",
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
      lineHeight: 24,
      minHeight: 32
    },
    li: {
      fontFamily: fonts.primaryLight,
      color: colorPallete.black2,
      fontSize: 17,
      lineHeight: 24
    },
    a: {
      color: colorPallete.firstColor,
      fontFamily: fonts.primarySemiBold
    }
  }),
  elevationTwo: {
    shadowColor: colorPallete.shade3,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2
  },
  elevationFive: {
    shadowColor: colorPallete.shade3,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  elevationThirteen: {
    shadowColor: colorPallete.shade3,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 13
  }
};

export default styles;
