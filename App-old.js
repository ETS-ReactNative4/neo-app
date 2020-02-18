import React, { Component, Fragment } from "react";
import { UIManager } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { setNavigationService } from "./Services/navigationService/navigationService";
import { updateStoreService } from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";
import {
  disableAnalytics,
  enableAnalytics,
  screenTracker
} from "./Services/analytics/analyticsService";
import ErrorBoundary from "./CommonComponents/ErrorBoundary/ErrorBoundary";
import { isProduction } from "./Services/getEnvironmentDetails/getEnvironmentDetails";
import AppOverlays from "./Screens/AppOverlays/AppOverlays";
import constants from "./constants/constants";
import debouncer from "./Services/debouncer/debouncer";
import navigationServiceV2 from "./Services/navigationService/navigationServiceV2";

updateStoreService(store);

/**
 * During app development uncomment the following lines
 */
// console.disableYellowBox = true;

@ErrorBoundary({ isRoot: true })
class App extends Component {
  componentDidMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    if (!__DEV__ && isProduction()) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleFirstConnectivityChange(isConnected);
    });

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = isConnected => {
    store.appState.setConnectionStatus(isConnected);
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  _navigationStateChange = (prevState, currentState) => {
    /**
     * Making this call asynchronous to prevent it
     * from blocking the APP Screen transitions
     */
    debouncer(() => {
      store.feedbackPrompt.trackScreen(prevState, currentState);
      screenTracker(prevState, currentState);
    });
  };

  _exportNavigationReference = navigatorRef => {
    navigationServiceV2.setTopLevelNavigator(navigatorRef);
    setNavigationService(navigatorRef);
  };

  render() {
    return (
      <Provider {...store}>
        <Fragment>
          <AppNavigator
            ref={this._exportNavigationReference}
            uriPrefix={constants.deepLinkPrefix}
            enableURLHandling={false}
            onNavigationStateChange={this._navigationStateChange}
          />
          <AppOverlays />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
