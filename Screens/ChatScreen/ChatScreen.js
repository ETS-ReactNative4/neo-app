import React, { Component } from "react";
import { BackHandler, Keyboard, View, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import BackButtonIos from "../../CommonComponents/BackButtonIos/BackButtonIos";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import UnableToUseChat from "./Components/UnableToUseChat";
import PreTrip from "./Components/PreTrip";
import moment from "moment";
import { recordEvent } from "../../Services/analytics/analyticsService";
import CrispSDK from "./Components/CrispSDK";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";

@ErrorBoundary({ isRoot: true })
@inject("userStore")
@inject("itineraries")
@inject("appState")
@observer
class ChatScreen extends Component {
  state = {
    canGoBack: false,
    keyboardVisible: false,
    isChatActive: true,
    keyboardSpace: 0
  };
  _webView = React.createRef();
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  keyboardDidShow = e => {
    this.setState({
      keyboardVisible: true,
      keyboardSpace: e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardVisible: false,
      keyboardSpace: 0
    });
  };

  constructor(props) {
    super(props);

    const { clearChatNotification } = props.appState;

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this.checkChatActivationStatus();
        clearChatNotification();
        this._keyboardDidShowListener = Keyboard.addListener(
          Platform.OS === "ios" ? "keyboardWillChangeFrame" : "keyboardDidShow",
          this.keyboardDidShow
        );
        this._keyboardDidHideListener = Keyboard.addListener(
          Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
          this.keyboardDidHide
        );
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
      this.props.navigation.goBack();
    }
    return true;
  };

  componentDidMount() {
    this.checkChatActivationStatus();
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
        this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
        BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  checkChatActivationStatus = () => {
    if (this.props.itineraries.cities[0]) {
      const today = moment();
      const timeDiff = this.props.itineraries.firstDay.diff(today, "hours");
      if (timeDiff > constants.preTripChatActivationTime) {
        this.setState({
          isChatActive: false
        });
      } else {
        this.setState({
          isChatActive: true
        });
      }
    }
  };

  render() {
    const { isChatActive } = this.state;
    const { isConnected } = this.props.appState;
    const openSupportCenter = () => {
      recordEvent(constants.chatOpenSupportCenterClick);
      this.props.navigation.navigate("SupportCenter");
    };
    const { userDetails } = this.props.userStore;
    const { email } = userDetails;
    const uri = constants.crispServerUrl(email);

    return isChatActive ? (
      isConnected ? (
        <View
          style={[
            { flex: 1 },
            Platform.OS === "ios" && isIphoneX()
              ? {
                  backgroundColor:
                    this.state.keyboardVisible || this.state.canGoBack
                      ? constants.chatLightColor
                      : constants.chatMainColor
                }
              : null
          ]}
        >
          <ControlledWebView
            source={{ uri }}
            onNavigationStateChange={this.onNavigationStateChange}
            style={{
              flex: 1,
              marginTop: isIphoneX() ? constants.xNotchHeight : 0
            }}
            webviewRef={e => (this._webView = e)}
            injectedJavascript={CrispSDK}
            useWebKit={false}
            onShouldStartLoadWithRequest={event => {
              /**
               * Prevent user from navigating away from chat window by opening
               * external links in custom tab (helps with file downloads)
               */
              if (event.url !== uri) {
                openCustomTab(event.url);
                return false;
              }
              return true;
            }}
          />
          {Platform.OS === "ios" ? (
            <BackButtonIos
              backAction={this.goBack}
              isVisible={this.state.canGoBack}
            />
          ) : null}
        </View>
      ) : (
        <UnableToUseChat />
      )
    ) : (
      <PreTrip action={openSupportCenter} />
    );
  }
}

export default ChatScreen;
