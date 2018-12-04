import React, { Component } from "react";
import { UIManager } from "react-native";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { setNavigationService } from "./Services/navigationService/navigationService";
import { updateStoreService } from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";
import NetStatMonitor from "./CommonComponents/NetStatMonitor/NetStatMonitor";
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
  }

  componentWillUnmount() {
    this._onNotificationReceived && this._onNotificationReceived();
    this._onNotificationDisplayed && this._onNotificationDisplayed();
    this._onNotificationOpened && this._onNotificationOpened();
  }

  render() {
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
  }
}

export default App;
