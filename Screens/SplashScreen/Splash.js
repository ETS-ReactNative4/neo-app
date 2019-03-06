import React, { Component } from "react";
import { AsyncStorage, ImageBackground } from "react-native";
import { NavigationActions } from "react-navigation";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import isUserLoggedInCallback from "../../Services/isUserLoggedInCallback/isUserLoggedInCallback";

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
      isUserLoggedInCallback(
        () => {
          AsyncStorage.getItem(constants.tripToggleStatusStorageKey).then(
            isTripModeOn => {
              if (JSON.parse(isTripModeOn)) {
                this.props.navigation.dispatch(resetToBooked);
              } else {
                this.props.navigation.dispatch(resetToPlan);
              }
            }
          );
        },
        () => {
          this.props.navigation.navigate("Starter");
        },
        () => {
          this.props.navigation.navigate("Starter");
        }
      );
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
