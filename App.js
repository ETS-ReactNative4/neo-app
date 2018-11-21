import React, { Component } from "react";
import { UIManager } from "react-native";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { logBreadCrumb } from "./Services/errorLogger/errorLogger";
import { setNavigationService } from "./Services/navigationService/navigationService";
import { updateStoreService } from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";
import { analytics } from "react-native-firebase";
import NetStatMonitor from "./CommonComponents/NetStatMonitor/NetStatMonitor";
import getActiveRouteName from "./Services/getActiveRouteName/getActiveRouteName";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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

const App = () => {
  updateStoreService(store);
  return [
    <Provider {...store} key={0}>
      <AppNavigator
        ref={setNavigationService}
        onNavigationStateChange={screenTracker}
      />
    </Provider>,
    <Provider {...store} key={1}>
      <NetStatMonitor />
    </Provider>
  ];
};

export default App;
