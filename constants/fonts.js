/**
 * Font name of android is the font file's name,
 * Font name of iOS is the font's name in its meta data
 */
const primaryFont = {
  primaryRegular: "SourceSansPro-Regular",
  primaryLight: "SourceSansPro-Regular",
  primarySemiBold: "SourceSansPro-SemiBold"
};

export const CONSTANT_fontPrimaryRegular = primaryFont.primaryRegular;
export const CONSTANT_fontPrimaryLight = primaryFont.primaryLight;
export const CONSTANT_fontPrimarySemiBold = primaryFont.primarySemiBold;

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

export const CONSTANT_primaryRegular = "SourceSansPro-Regular";
export const CONSTANT_primaryLight = "SourceSansPro-Regular";
export const CONSTANT_primarySemiBold = "SourceSansPro-SemiBold";
export const CONSTANT_font10 = font10;
export const CONSTANT_font11 = font11;
export const CONSTANT_font13 = font13;
export const CONSTANT_font17 = font17;
export const CONSTANT_font20 = font20;
export const CONSTANT_font24 = font24;
export const CONSTANT_font30 = font30;
export const CONSTANT_fontCustom = fontCustom;
export const CONSTANT_kern1 = { letterSpacing: -0.2 };
export const CONSTANT_kern2 = { letterSpacing: -0.5 };
export const CONSTANT_kern3 = { letterSpacing: -1 };

export default font;
