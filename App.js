import React, { Component } from "react";
import { UIManager } from "react-native";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { setNavigationService } from "./Services/navigationService/navigationService";
import { updateStoreService } from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";
import NetStatMonitor from "./CommonComponents/NetStatMonitor/NetStatMonitor";
import screenTracker from "./Services/screenTracker/screenTracker";
import storeService from "./Services/storeService/storeService";
import constants from "./constants/constants";
import RNRestart from "react-native-restart";
import { logError } from "./Services/errorLogger/errorLogger";

class App extends Component {
  state = {
    _errorShown: false
  };

  componentDidMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
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
