const pallete1 = {
  firstColor: `rgba(255, 40, 114, 1)`,

  firstColorAlpha: alpha => `rgba(255, 87, 109, ${alpha})`
};

const pallete2 = {
  firstColor: `rgba(47,209,93,1)`,
  firstColorBackground: `rgba(239, 249, 242,1)`,
  secondColor: `rgba(254,218,70,1)`,
  thirdColor: `rgba(255,40,114,1)`,
  fourthColor: `rgba(121,5,114, 1)`,
  fifthColor: `rgba(169,233,180,1)`,

  firstColorAlpha: alpha => `rgba(47, 209, 93, ${alpha})`,
  secondColorAlpha: alpha => `rgba(254, 218 ,70, ${alpha})`,
  thirdColorAlpha: alpha => `rgba(255,40,114,${alpha})`,
  fourthColorAlpha: alpha => `rgba(121,5,114,${alpha})`,
  fifthColorAlpha: alpha => `rgba(169,233,180,${alpha})`
};

const pallete3 = {};

const greyPallete = {
  black1: `rgba(44, 47, 66, 1)`,
  black2: `rgba(83, 87, 109, 1)`,

  shade1: `rgba(119, 119, 119, 1)`,
  shade2: `rgba(170, 170, 170, 1)`,
  shade3: `rgba(204, 204, 204, 1)`,
  shade4: `rgba(221, 221, 221, 1)`,
  shade5: `rgba(239, 239, 239, 1)`
};

const gradientPallete = {
  firstGradient: `rgba(66,5,62,1)`,
  secondGradient: `rgba(222,99,160,1)`,
  thirdGradient: `rgba(137,129,195,1)`,
  fourthGradient: `rgba(246,168,102,1)`,
  fifthGradient: `rgba(69,210,178,1)`,
  sixthGradient: `rgba(110,188,118,1)`,
  seventhGradient: `rgba(77,159,197,1)`,

  firstGradientAlpha: alpha => `rgba(66,5,62,${alpha})`,
  secondGradientAlpha: alpha => `rgba(222,99,160,${alpha})`,
  thirdGradientAlpha: alpha => `rgba(137,129,195,${alpha})`,
  fourthGradientAlpha: alpha => `rgba(246,168,102,${alpha})`,
  fifthGradientAlpha: alpha => `rgba(69,210,178,${alpha})`,
  sixthGradientAlpha: alpha => `rgba(110,188,118,${alpha})`,
  seventhGradientAlpha: alpha => `rgba(77,159,197,${alpha})`
};

const chatColorPallete = {
  chatMainColor: "rgba(28,173,69,1)",
  chatLightColor: "rgba(249,249,249,1)"
};

const colorPallete = {
  ...pallete2,
  ...greyPallete,
  ...gradientPallete,
  ...chatColorPallete,
  appBackgroundColor: "white",
  drawerBackgroundColor: "rgba(239,239,239,1)"
};

export default colorPallete;
