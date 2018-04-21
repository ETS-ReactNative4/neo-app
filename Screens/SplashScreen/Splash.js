import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import constants from "../../constants/constants";

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Starter" })]
});

class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(() => {
      if (Platform.OS === "ios") {
        this.props.navigation.navigate("Starter");
      } else {
        this.props.navigation.dispatch(resetAction);
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
