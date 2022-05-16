import React, {useEffect, Fragment, createContext, useReducer} from 'react';
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
import constants from './constants/constants';
import apiCall from './Services/networkRequests/apiCall';

updateStoreService(store);

/**
 * During app development uncomment the following lines
 */
// console.disableYellowBox = true;

const initialState = {
  tokens: {},
  userData: {
    user_id: '',
    username: '',
    lead_pool_status: '',
    emp_code: '',
    email_id: '',
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TOKEN':
      return {
        ...state,
        tokens: action.payload.tokens,
      };
    case 'FETCH_USER':
      return {
        ...state,
        userData: action.payload.userData,
      };
    case 'FETCH_ERROR':
      return {
        name: 'err',
      };
    default:
      return state;
  }
};

const datainitialState = {
  callResponse: {},
};
const datareducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        master: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        master: {},
      };
    default:
      return state;
  }
};
export const dataContext = createContext();
export const userContext = createContext();

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef<NavigationContainerRef>();
  const [users, dispatch] = useReducer(reducer, initialState);
  const [dataApi, dispatchRes] = useReducer(datareducer, datainitialState);

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

  useEffect(() => {
    let apis = {
      trailStatuses: `${constants.trailStatuses}`,
      callResponses: `${constants.callResponses}`,
      reasons: `${constants.reasons}`,
      cities: `${constants.cities}`,
      allUsers: `${constants.allUsers}`,
      roles: `${constants.roles}`,
      region: `${constants.regions}`,
      tempHotels: `${constants.tempHotels}`,
    };
    Promise.all(Object.values(apis).map(key => apiCall(key, {}, 'GET')))
      .then(res => {
        dispatchRes({type: 'FETCH_SUCCESS', payload: res});
      })
      .catch(() => {});
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
      <dataContext.Provider value={{dataApi, dispatchRes}}>
        <userContext.Provider value={{users, dispatch}}>
          <Fragment>
            <NavigationContainer
              ref={navigationRef}
              onStateChange={screenStateChange}>
              <AppNavigator />
            </NavigationContainer>
            <AppOverlays />
          </Fragment>
        </userContext.Provider>
      </dataContext.Provider>
    </Provider>
  );
};

export default ErrorBoundary({isRoot: true})(App);
