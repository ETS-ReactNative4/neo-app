import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  ToastAndroid,
  Image
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
import registerToken from "../../Services/registerToken/registerToken";
import MobileNumberInput from "./Components/MobileNumberInput";
import { inject, observer } from "mobx-react/custom";
import KeyboardAvoidingActionBar from "../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { toastCenter } from "../../Services/toast/toast";

// const resetToBookings = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "YourBookings" })]
// });

@ErrorBoundary()
@inject("yourBookingsStore")
@inject("userStore")
@inject("infoStore")
@observer
class MobileNumber extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          title={""}
          leftAction={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              navigation.goBack();
            }, 250);
          }}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    cca2: "IN",
    countryCode: "+91",
    mobileNumber: "",
    otp: new Array(6).fill(""),
    otpId: "",
    password: "",
    isCountryCodeModalVisible: false,
    isMobileVerified: false,
    isUnregisteredNumber: false,
    hasError: false,
    isLoading: false,
    waitTime: 30,
    isWaiting: false
  };
  waitListener = {};
  smsListener = {};
  _mobileInputRef = React.createRef();

  selectCountryCode = countryCode => {
    recordEvent(constants.mobileNumberSelectCountryCode);
    this.setState({ countryCode });
  };

  setMobileInputRef = e => (this._mobileInputRef = e);

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
    const requestBody = {
      mob_num: this.state.mobileNumber,
      ccode: this.state.countryCode,
      otp_id: this.state.otpId,
      otp: this.state.otp.join("")
    };
    this.setState({
      isLoading: true
    });
    const { yourBookingsStore, navigation, userStore, infoStore } = this.props;
    const { getUpcomingItineraries } = yourBookingsStore;
    const { getUserDetails } = userStore;
    const { setError } = infoStore;
    apiCall(constants.verifyOtp, requestBody)
      .then(response => {
        setTimeout(async () => {
          Keyboard.dismiss();
          if (response.status === "VERIFIED") {
            this.smsListener.remove ? this.smsListener.remove() : () => null;
            clearInterval(this.waitListener);
            await registerToken(response.data.authtoken);
            recordEvent(constants.userLoggedInEvent);
            getUpcomingItineraries();
            getUserDetails();
            navigation.navigate("YourBookings");
          } else {
            this.setState({
              isLoading: false
            });
            recordEvent(constants.mobileNumberOtpFailed);
            toastCenter(response.msg || "OTP Verification Failed!");
            this.setState({
              otp: new Array(6).fill("")
            });
          }
        }, 1500);
      })
      .catch(error => {
        Keyboard.dismiss();
        this.setState({
          isLoading: false
        });
        setError("Error!", "Internal Server Error.");
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
    const { setInfo, setError } = this.props.infoStore;
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
              toastCenter(response.msg || "OTP Sent");
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
        this.setState(
          {
            isLoading: false
          },
          () => {
            setError("Error!", "Internal Server Error!");
          }
        );
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

  /**
   * SMS listener for android is Removed hence otp prefiller won't work
   */
  // otpPrefiller = message => {
  //   if (message.originatingAddress.indexOf("PYTBRK") > -1) {
  //     const otp = message.body.substr(0, 6).split("");
  //     recordEvent(constants.mobileNumberOtpAutoFill);
  //     this.setState(
  //       {
  //         otp
  //       },
  //       () => {
  //         setTimeout(() => {
  //           this.verifyOtp();
  //         }, 1000);
  //       }
  //     );
  //   }
  // };

  showCountryCodeModal = () => {
    recordEvent(constants.mobileNumberOpenCountryCode);
    this.setState({
      isCountryCodeModalVisible: true
    });
  };

  hideCountryCodeModal = () => {
    recordEvent(constants.mobileNumberCloseCountryCode);
    this.setState({
      isCountryCodeModalVisible: false
    });
  };

  componentWillUnmount() {
    this.smsListener.remove ? this.smsListener.remove() : () => null;
    clearInterval(this.waitListener);
  }

  submitMobileNumber = () => {
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

  componentDidMount() {
    // setTimeout(() => {
    //   this._mobileInputRef.focus && this._mobileInputRef.focus();
    // }, 250);
  }

  render() {
    const { isMobileVerified } = this.state;

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
          submitMobileNumber={this.submitMobileNumber}
          mobileInputRef={this.setMobileInputRef}
        />

        {this.state.isUnregisteredNumber ? <UnregisteredNumber /> : null}

        {!this.state.isMobileVerified && this.state.isLoading ? (
          <Image
            resizeMode={"contain"}
            source={constants.loadingIcon}
            style={styles.numberVerificationLoadingIcon}
          />
        ) : null}

        {this.state.isMobileVerified ? (
          <OtpInput
            otp={this.state.otp}
            onEdit={this.editOtp}
            onComplete={this.verifyOtp}
          />
        ) : null}
      </View>,

      <KeyboardAvoidingActionBar
        containerStyle={
          isMobileVerified ? styles.otpBottomBar : styles.nextBottomBar
        }
        xSensorPlaceholderColor={
          isMobileVerified ? "white" : "rgba(239,249,242,1)"
        }
        navigation={this.props.navigation}
        key={2}
      >
        {isMobileVerified ? (
          <OtpBar
            resendOtp={this.resendOtp}
            verifyOtp={this.verifyOtp}
            isWaiting={this.state.isWaiting}
            waitTime={this.state.waitTime}
            isLoading={this.state.isLoading}
          />
        ) : (
          <NextBar onClickNext={this.submitMobileNumber} />
        )}
      </KeyboardAvoidingActionBar>

      //<Loader isVisible={this.state.isLoading} key={3} />
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
  },
  nextBottomBar: {
    height: 40,
    backgroundColor: "rgba(239,249,242,1)",
    justifyContent: "center",
    borderTopWidth: 0
  },
  otpBottomBar: {
    backgroundColor: "white",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0
  },
  numberVerificationLoadingIcon: {
    height: 40,
    width: 40,
    alignSelf: "center",
    marginTop: 16
  }
});

export default MobileNumber;
