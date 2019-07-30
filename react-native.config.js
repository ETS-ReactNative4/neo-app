/**
 * Instructions - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library
 */

module.exports = {
  dependencies: {
    "rn-fetch-blob": {
      platforms: {
        ios: null
      }
    },
    "react-native-app-settings": {
      platforms: {
        ios: null
      }
    },
    "react-native-webengage": {
      platforms: {
        ios: null
      }
    }
  }
};
