const ignoredNativeModules = [
  "react-native",
  "react-native-keychain",
  "react-native-iphone-x-helper",
  "react-native-sentry",
  "react-native-firebase",
  "react-native-simple-toast",
  "react-native-responsive-dimensions",
  "react-native-restart",
  "react-navigation",
  "react-navigation-drawer",
  "react-navigation-stack",
  "react-native-screens",
  "react-navigation-tabs",
  "react-native-scrollable-tab-view",
  "react-native-ratings",
  "react-native-progress",
  "react-native-parallax-scroll-view",
  "react-native-linear-gradient",
  "react-native-custom-tabs",
  "react-native-htmlview",
  "react-native-collapsible",
  "react-native-fast-image",
  "react-native-dash",
  "react-native-measureme",
  "react-native-webview",
  "react-native-card-stack-swiper",
  "react-native-modal",
  "react-native-animatable",
  "react-native-particles",
  "@react-native-community/cameraroll",
  "@react-native-community/netinfo",
  "react-native-image-crop-picker",
  "react-native-material-dropdown",
  "react-native-material-ripple",
  "react-native-material-textfield",
  "react-native-material-buttons",
  "react-native-cn-richtext-editor",
  "react-native-app-settings",
  "react-native-tts",
  "react-native-sound",
  "react-native-swipe-list-view",
  "react-native-svg-charts",
  "react-native-svg",
  "react-native-simple-radio-button",
  "react-native-keyboard-aware-scroll-view",
  "react-native-lightbox",
  "react-native-photo-view",
  "react-native-swipe-gestures",
  "@storybook/react-native",
  "@sentry/react-native",
  "react-native-webengage"
];

module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    "./__mocks__/mockRNCNetInfo.js",
    "./__mocks__/mockFirebase.js",
    "./__mocks__/mockSegmentAnalytics.js",
    "./__mocks__/mockNativeEventEmitter.js",
    "./__mocks__/mockWebEngage.js",
    "./__mocks__/mockFreshchat.js"
  ],
  transformIgnorePatterns: [
    `node_modules/(?!(${ignoredNativeModules.join("|")}))`
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coveragePathIgnorePatterns: ["/node_modules/", "constants/", "assets/"]
};
