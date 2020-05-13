/**
 * Instructions - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library
 */

module.exports = {
  dependencies: {
    "react-native-app-settings": {
      platforms: {
        ios: null,
        android: null
      }
    },
    "react-native-pdf": {
      platforms: {
        ios: null
      }
    },
    "@react-native-community/blur": {
      platforms: {
        android: null
      }
    },
    "react-native-interactable": {
      platforms: {
        android: null
      }
    }
  }
};
