import React, { Component } from "react";
import { BackHandler, View } from "react-native";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { recordEvent } from "../../Services/analytics/analyticsService";

@ErrorBoundary()
class PaymentScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onHardwareBackPress
        );
      }
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onHardwareBackPress
        );
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  /**
   * Disable hardware back button when payment screen is active
   */
  onHardwareBackPress = () => true;

  _webView = React.createRef();

  onNavigationStateChange = webViewState => {
    const transactionId = this.props.navigation.getParam("transactionId", "");
    const url = webViewState.url;
    const { navigation } = this.props;
    if (url.indexOf("404") === -1) {
      if (url.indexOf(constants.paymentComplete) > -1) {
        recordEvent(constants.paymentScreenPaymentSuccess);
        navigation.replace("PaymentSuccess", { transactionId });
      }
      if (url.indexOf(constants.paymentInComplete) > -1) {
        recordEvent(constants.paymentScreenPaymentFailure);
        navigation.replace("PaymentFailure");
      }
      if (url.indexOf(constants.paymentCancel) > -1) {
        navigation.goBack();
      }
    } else {
      recordEvent(constants.paymentScreenPaymentFailure);
      navigation.replace("PaymentFailure");
    }
  };

  render() {
    const paymentScript = this.props.navigation.getParam("paymentScript", "");

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ControlledWebView
          source={{ html: constants.paymentFormHtml }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={{
            flex: 1,
            marginTop: isIphoneX() ? constants.xNotchHeight : 0
          }}
          webviewRef={e => (this._webView = e)}
          injectedJavascript={paymentScript}
        />
      </View>
    );
  }
}

export default PaymentScreen;
