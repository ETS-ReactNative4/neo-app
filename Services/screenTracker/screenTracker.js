import getActiveRouteName from "../getActiveRouteName/getActiveRouteName";
import { logBreadCrumb } from "../errorLogger/errorLogger";
import { analytics } from "react-native-firebase";

const screenTracker = (prevState, currentState) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);

  /**
   * TODO: Check if any data can be added here...
   */
  if (prevScreen !== currentScreen) {
    logBreadCrumb({
      message: `${prevScreen} to ${currentScreen}`,
      category: `navigation`,
      data: {},
      level: "info"
    });
    analytics().setCurrentScreen(currentScreen);
  }
};

export default screenTracker;
