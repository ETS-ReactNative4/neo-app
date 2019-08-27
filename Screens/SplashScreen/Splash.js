import React, { Component } from "react";
import { StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import RNBootSplash from "react-native-bootsplash";
import LottieView from "lottie-react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

@ErrorBoundary({ isRoot: true })
class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    RNBootSplash.hide();
  }

  render() {
    return (
      <LottieView
        source={constants.splashAnimation()}
        style={styles.lottieViewContainer}
        autoPlay={true}
        resizeMode={"cover"}
      />
    );
  }
}

const styles = StyleSheet.create({
  lottieViewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Splash;
