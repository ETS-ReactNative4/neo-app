import React, { useEffect } from "react";
import {
  NavigationContainer,
  NavigationState,
  NavigationContainerRef
} from "@react-navigation/native";
import appLauncherV2 from "./Services/appLauncher/appLauncherV2";
import RNBootSplash from "react-native-bootsplash";
import AppNavigator from "./NavigatorsV2/AppNavigator";
import { updateStoreService } from "./Services/storeService/storeService";
import store from "./mobx/Store";
import appStartupTasks from "./Services/appStartupTasks/appStartupTasks";
import debouncer from "./Services/debouncer/debouncer";
import getActiveRouteName from "./Services/getActiveRouteName/getActiveRouteName";
import { screenTrackerV2 } from "./Services/analytics/analyticsService";
import ErrorBoundary from "./CommonComponents/ErrorBoundary/ErrorBoundary";
import { updateNavigationService } from "./Services/navigationService/navigationServiceV2";

updateStoreService(store);

/**
 * During app development uncomment the following lines
 */
// console.disableYellowBox = true;

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef<NavigationContainerRef>();

  useEffect(() => {
    appLauncherV2()
      .then(() => {
        RNBootSplash.hide();
      })
      .catch();

    debouncer(() => {
      appStartupTasks();
    });

    updateNavigationService(navigationRef);
  }, []);

  /**
   * Screen tracking implemented based on
   * React navigation V5 docs - https://reactnavigation.org/docs/en/screen-tracking.html
   */
  const screenStateChange = (state: NavigationState | undefined) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      screenTrackerV2(previousRouteName, currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={screenStateChange}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default ErrorBoundary({ isRoot: true })(App);
