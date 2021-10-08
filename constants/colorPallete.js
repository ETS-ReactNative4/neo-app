// const pallete1 = {
//   firstColor: `rgba(255, 40, 114, 1)`,

//   firstColorAlpha: alpha => `rgba(255, 87, 109, ${alpha})`
// };

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
  sixteenthColor: `rgba(119, 68, 228, 1)`,
  seventeenthColor: `rgba(236, 71, 71, 1)`, // theme dark red
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
  themeDarkBlueAlpha: alpha => `rgba(80, 138, 232, ${alpha})`,
};

// const pallete3 = {};

const greyPallete = {
  black1: `rgba(44, 47, 66, 1)`,
  black2: `rgba(83, 87, 109, 1)`,

  shade1: `rgba(119, 119, 119, 1)`,
  shade1dot5: `rgba(140, 140, 140, 1)`,
  shade2: `rgba(170, 170, 170, 1)`,
  shade3: `rgba(204, 204, 204, 1)`,
  shade4: `rgba(221, 221, 221, 1)`,
  shade5: `rgba(239, 239, 239, 1)`,
  shade6: `rgba(250, 250, 250, 1)`,
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
  seventhGradientAlpha: alpha => `rgba(77,159,197,${alpha})`,
};

const whitePallete = {
  white1: `rgb(247, 247, 247)`,
};

const chatColorPallete = {
  chatMainColor: 'rgba(0,198,132,1)',
  chatLightColor: 'rgba(249,249,249,1)',
};

const thirdPartyColors = {
  facebookThemeColor: 'rgb(59,89,152)',
  twitterThemeColor: 'rgb(8, 160, 233)',
};

const colorPallete = {
  ...pallete2,
  ...greyPallete,
  ...gradientPallete,
  ...chatColorPallete,
  ...whitePallete,
  ...thirdPartyColors,
  appBackgroundColor: 'white',
  drawerBackgroundColor: 'rgba(46, 124, 239, 1)',
};

export const CONSTANT_chatMainColor = 'rgba(0,198,132,1)';
export const CONSTANT_chatLightColor = 'rgba(249,249,249,1)';

export const CONSTANT_facebookThemeColor = 'rgb(59,89,152)';
export const CONSTANT_twitterThemeColor = 'rgb(8, 160, 233)';

export const CONSTANT_white = `rgb(255, 255, 255)`;
export const CONSTANT_transparent = 'transparent';
export const CONSTANT_white1 = `rgb(247, 247, 247)`;

export const CONSTANT_darkGradient = `rgba(0,0,0,1)`;
export const CONSTANT_firstGradient = `rgba(66,5,62,1)`;
export const CONSTANT_secondGradient = `rgba(222,99,160,1)`;
export const CONSTANT_thirdGradient = `rgba(137,129,195,1)`;
export const CONSTANT_fourthGradient = `rgba(246,168,102,1)`;
export const CONSTANT_fifthGradient = `rgba(69,210,178,1)`;
export const CONSTANT_sixthGradient = `rgba(110,188,118,1)`;
export const CONSTANT_seventhGradient = `rgba(77,159,197,1)`;

export const CONSTANT_darkGradientAlpha = alpha => `rgba(0,0,0,${alpha})`;
export const CONSTANT_firstGradientAlpha = alpha => `rgba(66,5,62,${alpha})`;
export const CONSTANT_secondGradientAlpha = alpha =>
  `rgba(222,99,160,${alpha})`;
export const CONSTANT_thirdGradientAlpha = alpha =>
  `rgba(137,129,195,${alpha})`;
export const CONSTANT_fourthGradientAlpha = alpha =>
  `rgba(246,168,102,${alpha})`;
export const CONSTANT_fifthGradientAlpha = alpha => `rgba(69,210,178,${alpha})`;
export const CONSTANT_sixthGradientAlpha = alpha =>
  `rgba(110,188,118,${alpha})`;
export const CONSTANT_seventhGradientAlpha = alpha =>
  `rgba(77,159,197,${alpha})`;

export const CONSTANT_black1 = `rgba(44, 47, 66, 1)`;
export const CONSTANT_black2 = `rgba(83, 87, 109, 1)`;

export const CONSTANT_shade1 = `rgba(119, 119, 119, 1)`;
export const CONSTANT_shade1dot5 = `rgba(140, 140, 140, 1)`;
export const CONSTANT_shade2 = `rgba(170, 170, 170, 1)`;
export const CONSTANT_shade3 = `rgba(204, 204, 204, 1)`;
export const CONSTANT_shade4 = `rgba(221, 221, 221, 1)`;
export const CONSTANT_shade5 = `rgba(239, 239, 239, 1)`;
export const CONSTANT_shade6 = `rgba(250, 250, 250, 1)`;

export const CONSTANT_firstColor = `rgba(0,198,132,1)`;
export const CONSTANT_firstColorBackground = `rgba(239, 249, 242,1)`;
export const CONSTANT_secondColor = `rgba(255, 201, 51, 1)`;
export const CONSTANT_thirdColor = `rgba(255,40,114,1)`;
export const CONSTANT_fourthColor = `rgba(121,5,114, 1)`;
export const CONSTANT_fifthColor = `rgba(169,233,180,1)`;
export const CONSTANT_sixthColor = `rgba(120,5,114,1)`;
export const CONSTANT_seventhColor = `rgba(24,149,179,1)`;
export const CONSTANT_eighthColor = `rgba(74,144,226,1)`;
export const CONSTANT_ninthColor = `rgba(91,110,234,1)`;
export const CONSTANT_tenthColor = `rgba(239, 174, 97, 1)`;
export const CONSTANT_eleventhColor = `rgba(153, 121, 31, 1)`;
export const CONSTANT_twelfthColor = `rgba(255, 239, 194, 1)`;
export const CONSTANT_thirteenthColor = `rgba(128, 227, 194, 1)`;
export const CONSTANT_fourteenthColor = `rgba(224, 237, 255, 1)`;
export const CONSTANT_fifteenthColor = `rgba(38, 119, 240, 1)`;
export const CONSTANT_sixteenthColor = `rgba(119, 68, 228, 1)`;
export const CONSTANT_seventeenthColor = `rgba(236, 71, 71, 1)`;
export const CONSTANT_eighteenthColor = `rgba(229, 249, 243, 1)`;
export const CONSTANT_nineteenthColor = `rgba(34, 156, 116, 1)`;
export const CONSTANT_twentiethColor = `rgba(0, 139, 92, 1)`;
export const CONSTANT_twentyFirstColor = `rgba(11, 109, 77, 1)`;
export const CONSTANT_twentySecondColor = `rgba(60, 143, 115, 1)`;
export const CONSTANT_twentyThirdColor = `rgba(0, 198, 132, 1)`;
export const CONSTANT_twentyFourthColor = `rgba(40, 121, 94, 1)`;
export const CONSTANT_twentyFifthColor = `rgba(41, 168, 149, 1)`;
export const CONSTANT_twentySixthColor = `rgba(242, 153, 130, 1)`;
export const CONSTANT_twentySeventhColor = `rgb(253, 236, 239, 1)`;
export const CONSTANT_twentyOneColor = `rgba(195, 232, 220, 1)`;
export const CONSTANT_twentyTwoColor = `rgba(0, 119, 79, 1)`;
export const CONSTANT_themeDarkBlue = `rgba(80, 138, 232, 1)`;

export const CONSTANT_firstColorAlpha = alpha => `rgba(0, 198, 132, ${alpha})`;
export const CONSTANT_secondColorAlpha = alpha =>
  `rgba(255, 201, 51, ${alpha})`;
export const CONSTANT_thirdColorAlpha = alpha => `rgba(255,40,114,${alpha})`;
export const CONSTANT_fourthColorAlpha = alpha => `rgba(121,5,114,${alpha})`;
export const CONSTANT_fifthColorAlpha = alpha => `rgba(169,233,180,${alpha})`;
export const CONSTANT_sixthColorAlpha = alpha => `rgba(120,5,114,${alpha})`;
export const CONSTANT_seventhColorAlpha = alpha => `rgba(35,123,226,${alpha})`;
export const CONSTANT_eighthColorAlpha = alpha => `rgba(74,144,226,${alpha})`;
export const CONSTANT_ninthColorAlpha = alpha => `rgba(91,110,234,${alpha})`;
export const CONSTANT_themeDarkBlueAlpha = alpha =>
  `rgba(80, 138, 232, ${alpha})`;
export const CONSTANT_whiteAlpha = alpha => `rgba(255, 255, 255, ${alpha})`;

export const CONSTANT_darkOverlayAlpha = alpha => `rgba(0,0,0,${alpha})`;

export const CONSTANT_appBackgroundColor = 'white';
export const CONSTANT_drawerBackgroundColor = 'rgba(46, 124, 239, 1)';

export default colorPallete;

const colors = {
  primary001: '#E5F9F3',
  primary002: '#00C684',
  primary003: '#009E6A',
  primary004: '#00774F',
  primary005: '#00B277',
  primary006: '#B2EEDA',
  accent001: '#F7F8FB',
  accent002: '#D3C7FF',
  accent003: '#5A3ACF',
  accent004: '#3E2598',
  neutral001: '#ffffff',
  neutral002: '#F7F7F7',
  neutral003: '#D4D4D4',
  neutral004: '#AAAAAA',
  neutral005: '#777777',
  neutral006: '#555555',
  neutral007: '#333333',
  neutral008: '#000000',
  yellow001: '#FFF7E0',
  yellow002: '#FFC933',
  yellow003: '#E5B52E',
  yellow004: '#806519',
  red001: '#FDECEF',
  red002: '#EF435D',
  red003: '#D73C54',
  red004: '#BF364A',
  screenBgColor: '#F5F5F5',
};

export const theme = {
  colors,
};
