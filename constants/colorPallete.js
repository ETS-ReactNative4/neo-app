const pallete1 = {
  firstColor: `rgba(255, 40, 114, 1)`,

  firstColorAlpha: alpha => `rgba(255, 87, 109, ${alpha})`
};

const pallete2 = {
  firstColor: `rgba(0,198,132,1)`, // theme green
  firstColorBackground: `rgba(239, 249, 242,1)`,
  secondColor: `rgba(255, 201, 51, 1)`, // theme yellow
  thirdColor: `rgba(255,40,114,1)`, // theme red
  fourthColor: `rgba(121,5,114, 1)`, // theme red dark
  fifthColor: `rgba(169,233,180,1)`,
  sixthColor: `rgba(120,5,114,1)`,
  seventhColor: `rgba(24,149,179,1)`, // theme blue
  eighthColor: `rgba(74,144,226,1)`,
  ninthColor: `rgba(91,110,234,1)`, // theme purple
  tenthColor: `rgba(239, 174, 97, 1)`, //theme orange
  eleventhColor: `rgba(153, 121, 31, 1)`,
  twelfthColor: `rgba(255, 239, 194, 1)`,
  thirteenthColor: `rgba(128, 227, 194, 1)`, // Drawer BG Color
  fourteenthColor: `rgba(224, 237, 255, 1)`, // Sticky action bars color
  fifteenthColor: `rgba(38, 119, 240, 1)`, // Sticky action text color
  themeDarkBlue: `rgba(80, 138, 232, 1)`,

  firstColorAlpha: alpha => `rgba(0, 198, 132, ${alpha})`,
  secondColorAlpha: alpha => `rgba(255, 201, 51, ${alpha})`,
  thirdColorAlpha: alpha => `rgba(255,40,114,${alpha})`,
  fourthColorAlpha: alpha => `rgba(121,5,114,${alpha})`,
  fifthColorAlpha: alpha => `rgba(169,233,180,${alpha})`,
  sixthColorAlpha: alpha => `rgba(120,5,114,${alpha})`,
  seventhColorAlpha: alpha => `rgba(35,123,226,${alpha})`,
  eighthColorAlpha: alpha => `rgba(74,144,226,${alpha})`,
  ninthColorAlpha: alpha => `rgba(91,110,234,${alpha})`,
  themeDarkBlueAlpha: alpha => `rgba(80, 138, 232, ${alpha})`
};

const pallete3 = {};

const greyPallete = {
  black1: `rgba(44, 47, 66, 1)`,
  black2: `rgba(83, 87, 109, 1)`,

  shade1: `rgba(119, 119, 119, 1)`,
  shade1dot5: `rgba(140, 140, 140, 1)`,
  shade2: `rgba(170, 170, 170, 1)`,
  shade3: `rgba(204, 204, 204, 1)`,
  shade4: `rgba(221, 221, 221, 1)`,
  shade5: `rgba(239, 239, 239, 1)`,
  shade6: `rgba(250, 250, 250, 1)`
};

const gradientPallete = {
  darkGradient: `rgba(0,0,0,1)`,
  firstGradient: `rgba(66,5,62,1)`,
  secondGradient: `rgba(222,99,160,1)`,
  thirdGradient: `rgba(137,129,195,1)`,
  fourthGradient: `rgba(246,168,102,1)`,
  fifthGradient: `rgba(69,210,178,1)`,
  sixthGradient: `rgba(110,188,118,1)`,
  seventhGradient: `rgba(77,159,197,1)`,

  darkGradientAlpha: alpha => `rgba(0,0,0,${alpha})`,
  firstGradientAlpha: alpha => `rgba(66,5,62,${alpha})`,
  secondGradientAlpha: alpha => `rgba(222,99,160,${alpha})`,
  thirdGradientAlpha: alpha => `rgba(137,129,195,${alpha})`,
  fourthGradientAlpha: alpha => `rgba(246,168,102,${alpha})`,
  fifthGradientAlpha: alpha => `rgba(69,210,178,${alpha})`,
  sixthGradientAlpha: alpha => `rgba(110,188,118,${alpha})`,
  seventhGradientAlpha: alpha => `rgba(77,159,197,${alpha})`
};

const whitePallete = {
  white1: `rgb(247, 247, 247)`
};

const chatColorPallete = {
  chatMainColor: "rgba(0,198,132,1)",
  chatLightColor: "rgba(249,249,249,1)"
};

const thirdPartyColors = {
  facebookThemeColor: "rgb(59,89,152)",
  twitterThemeColor: "rgb(8, 160, 233)"
};

const colorPallete = {
  ...pallete2,
  ...greyPallete,
  ...gradientPallete,
  ...chatColorPallete,
  ...whitePallete,
  ...thirdPartyColors,
  appBackgroundColor: "white",
  drawerBackgroundColor: "rgba(46, 124, 239, 1)"
};

export default colorPallete;
