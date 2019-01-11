import React, { Component } from "react";
import { BackHandler } from "react-native";

const resolveDeepLinkHardwareBack = navigation => {
  const parentScreen = navigation.getParam("parentScreen", "");
  if (navigation.isFocused() && parentScreen) {
    navigation.goBack();
    navigation.navigate(parentScreen);
    return true;
  }
  return false;
};

const resolveDeepLinkHeaderBack = navigation => {
  const parentScreen = navigation.getParam("parentScreen", "");
  if (navigation.isFocused() && parentScreen) {
    navigation.goBack();
    navigation.navigate(parentScreen);
  } else {
    navigation.goBack();
  }
};

const DeepLinkHandler = WrappedComponent => {
  return class extends Component {
    static navigationOptions = ({ navigation }) => {
      const navigationConfig = WrappedComponent.navigationOptions({
        navigation
      });
      return {
        ...navigationConfig,
        header: React.cloneElement(navigationConfig.header, {
          leftAction: () => resolveDeepLinkHeaderBack(navigation)
        })
      };
    };

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
      super(props);

      this._didFocusSubscription = props.navigation.addListener(
        "didFocus",
        () => {
          BackHandler.addEventListener("hardwareBackPress", () =>
            resolveDeepLinkHardwareBack(this.props.navigation)
          );
        }
      );

      console.log(
        "DeepLinkHandler >> ",
        WrappedComponent.navigationOptions({ navigation: props.navigation })
      );
    }

    componentDidMount() {
      this._willBlurSubscription = this.props.navigation.addListener(
        "willBlur",
        () => {
          BackHandler.removeEventListener("hardwareBackPress", () =>
            resolveDeepLinkHardwareBack(this.props.navigation)
          );
        }
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default DeepLinkHandler;
