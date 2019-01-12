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
import PackageInfo from "./package.json";
import {
  getInitialNotification,
  onNotificationDisplayed,
  onNotificationOpened,
  onNotificationReceived
} from "./Services/fcmService/fcm";
import ErrorBoundary from "./CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary({ isRoot: true })
class App extends Component {
  _onNotificationReceived;
  _onNotificationDisplayed;
  _onNotificationOpened;
  _getInitialNotification;

  componentDidMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    // if (
    //   !__DEV__ &&
    //   PackageInfo.environment === "production"
    // ) {
    enableAnalytics();
    // } else {
    //   disableAnalytics();
    // }

    this._onNotificationDisplayed = onNotificationDisplayed;
    this._onNotificationReceived = onNotificationReceived;
    this._onNotificationOpened = onNotificationOpened;
    this._getInitialNotification = getInitialNotification;

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
    this._onNotificationReceived && this._onNotificationReceived();
    this._onNotificationDisplayed && this._onNotificationDisplayed();
    this._onNotificationOpened && this._onNotificationOpened();

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
