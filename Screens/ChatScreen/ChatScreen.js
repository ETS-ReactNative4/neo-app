import React, { Component } from "react";
import { BackHandler, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import CustomWebView from "react-native-webview-android-file-upload";
import constants from "../../constants/constants";

class ChatScreen extends Component {
  state = {
    canGoBack: false
  };
  _webView = {};
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
      BackHandler.addEventListener("hardwareBackPress", this.goBack)
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
      return true;
    } else {
      this.props.navigation.goBack();
      return true;
    }
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => BackHandler.removeEventListener("hardwareBackPress", this.goBack)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#6666ff" }}>
        <CustomWebView
          source={{ uri: constants.crispServerUrl }}
          startInLoadingState={true}
          onNavigationStateChange={this.onNavigationStateChange}
          style={{
            flex: 1,
            marginTop: isIphoneX() ? constants.xNotchHeight : 0
          }}
          webviewRef={e => (this._webView = e)}
        />
      </View>
    );
  }
}

export default ChatScreen;
