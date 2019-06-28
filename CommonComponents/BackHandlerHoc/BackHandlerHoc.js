import React, { Component } from "react";
import { BackHandler } from "react-native";

const BackHandlerHoc = (backHandler = () => false) => WrappedComponent => {
  WrappedComponent.navigationOptions.gesturesEnabled = false;

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
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default BackHandlerHoc;
