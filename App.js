import React, { Component } from "react";
import { UIManager, NetInfo } from "react-native";
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

  render() {
    updateStoreService(store);
    return (
      <Provider {...store}>
        <AppNavigator
          ref={setNavigationService}
          onNavigationStateChange={screenTracker}
        />
      </Provider>
    );
  }
}

export default App;
