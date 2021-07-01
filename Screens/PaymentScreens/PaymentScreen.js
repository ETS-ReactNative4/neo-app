import React, {Component} from 'react';
import {BackHandler, View} from 'react-native';
import constants from '../../constants/constants';
import {isIphoneX} from 'react-native-iphone-x-helper';
import ControlledWebView from '../../CommonComponents/ControlledWebView/ControlledWebView';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import {recordEvent} from '../../Services/analytics/analyticsService';
import {
  SCREEN_PAYMENT_SUCCESS,
  SCREEN_PAYMENT_FAILURE,
} from '../../NavigatorsV2/ScreenNames';
import {CONSTANT_paymentFormHtml} from '../../constants/stringConstants';

@ErrorBoundary()
class PaymentScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      () => {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onHardwareBackPress,
        );
      },
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onHardwareBackPress,
        );
      },
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onHardwareBackPress,
    );
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  /**
   * Disable hardware back button when payment screen is active
   */
  onHardwareBackPress = () => true;

  _webView = React.createRef();

  onNavigationStateChange = webViewState => {
    const transactionId = this.props.route.params?.transactionId ?? '';
    const url = webViewState.url;
    const {navigation} = this.props;
    if (url.indexOf('404') === -1) {
      if (url.indexOf(constants.paymentComplete) > -1) {
        recordEvent(constants.Payment.event, {
          click: constants.Payment.click.paymentSuccess,
        });
        const {backAction} = this.props.route.params ?? {};
        navigation.replace(SCREEN_PAYMENT_SUCCESS, {transactionId, backAction});
      }
      if (url.indexOf(constants.paymentInComplete) > -1) {
        recordEvent(constants.Payment.event, {
          click: constants.Payment.click.paymentFailure,
        });
        navigation.replace(SCREEN_PAYMENT_FAILURE);
      }
      if (url.indexOf(constants.paymentCancel) > -1) {
        navigation.goBack();
      }
    } else {
      recordEvent(constants.Payment.event, {
        click: constants.Payment.click.paymentFailure,
      });
      navigation.replace(SCREEN_PAYMENT_FAILURE);
    }
  };

  render() {
    const paymentScript = this.props.route.params?.paymentScript ?? '';

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ControlledWebView
          source={{
            html: `${CONSTANT_paymentFormHtml}<script>${paymentScript}</script>`,
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          style={{
            flex: 1,
            marginTop: isIphoneX() ? constants.xNotchHeight : 0,
          }}
          webviewRef={e => (this._webView = e)}
        />
      </View>
    );
  }
}

export default PaymentScreen;
