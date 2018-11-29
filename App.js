import React, { Component } from "react";
import { UIManager } from "react-native";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { setNavigationService } from "./Services/navigationService/navigationService";
import { updateStoreService } from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";
import NetStatMonitor from "./CommonComponents/NetStatMonitor/NetStatMonitor";
import storeService from "./Services/storeService/storeService";
import constants from "./constants/constants";
import RNRestart from "react-native-restart";
import { logError } from "./Services/errorLogger/errorLogger";
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

class App extends Component {
  state = {
    _errorShown: false
  };
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

  componentDidCatch(error) {
    if (__DEV__) {
      return;
    }

    logError(error);

    if (this.state._errorShown) {
      return;
    }

    this.setState({
      _errorShown: true
    });

    storeService.infoStore.setError(
      "Something went wrong!",
      "We encountered a problem and need the app to restart...",
      constants.errorBoxIllus,
      "Restart!",
      RNRestart.Restart
    );
  }

  componentWillUnmount() {
    this._onNotificationReceived && this._onNotificationReceived();
    this._onNotificationDisplayed && this._onNotificationDisplayed();
    this._onNotificationOpened && this._onNotificationOpened();
    this._getInitialNotification && this._getInitialNotification();
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
