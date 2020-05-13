import React, { Component } from "react";
import { BackHandler } from "react-native";

/**
 * Handles the default android back button action
 * and the native swipe back gesture of the screens
 *
 * => BackHandler will be binded to the event listeners so make sure the actual
 * handler is not a direct function but is executed inside another function.
 * `handler = () => yourFunction()`
 */
const BackHandlerHoc = (backHandler = () => false) => WrappedComponent => {

  return class extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
      super(props);

      this._didFocusSubscription = props.navigation.addListener(
        "didFocus",
        () => {
          BackHandler.addEventListener("hardwareBackPress", backHandler);
        }
      );
    }

    componentDidMount() {
      this._willBlurSubscription = this.props.navigation.addListener(
        "willBlur",
        () => {
          BackHandler.removeEventListener("hardwareBackPress", backHandler);
        }
      );
    }

    componentWillUnmount() {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default BackHandlerHoc;
