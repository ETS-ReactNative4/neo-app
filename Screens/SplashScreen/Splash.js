import React, { Component } from "react";
import { View } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

/**
 * Splash screen is now only an entry point to the app
 * It doesn't display anything and will be hidden by the bootsplash
 * The actual app launcher is called from the `Drawer` screen
 */
@ErrorBoundary({ isRoot: true })
class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <View />;
  }
}

export default Splash;
