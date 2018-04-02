const primaryFont = {
  primaryFont: 'Sofia Pro',
  primaryFontSize: 20,
  primaryFontWeight: "300",
  primaryLineHeight: 24,
};

const primaryFontStyle = {
  fontFamily: primaryFont.primaryFont,
  fontWeight: primaryFont.primaryFontWeight,
  fontSize: primaryFont.primaryFontSize,
  lineHeight: primaryFont.primaryLineHeight,
};

const font = {
  ...primaryFont,
  primaryFontStyle,
};

export default font;
