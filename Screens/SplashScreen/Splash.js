import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import constants from "../../constants/constants";
import * as Keychain from "react-native-keychain";

const resetToHome = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Starter" })]
});

const resetToItineraries = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Itineraries" })]
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
          ? this.props.navigation.navigate("Itineraries")
          : this.props.navigation.dispatch(resetToItineraries);
      } else {
        Platform.OS === "ios"
          ? this.props.navigation.navigate("Starter")
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
