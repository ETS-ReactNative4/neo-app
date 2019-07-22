/**
 * Instructions - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library
 */

module.exports = {
  dependencies: {
    "react-native-webp-support": {
      platforms: {
        ios: null
      }
    },
    "rn-fetch-blob": {
      platforms: {
        ios: null
      }
    }
    // "@matt-block/react-native-in-app-browser": {
    //   platforms: {
    //     ios: null,
    //     android: null
    //   }
    // }
  }
};
