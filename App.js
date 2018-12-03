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
import DebouncedAlert from "./CommonComponents/DebouncedAlert/DebouncedAlert";
import { View } from "react-native";

class App extends Component {
  state = {
    isCrashed: false
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
    logError(error);

    if (!this.state.isCrashed) {
      this.setState({
        isCrashed: true
      });
      DebouncedAlert(
        "Something went wrong!",
        "We encountered a problem and need the app to restart...",
        [{ text: "Restart!", onPress: () => RNRestart.Restart() }]
      );
    }
  }

  componentWillUnmount() {
    this._onNotificationReceived && this._onNotificationReceived();
    this._onNotificationDisplayed && this._onNotificationDisplayed();
    this._onNotificationOpened && this._onNotificationOpened();
    this._getInitialNotification && this._getInitialNotification();
  }

  render() {
    if (this.state.isCrashed) {
      return <View style={{ flex: 1, backgroundColor: "white" }} />;
    }
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
