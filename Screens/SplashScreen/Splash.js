import React, { Component, createRef } from "react";
import { StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import RNBootSplash from "react-native-bootsplash";
import LottieView from "lottie-react-native";

@ErrorBoundary({ isRoot: true })
class Splash extends Component {
  static navigationOptions = {
    header: null
  };
  _splashAnimationRef = createRef();

  componentDidMount() {
    RNBootSplash.hide();
  }

  render() {
    return (
      <LottieView
        ref={this._splashAnimationRef}
        source={constants.splashAnimation()}
        style={styles.lottieViewContainer}
        resizeMode={"cover"}
        autoPlay={true}
        loop={false}
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
