const pallete1 = {
  firstColor: `rgba(255, 40, 114, 1)`,

  firstColorAlpha: alpha => `rgba(255, 87, 109, ${alpha})`
};

const greyPallete = {
  black1: `rgba(44, 47, 66, 1)`,
  black2: `rgba(83, 87, 109, 1)`,

  shade1: `rgba(119, 119, 119, 1)`,
  shade2: `rgba(170, 170, 170, 1)`,
  shade3: `rgba(204, 204, 204, 1)`,
  shade4: `rgba(221, 221, 221, 1)`,
  shade5: `rgba(239, 239, 239, 1)`
};

const pallete2 = {
  firstColor: `rgba(47,209,93,1)`,
  secondColor: `rgba(254,218,70,1)`,

  firstColorAlpha: alpha => `rgba(47, 209, 93, ${alpha})`,
  secondColorAlpha: alpha => `rgba(254, 218 ,70, ${alpha})`
};

const pallete3 = {};

const colorPallete = {
  // ...pallete1,
  ...pallete2,
  // ...pallete3,

  ...greyPallete,
  appBackgroundColor: "white",
  drawerBackgroundColor: "rgba(239,239,239,1)"
};

export default colorPallete;
