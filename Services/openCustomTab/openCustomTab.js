import {Platform, Linking} from 'react-native';
// import InAppBrowser from "react-native-inappbrowser-reborn";
import {logError} from '../errorLogger/errorLogger';
import getUrlParams from '../getUrlParams/getUrlParams';
import {closeChat} from '../freshchatService/freshchatService';
import {
  SCREEN_PDF_VIEWER,
  SCREEN_MODAL_STACK,
} from '../../NavigatorsV2/ScreenNames';
import navigationServiceV2 from '../navigationService/navigationServiceV2';
import {
  CONSTANT_httpsPrefix,
  CONSTANT_httpPrefix,
  CONSTANT_platformIos,
  CONSTANT_customTabSupportIos,
} from '../../constants/stringConstants';

const openCustomTab = (url, success = () => null, failure = () => null) => {
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
  // const launchTab = () => {
  //   InAppBrowser.open(url)
  //     .then(success)
  //     .catch(failure);
  // };

  /**
   * Call fallback if the url is not a web link
   * Since custom tab cannot handle mailto or telephone links
   */
  if (
    !(
      url.startsWith(CONSTANT_httpPrefix) ||
      url.startsWith(CONSTANT_httpsPrefix)
    )
  ) {
    fallback();
  } else {
    if (Platform.OS === CONSTANT_platformIos) {
      /**
       * Call fallback if the iOS version does not properly support custom tabs
       */
      if (parseFloat(Platform.Version) < CONSTANT_customTabSupportIos) {
        fallback();
      } else {
        launchTab();
      }
    } else {
      /**
       * Open Android PDF Files in Native PDF Viewer
       * use `?customTab=false` query parameter to bypass
       */
      if (url.includes('.pdf') && params.customTab !== 'false') {
        /**
         * Close chat view since android chat view appears over the app
         */
        closeChat();
        // Opens PDF in Native PDF Viewer
        navigationServiceV2(SCREEN_MODAL_STACK, {
          screen: SCREEN_PDF_VIEWER,
          params: {
            pdfUri: url,
          },
        });
      } else {
        launchTab();
      }
    }
  }
};

export default openCustomTab;
