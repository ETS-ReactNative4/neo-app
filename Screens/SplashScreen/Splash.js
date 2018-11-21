import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import constants from "../../constants/constants";
import * as Keychain from "react-native-keychain";
import { registerFcmRefreshListener } from "../../Services/fcmService/fcm";
import { inject, observer } from "mobx-react/custom";

const resetToBooked = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
});

const resetToPlan = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "NewItineraryStack" })
});

@inject("appState")
@observer
class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    registerFcmRefreshListener();
    const { isTripModeOn } = this.props.appState;
    setTimeout(async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        if (isTripModeOn) {
          this.props.navigation.dispatch(resetToBooked);
        } else {
          this.props.navigation.dispatch(resetToPlan);
        }
      } else {
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
