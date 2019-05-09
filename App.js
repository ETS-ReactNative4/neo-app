import React, { Component, Fragment } from "react";
import { UIManager, NetInfo } from "react-native";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import { setNavigationService } from "./Services/navigationService/navigationService";
import storeService, {
  updateStoreService
} from "./Services/storeService/storeService";
import AppNavigator from "./Navigators/AppNavigator";
import {
  disableAnalytics,
  enableAnalytics,
  screenTracker
} from "./Services/analytics/analyticsService";
import ErrorBoundary from "./CommonComponents/ErrorBoundary/ErrorBoundary";
import { isProduction } from "./Services/getEnvironmentDetails/getEnvironmentDetails";
import FooterFeedbackPrompt from "./CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";

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
    store.feedbackPrompt.trackScreen(prevState, currentState);
    screenTracker(prevState, currentState);
  };

  render() {
    updateStoreService(store);
    return (
      <Provider {...store}>
        <Fragment>
          <AppNavigator
            ref={setNavigationService}
            onNavigationStateChange={this._navigationStateChange}
          />
          <FooterFeedbackPrompt />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
