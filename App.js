import React, { Component } from "react";
import { UIManager } from "react-native";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { logBreadCrumb } from "./Services/errorLogger/errorLogger";
import { setNavigationService } from "./Services/navigationService/navigationService";
import { updateStoreService } from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

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
  }
};

const App = () => {
  updateStoreService(store);
  return (
    <Provider {...store}>
      <AppNavigator
        ref={setNavigationService}
        onNavigationStateChange={screenTracker}
      />
    </Provider>
  );
};

export default App;
