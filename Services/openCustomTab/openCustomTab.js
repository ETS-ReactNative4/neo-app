import { CustomTabs } from "react-native-custom-tabs";
import { Platform } from "react-native";
import openInApp from "@matt-block/react-native-in-app-browser";
import { logError } from "../errorLogger/errorLogger";

/**
 * TODO: in-app-browser android library is having an issue & CustomTabs iOS library is not working. Need to document this
 */

const openCustomTab = (url, success = () => null, failure = () => null) => {
  if (Platform.OS === "ios") {
    openInApp(url).catch(error => {
      failure(error);
    });
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
        failure();
      });
  }
};

export default openCustomTab;
