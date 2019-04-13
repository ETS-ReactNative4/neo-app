import React, { Component } from "react";
import { AsyncStorage, ImageBackground } from "react-native";
import { NavigationActions } from "react-navigation";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import isUserLoggedInCallback from "../../Services/isUserLoggedInCallback/isUserLoggedInCallback";
import {
  getInitialNotification,
  onNotificationDisplayed,
  onNotificationOpened,
  onNotificationReceived
} from "../../Services/fcmService/fcm";
import appLauncher from "../../Services/appLauncher/appLauncher";

@ErrorBoundary({ isRoot: true })
class Splash extends Component {
  _onNotificationReceived;
  _onNotificationDisplayed;
  _onNotificationOpened;
  _getInitialNotification;
  _screenNavigationTimeout;

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this._onNotificationDisplayed = onNotificationDisplayed;
    this._onNotificationReceived = onNotificationReceived;
    this._onNotificationOpened = onNotificationOpened;
    this._getInitialNotification = getInitialNotification;

    this._screenNavigationTimeout = setTimeout(() => {
      appLauncher();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this._screenNavigationTimeout);
  }

  render() {
    return (
      <ImageBackground
        source={constants.splashBackground}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    );
  }
}

export default Splash;
