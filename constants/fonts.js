import { Platform } from "react-native";

const primaryFont = {
  primaryRegular: Platform.OS === "ios" ? "PTSans-Regular" : "PT Sans",
  primaryLight: Platform.OS === "ios" ? "PTSans-Caption" : "PT Sans Caption",
  primarySemiBold: Platform.OS === "ios" ? "PTSans-Bold" : "PT Sans Bold"
};

const font10 = fontFamily => {
  return {
    fontFamily,
    fontSize: 10,
    lineHeight: 16
  };
};

const font11 = fontFamily => {
  return {
    fontFamily,
    fontSize: 11,
    lineHeight: 16
  };
};

const font13 = fontFamily => {
  return {
    fontFamily,
    fontSize: 13,
    lineHeight: 16
  };
};

const font17 = fontFamily => {
  return {
    fontFamily,
    fontSize: 17,
    lineHeight: 24
  };
};

const font20 = fontFamily => {
  return {
    fontFamily,
    fontSize: 20,
    lineHeight: 24
  };
};

const font24 = fontFamily => {
  return {
    fontFamily,
    fontSize: 24,
    lineHeight: 24
  };
};

const font30 = fontFamily => {
  return {
    fontFamily,
    fontSize: 30,
    lineHeight: 32
  };
};

const fontCustom = (fontFamily, fontSize, lineHeight = null) => {
  return {
    fontFamily,
    fontSize,
    lineHeight: lineHeight || fontSize
  };
};

const font = {
  ...primaryFont,
  font10,
  font11,
  font13,
  font17,
  font20,
  font24,
  font30,
  fontCustom,
  kern1: {
    letterSpacing: -0.2
  },
  kern2: {
    letterSpacing: -0.5
  },
  kern3: {
    letterSpacing: -1
  }
};

export default font;
