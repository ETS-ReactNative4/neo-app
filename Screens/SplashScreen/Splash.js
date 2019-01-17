import React, { Component } from "react";
import { AsyncStorage, ImageBackground, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import constants from "../../constants/constants";
import * as Keychain from "react-native-keychain";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { logError } from "../../Services/errorLogger/errorLogger";

const resetToBooked = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
});

const resetToPlan = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "NewItineraryStack" })
});

@ErrorBoundary({ isRoot: true })
class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          AsyncStorage.getItem(constants.tripToggleStatusStorageKey).then(
            isTripModeOn => {
              if (JSON.parse(isTripModeOn)) {
                this.props.navigation.dispatch(resetToBooked);
              } else {
                this.props.navigation.dispatch(resetToPlan);
              }
            }
          );
        } else {
          this.props.navigation.navigate("Starter");
        }
      } catch (e) {
        logError(e);
        this.props.navigation.navigate("Starter");
      }
    }, 1000);
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
