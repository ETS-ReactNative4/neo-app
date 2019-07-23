import { Platform, Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { logError } from "../errorLogger/errorLogger";
import constants from "../../constants/constants";
import navigationService from "../navigationService/navigationService";
import getUrlParams from "../getUrlParams/getUrlParams";

const openCustomTab = (
  url,
  success = () => null,
  failure = () => null,
  pdfViewerComponent = "PDFViewerScreen"
) => {
  const params = getUrlParams(url);

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
   * Function that will launch the custom tab after
   * the conditions are satisfied
   */
  const launchTab = () => {
    InAppBrowser.open(url)
      .then(success)
      .catch(failure);
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
        launchTab();
      }
    } else {
      /**
       * Open Android PDF Files in Native PDF Viewer
       * use `?customTab=false` query parameter to bypass
       */
      if (url.includes(".pdf") && params.customTab !== "false") {
        // Opens PDF in Native PDF Viewer
        const { navigation } = navigationService;
        navigation._navigation.navigate(pdfViewerComponent, {
          pdfUri: url
        });
      } else {
        launchTab();
      }
    }
  }
};

export default openCustomTab;
