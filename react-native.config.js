/**
 * Instructions - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library
 */

module.exports = {
  dependencies: {
    "react-native-app-settings": {
      platforms: {
        ios: null
      }
    },
    "react-native-pdf": {
      platforms: {
        ios: null
      }
    },
    /**
     * TODO: React Native Permissions is disabled on iOS due to the issues faced in the module
     * - Requesting location is not working
     * - Bluetooth module is detected by app-store review after installing this package
     */
    "react-native-permissions": {
      platforms: {
        ios: null
      }
    }
  }
};
