import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import constants from "../../constants/constants";
import * as Keychain from "react-native-keychain";

const resetToHome = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Starter" })]
});

const resetToItineraries = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "AppHome" })]
});

class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        Platform.OS === "ios"
          ? this.props.navigation.push("AppHome")
          : this.props.navigation.dispatch(resetToItineraries);
      } else {
        Platform.OS === "ios"
          ? this.props.navigation.push("Starter")
          : this.props.navigation.dispatch(resetToHome);
      }
    }, 3000);
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
