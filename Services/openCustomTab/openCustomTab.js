import { CustomTabs } from "react-native-custom-tabs";
import { Platform, Linking } from "react-native";
import openInApp from "@matt-block/react-native-in-app-browser";
import { logError } from "../errorLogger/errorLogger";
import constants from "../../constants/constants";

/**
 * TODO: in-app-browser android library is having an issue & CustomTabs iOS library is not working. Need to document this
 */

const openCustomTab = (url, success = () => null, failure = () => null) => {
  /**
   * Fallback that opens urls in traditional way instead of custom tabs
   */
  const fallback = () => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          logError("Can't handle url: " + url);
          failure();
        } else {
          Linking.openURL(url);
          success();
        }
      })
      .catch(err => {
        logError(err);
        failure();
      });
  };
  /**
   * Call fallback if the url is not a web link
   * Since custom tab cannot handle mailto or telephone links
   */
  if (
    !(
      url.startsWith(constants.httpPrefix) ||
      url.startsWith(constants.httpsPrefix)
    )
  ) {
    fallback();
  } else {
    if (Platform.OS === constants.platformIos) {
      /**
       * Call fallback if the iOS version does not properly support custom tabs
       */
      if (parseFloat(Platform.Version) < constants.customTabSupportIos) {
        fallback();
      } else {
        openInApp(url).catch(error => {
          logError(error);
          failure(error);
        });
      }
    } else {
      CustomTabs.openURL(url, {
        showPageTitle: true
      })
        .then(launched => {
          if (!launched) {
            failure();
          }
          success();
        })
        .catch(err => {
          logError(err);
          failure(err);
        });
    }
  }
};

export default openCustomTab;
