import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  ToastAndroid
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import OtpInput from "../../CommonComponents/OtpInput/OtpInput";
import NextBar from "./Components/NextBar";
import OtpBar from "./Components/OtpBar";
import YourBookings from "../YourBookingsScreen/YourBookings";
import CountryCodePicker from "./Components/CountryCodePicker";
import UnregisteredNumber from "./Components/UnregisteredNumber";
import apiCall from "../../Services/networkRequests/apiCall";
import Loader from "../../CommonComponents/Loader/Loader";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import registerToken from "../../Services/registerToken/registerToken";
import MobileNumberInput from "./Components/MobileNumberInput";
import SmsListener from "react-native-android-sms-listener";
import { inject, observer } from "mobx-react/custom";
import getSmsPermissionAndroid from "../../Services/getSmsPermissionAndroid/getSmsPermissionAndroid";
import { NavigationActions, StackActions } from "react-navigation";

const resetToBookings = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "YourBookings" })]
});

@inject("yourBookingsStore")
@inject("userStore")
@observer
class MobileNumber extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={""} navigation={navigation} />
    };
  };

  state = {
    cca2: "IN",
    countryCode: "+91",
    mobileNumber: "",
    otp: new Array(6).fill(""),
    otpId: "",
    keyboardSpace: 0,
    password: "",
    isCountryCodeModalVisible: false,
    isMobileVerified: false,
    isUnregisteredNumber: false,
    hasError: false,
    isLoading: false,
    waitTime: 30,
    isWaiting: false
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};
  waitListener = {};
  smsListener = {};

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: isIphoneX()
        ? e.endCoordinates.height - constants.xSensorAreaHeight
        : e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: 0
    });
  };

  selectCountryCode = countryCode => {
    this.setState({ countryCode });
  };

  editMobileNumber = mobileNumber => {
    if (mobileNumber.length <= 10) {
      this.setState({ mobileNumber });
      if (mobileNumber.length === 10) {
        this.setState({
          hasError: false
        });
      }
    } else {
      this.setState({ mobileNumber: this.state.mobileNumber });
    }
  };

  editOtp = (value, index) => {
    const otp = [...this.state.otp];
    otp[index] = value;
    this.setState({ otp });
  };

  editPassword = password => {
    this.setState({ password });
  };

  verifyOtp = () => {
    Keyboard.dismiss();
    const requestBody = {
      mob_num: this.state.mobileNumber,
      ccode: this.state.countryCode,
      otp_id: this.state.otpId,
      otp: this.state.otp.join("")
    };
    this.setState({
      isLoading: true
    });
    const { yourBookingsStore, navigation, userStore } = this.props;
    const { getUpcomingItineraries } = yourBookingsStore;
    const { getUserDetails } = userStore;
    apiCall(constants.verifyOtp, requestBody)
      .then(async response => {
        this.setState({
          isLoading: false
        });
        if (response.status === "VERIFIED") {
          this.smsListener.remove ? this.smsListener.remove() : () => null;
          clearInterval(this.waitListener);
          await registerToken(response.data.authtoken);
          getUpcomingItineraries();
          getUserDetails();
          Platform.OS === "android"
            ? navigation.dispatch(resetToBookings)
            : navigation.navigate("YourBookings");
        } else {
          if (Platform.OS === "ios") {
            DebouncedAlert("OTP Verification Failed!", response.msg);
          } else {
            ToastAndroid.show(
              response.msg || "OTP Verification Failed!",
              ToastAndroid.SHORT
            );
          }
          this.setState({
            otp: new Array(6).fill("")
          });
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  };

  resendOtp = () => {
    this.smsListener.remove ? this.smsListener.remove() : () => null;
    this.sendOtp();
  };

  sendOtp = () => {
    const requestBody = {
      mob_num: this.state.mobileNumber,
      ccode: this.state.countryCode
    };
    this.setState({
      isLoading: true
    });
    apiCall(constants.verifyMobileNumber, requestBody)
      .then(response => {
        this.setState({
          isLoading: false
        });
        if (response.status === "SUCCESS") {
          this.setState(
            {
              isUnregisteredNumber: false,
              isMobileVerified: true,
              otpId: response.data.otp_id
            },
            () => {
              if (Platform.OS === "ios") {
                DebouncedAlert("OTP Sent", response.msg);
              } else {
                ToastAndroid.show(
                  response.msg || "OTP Sent",
                  ToastAndroid.SHORT
                );
              }
              this.waitListener = setInterval(this.waitCounter, 1000);
            }
          );
        } else {
          this.setState({
            isUnregisteredNumber: true
          });
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  };

  waitCounter = () => {
    if (this.state.waitTime) {
      this.setState({
        isWaiting: true,
        waitTime: this.state.waitTime - 1
      });
    } else {
      this.setState({
        isWaiting: false,
        waitTime: 45
      });
      clearInterval(this.waitListener);
    }
  };

  otpPrefiller = message => {
    if (message.originatingAddress.indexOf("PYTBRK") > -1) {
      const otp = message.body.substr(0, 6).split("");
      this.setState(
        {
          otp
        },
        () => {
          setTimeout(() => {
            this.verifyOtp();
          }, 1000);
        }
      );
    }
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillChangeFrame",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardDidHide
    );
  }

  showCountryCodeModal = () => {
    this.setState({
      isCountryCodeModalVisible: true
    });
  };

  hideCountryCodeModal = () => {
    this.setState({
      isCountryCodeModalVisible: false
    });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.smsListener.remove ? this.smsListener.remove() : () => null;
    clearInterval(this.waitListener);
  }

  submitMobileNumber = () => {
    const sendMobileNumber = () => {
      if (this.state.mobileNumber.length < 10) {
        this.setState({
          hasError: true
        });
      } else {
        this.setState({
          hasError: false
        });
        this.sendOtp();
      }
    };

    getSmsPermissionAndroid(
      () => {
        this.smsListener = SmsListener.addListener(this.otpPrefiller);
        sendMobileNumber();
      },
      () => {
        sendMobileNumber();
      }
    );
  };

  render() {
    return [
      <CountryCodePicker
        key={0}
        isVisible={this.state.isCountryCodeModalVisible}
        onClose={this.hideCountryCodeModal}
        selectCountryCode={this.selectCountryCode}
      />,

      <View key={1} style={styles.mobileNumberContainer}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{`Verify your mobile number.`}</Text>
        </View>

        <View style={styles.infoTextWrapper}>
          <Text
            style={styles.infoText}
          >{`So that we can find bookings that are linked to your mobile number.`}</Text>
        </View>

        <MobileNumberInput
          countryCode={this.state.countryCode}
          editMobileNumber={this.editMobileNumber}
          hasError={this.state.hasError}
          isMobileVerified={this.state.isMobileVerified}
          mobileNumber={this.state.mobileNumber}
          showCountryCodeModal={this.showCountryCodeModal}
        />

        {this.state.isUnregisteredNumber ? <UnregisteredNumber /> : null}

        {this.state.isMobileVerified ? (
          <OtpInput
            otp={this.state.otp}
            onEdit={this.editOtp}
            onComplete={this.verifyOtp}
          />
        ) : null}
      </View>,

      this.state.isMobileVerified ? (
        <OtpBar
          key={2}
          keyboardSpace={this.state.keyboardSpace}
          resendOtp={this.resendOtp}
          verifyOtp={this.verifyOtp}
          isWaiting={this.state.isWaiting}
          waitTime={this.state.waitTime}
        />
      ) : null,

      !this.state.isMobileVerified ? (
        <NextBar
          key={3}
          onClickNext={this.submitMobileNumber}
          keyboardSpace={this.state.keyboardSpace}
        />
      ) : null,

      <Loader isVisible={this.state.isLoading} key={4} />
    ];
  }
}

const styles = StyleSheet.create({
  mobileNumberContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  headerTextWrapper: {
    marginHorizontal: 24,
    marginTop: 16
  },
  headerText: {
    ...constants.font30(constants.primarySemiBold),
    color: constants.black2
  },
  infoTextWrapper: {
    marginHorizontal: 24,
    marginTop: 8
  },
  infoText: {
    ...constants.font17(constants.primaryLight),
    lineHeight: 17,
    color: constants.shade1
  }
});

export default MobileNumber;
