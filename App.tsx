import React, {useEffect, Fragment} from 'react';
import {
  NavigationContainer,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';
import appLauncherV2 from './Services/appLauncher/appLauncherV2';
import RNBootSplash from 'react-native-bootsplash';
import AppNavigator from './NavigatorsV2/AppNavigator';
import {updateStoreService} from './Services/storeService/storeService';
import store from './mobx/Store';
import appStartupTasks from './Services/appStartupTasks/appStartupTasks';
import debouncer from './Services/debouncer/debouncer';
import getActiveRouteName from './Services/getActiveRouteName/getActiveRouteName';
import {screenTrackerV2} from './Services/analytics/analyticsService';
import ErrorBoundary from './CommonComponents/ErrorBoundary/ErrorBoundary';
import {updateNavigationService} from './Services/navigationService/navigationServiceV2';
import NetInfo from '@react-native-community/netinfo';
import {Provider} from 'mobx-react';
import AppOverlays from './Screens/AppOverlays/AppOverlays';
import {
  getInitialNotification,
  onNotificationDisplayed,
  onNotificationOpened,
  onNotificationReceived,
} from './Services/fcmService/fcm';

updateStoreService(store);

/**
 * During app development uncomment the following lines
 */
// console.disableYellowBox = true;

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef<NavigationContainerRef>();

  /**
   * TODO: Netinfo uses finally however due to
   * https://github.com/storybookjs/react-native/issues/20
   * We are unable to use finally directly
   *
   * See index.js for the implementation to this workaround
   */
  // @ts-ignore
  // eslint-disable-next-line no-extend-native
  Promise.prototype.finally = global.promiseFinallyFn;
  /**
   * Used to record connectivity changes and record it in mobx
   * To be used across the whole app
   */
  const handleConnectivityChange = (isConnected: boolean) => {
    store.appState.setConnectionStatus(isConnected);
  };
  const unsubscribeNetListener = NetInfo.addEventListener(state =>
    handleConnectivityChange(state.isConnected),
  );

  useEffect(() => {
    appLauncherV2()
      .then(() => {
        RNBootSplash.hide();
      })
      .catch(() => {
        RNBootSplash.hide();
      })
      .finally(() => {
        getInitialNotification();
        onNotificationDisplayed();
        onNotificationOpened();
        onNotificationReceived();
        debouncer(() => {
          appStartupTasks();
        });
      });

    updateNavigationService(navigationRef);

    /**
     * Get the first network connection state when app is launched
     */
    NetInfo.fetch().then(state => handleConnectivityChange(state.isConnected));

    return () => {
      unsubscribeNetListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
  };

  return (
    <Provider {...store}>
      <Fragment>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={screenStateChange}>
          <AppNavigator />
        </NavigationContainer>
        <AppOverlays />
      </Fragment>
    </Provider>
  );
};

export default ErrorBoundary({isRoot: true})(App);
