import React, { Component } from "react";
import { View, BackHandler, Platform } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import BackButtonIos from "../../CommonComponents/BackButtonIos/BackButtonIos";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary({ isRoot: true })
class Home extends Component {
  static navigationOptions = HomeHeader;

  state = {
    canGoBack: false,
    injectedJavascript: ""
  };
  _webView = {};
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  onNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack
    });
  };

  goBack = () => {
    if (this.state.canGoBack) {
      this._webView.goBack();
    } else {
      const { navigation } = this.props;
      if (navigation.isFocused()) {
        BackHandler.exitApp();
      } else {
        return false;
      }
    }
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <ControlledWebView
          source={{ uri: constants.productUrl }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={{
            flex: 1
          }}
          webviewRef={e => (this._webView = e)}
          injectedJavascript={this.state.injectedJavascript}
        />
        {Platform.OS === "ios" ? (
          <BackButtonIos
            backAction={this.goBack}
            isVisible={this.state.canGoBack}
          />
        ) : null}
        {isIphoneX() ? (
          <XSensorPlaceholder containerStyle={{ backgroundColor: "white" }} />
        ) : null}
      </View>
    );
  }
}

export default Home;
