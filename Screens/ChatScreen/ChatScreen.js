import React, { Component } from "react";
import { BackHandler, Keyboard, View, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import CustomWebView from "react-native-webview-android-file-upload";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import crispSDK from "./Components/crispSDK";
import BackButtonIos from "./Components/BackButtonIos";

@inject("userStore")
@inject("itineraries")
@observer
class ChatScreen extends Component {
  state = {
    canGoBack: false,
    keyboardVisible: false,
    injectedJavascript: ""
  };
  _webView = {};
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  keyboardDidShow = () => {
    this.setState({
      keyboardVisible: true
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardVisible: false
    });
  };

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
      BackHandler.addEventListener("hardwareBackPress", this.goBack)
    );
  }

  onNavigationStateChange = navState => {
    const { userDetails } = this.props.userStore;
    const { selectedItineraryId } = this.props.itineraries;
    const { email } = userDetails;
    this.setState({
      injectedJavascript: crispSDK(email, selectedItineraryId),
      canGoBack: navState.canGoBack
    });
  };

  goBack = () => {
    if (this.state.canGoBack) {
      this._webView.goBack();
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => BackHandler.removeEventListener("hardwareBackPress", this.goBack)
    );
    this._keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillChangeFrame",
      this.keyboardDidShow
    );
    this._keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.keyboardVisible
            ? constants.chatLightColor
            : constants.chatMainColor
        }}
      >
        <CustomWebView
          source={{ uri: constants.crispServerUrl }}
          startInLoadingState={true}
          onNavigationStateChange={this.onNavigationStateChange}
          style={{
            flex: 1,
            marginTop: isIphoneX() ? constants.xNotchHeight : 0
          }}
          webviewRef={e => (this._webView = e)}
          injectedJavaScript={this.state.injectedJavascript}
        />
        {Platform.OS === "ios" ? (
          <BackButtonIos
            backAction={this.goBack}
            isVisible={this.state.canGoBack}
          />
        ) : null}
      </View>
    );
  }
}

export default ChatScreen;
