import { CustomTabs } from "react-native-custom-tabs";
import { logError } from "../errorLogger/errorLogger";

const openCustomTab = (url, success = () => null, failure = () => null) => {
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
};

export default openCustomTab;
