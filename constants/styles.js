import { isIphoneX } from "react-native-iphone-x-helper";
import { StyleSheet } from "react-native";
import colorPallete from "./colorPallete";
import fonts from "./fonts";

const styles = {
  tabBarBottomHeight: isIphoneX() ? 86 : 56,
  headerHeight: 56,
  xSensorAreaHeight: 30,
  xNotchHeight: 30,
  commonDateFormat: "MMM DD, ddd",
  visaDateFormat: "MMM DD, YYYY",
  shortCommonDateFormat: "MMM DD",
  commonDateFormatReverse: "ddd, DD MMM",
  shortTimeFormat: "hh:mm a",
  voucherDateFormat: "YYYY-MM-DD",
  costingDateFormat: "DD/MMM/YYYY",
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
  },
  journalImagePicker: {
    selectedImageHeight: 168,
    selectedImageWidth: 270
  }
};

export const CONSTANT_tabBarBottomHeight = isIphoneX() ? 86 : 56;
export const CONSTANT_headerHeight = 56;
export const CONSTANT_bottomBarHeight = 60;
export const CONSTANT_xSensorAreaHeight = 30;
export const CONSTANT_xNotchHeight = 30;
export const CONSTANT_statusBarHeight = 20;
export const CONSTANT_commonDateFormat = "MMM DD, ddd";
export const CONSTANT_visaDateFormat = "MMM DD, YYYY";
export const CONSTANT_shortCommonDateFormat = "MMM DD";
export const CONSTANT_commonDateFormatReverse = "ddd, DD MMM";
export const CONSTANT_shortTimeFormat = "hh:mm a";
export const CONSTANT_GCMDateFormat = "DD MMM YYYY";
export const CONSTANT_voucherDateFormat = "YYYY-MM-DD";
export const CONSTANT_costingDateFormat = "DD/MMM/YYYY";
export const CONSTANT_currentYear = new Date().getYear() + 1900;
export const CONSTANT_htmlStyleSheet = StyleSheet.create({
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
});
export const CONSTANT_elevationTwo = {
  shadowColor: colorPallete.shade3,
  shadowOffset: { height: 1, width: 1 },
  shadowOpacity: 1,
  shadowRadius: 1,
  elevation: 2
};
export const CONSTANT_elevationFive = {
  shadowColor: colorPallete.shade3,
  shadowOffset: { height: 0, width: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: 5
};
export const CONSTANT_elevationThirteen = {
  shadowColor: colorPallete.shade3,
  shadowOffset: {
    height: 5,
    width: 0
  },
  shadowRadius: 10,
  shadowOpacity: 0.5,
  elevation: 13
};
export const CONSTANT_journalImagePicker = {
  selectedImageHeight: 168,
  selectedImageWidth: 270
};

export default styles;
