import React, { Component } from "react";
import { View } from "react-native";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

class PaymentScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  _webView = React.createRef();

  onNavigationStateChange = webViewState => {
    const url = webViewState.url;
    const { navigation } = this.props;
    if (url.indexOf("404") === -1) {
      if (url.indexOf(constants.paymentComplete) > -1) {
        navigation.replace("PaymentSuccess");
      }
      if (url.indexOf(constants.paymentInComplete) > -1) {
        navigation.replace("PaymentFailure");
      }
      if (url.indexOf(constants.paymentCancel) > -1) {
        navigation.goBack();
      }
    } else {
      navigation.replace("PaymentFailure");
    }
  };

  render() {
    const paymentScript = this.props.navigation.getParam("paymentScript", "");

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ControlledWebView
          source={{ uri: constants.startPayment }}
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
