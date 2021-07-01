import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  BackHandler,
  LayoutAnimation,
  Platform,
  TextInput
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import NextBar from "./Components/NextBar";
import OtpBar from "./Components/OtpBar";
import CountryCodePicker from "./Components/CountryCodePicker";
import UnregisteredNumber from "./Components/UnregisteredNumber";
import apiCall from "../../Services/networkRequests/apiCall";
import registerToken from "../../Services/registerToken/registerToken";
import MobileNumberInput from "./Components/MobileNumberInput";
import { inject, observer } from "mobx-react";
import KeyboardAvoidingActionBar from "../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { toastTop } from "../../Services/toast/toast";
import OtpField from "./Components/OtpField";
import { getDeviceToken } from "../../Services/fcmService/fcm";
import { validateLoginMobileNumber } from "../../Services/validateMobileNumber/validateMobileNumber";
import launchPostBooking from "../../Services/launchPostBooking/launchPostBooking";
import YourBookings from "../../mobx/YourBookings";
import User from "../../mobx/User";
import Info from "../../mobx/Info";
import { NavigationStackProp } from "react-navigation-stack";
import Itineraries from "../../mobx/Itineraries";

export interface MobileNumberProps {
  yourBookingsStore: YourBookings;
  userStore: User;
  infoStore: Info;
  navigation: NavigationStackProp<{ backButtonPress: () => any }>;
  itineraries: Itineraries;
}

export interface MobileNumberState {
  cca2: string;
  countryCode: string;
  mobileNumber: string;
  otp: string[];
  otpNumber: string;
  otpId: string;
  isCountryCodeModalVisible: boolean;
  isMobileVerified: boolean;
  isUnregisteredNumber: boolean;
  hasError: boolean;
  isLoading: boolean;
  waitTime: number;
  isWaiting: boolean;
}

@ErrorBoundary()
@inject("yourBookingsStore")
@inject("userStore")
@inject("infoStore")
@inject("itineraries")
@observer
class MobileNumber extends Component<MobileNumberProps, MobileNumberState> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => {
    const leftAction = navigation.getParam("backButtonPress", () => null);
    return {
      header: (
        <CommonHeader
          title={""}
          leftAction={leftAction}
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
    otpNumber: "",
    otpId: "",
    isCountryCodeModalVisible: false,
    isMobileVerified: false,
    isUnregisteredNumber: false,
    hasError: false,
    isLoading: false,
    waitTime: 30,
    isWaiting: false
  };
  waitListener: NodeJS.Timeout | null = null;
  _mobileInputRef: React.RefObject<TextInput> = React.createRef();
  _otpInputRef: React.RefObject<TextInput> = React.createRef();

  constructor(props: Readonly<MobileNumberProps>) {
    super(props);

    props.navigation.setParams({ backButtonPress: this.onBackButtonPress });
  }

  selectCountryCode = (countryCode: string) => {
    recordEvent(constants.MobileNumber.event, {
      click: constants.MobileNumber.click.selectCountryCode
    });
    this.setState({ countryCode });
  };

  editMobileNumber = (mobileNumber: string) => {
    this.setState({ mobileNumber });
    if (validateLoginMobileNumber(`${this.state.countryCode}${mobileNumber}`)) {
      this.setState({
        hasError: false
      });
    }
  };

  editOtpNumber = (otpNumber: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ otpNumber }, () => {
      if (this.state.otpNumber.length === 6) {
        this.verifyOtp();
      }
    });
  };

  onBackButtonPress = () => {
    if (this.props.navigation.isFocused()) {
      if (this.state.isMobileVerified) {
        if (this.waitListener) {
          clearInterval(this.waitListener);
        }
        this.setState(
          {
            isMobileVerified: false,
            otp: new Array(6).fill(""),
            waitTime: 45
          },
          () => {
            this._mobileInputRef.current &&
              this._mobileInputRef.current.focus &&
              this._mobileInputRef.current.focus();
          }
        );
      } else {
        Keyboard.dismiss();
        setTimeout(() => {
          this.props.navigation.goBack();
        }, 250);
      }
      return true;
    } else {
      return false;
    }
  };

  verifyOtp = () => {
    if (this.state.otpNumber) {
      const requestBody = {
        mob_num: this.state.mobileNumber,
        ccode: this.state.countryCode,
        otp_id: this.state.otpId,
        otp: this.state.otpNumber
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        isLoading: true
      });
      const {
        yourBookingsStore,
        navigation,
        userStore,
        infoStore,
        itineraries
      } = this.props;
      const { getUpcomingItineraries } = yourBookingsStore;
      const { getUserDetails } = userStore;
      const { setError } = infoStore;
      const { selectItinerary } = itineraries;
      apiCall(constants.verifyOtp, requestBody)
        .then(response => {
          setTimeout(async () => {
            if (response.status === "VERIFIED") {
              Keyboard.dismiss();
              if (this.waitListener) {
                clearInterval(this.waitListener);
              }
              await registerToken(response.data.authtoken);
              recordEvent(constants.userLoggedInEvent);
              // @ts-ignore - Navigation state doesn't have type yet in v4 requires update
              const routeName = this.props.navigation.state.routeName;
              getUserDetails();
              getDeviceToken();
              getUpcomingItineraries().then(itinerariesArray => {
                if (itinerariesArray.length > 1) {
                  navigation.navigate("YourBookings");
                } else {
                  const itineraryId: string = itinerariesArray[0].itineraryId;
                  selectItinerary(itineraryId).then(selectedItineraryid => {
                    launchPostBooking(
                      routeName,
                      navigation,
                      selectedItineraryid
                    );
                  });
                }
              });
            } else {
              this.setState({
                isLoading: false
              });
              recordEvent(constants.MobileNumber.event, {
                type: constants.MobileNumber.type.otpFailed
              });
              toastTop(response.message || "OTP Verification Failed!");
              this.setState({
                otpNumber: ""
              });
            }
          }, 1500);
        })
        .catch(() => {
          Keyboard.dismiss();
          this.setState({
            isLoading: false
          });
          setError("Error!", "Internal Server Error.");
        });
    } else {
      toastTop("Enter a valid OTP...");
    }
  };

  resendOtp = () => {
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
    const { setError } = this.props.infoStore;
    apiCall(constants.verifyMobileNumber, requestBody)
      .then(response => {
        this.setState({
          isLoading: false
        });
        if (response.status === "SUCCESS") {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState(
            {
              isUnregisteredNumber: false,
              isMobileVerified: true,
              otpId: response.data.otp_id
            },
            () => {
              toastTop(response.message || "OTP Sent");
              this.waitListener = setInterval(this.waitCounter, 1000);
              this._otpInputRef.current &&
                this._otpInputRef.current.focus &&
                this._otpInputRef.current.focus();
            }
          );
        } else {
          this.setState({
            isUnregisteredNumber: true
          });
        }
      })
      .catch(() => {
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
      if (this.waitListener) {
        clearInterval(this.waitListener);
      }
    }
  };

  showCountryCodeModal = () => {
    recordEvent(constants.MobileNumber.event, {
      click: constants.MobileNumber.click.openCountryCode
    });
    this.setState({
      isCountryCodeModalVisible: true
    });
  };

  hideCountryCodeModal = () => {
    recordEvent(constants.MobileNumber.event, {
      click: constants.MobileNumber.click.closeCountryCode
    });
    this.setState({
      isCountryCodeModalVisible: false
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onBackButtonPress
    );
    if (this.waitListener) {
      clearInterval(this.waitListener);
    }
  }

  submitMobileNumber = () => {
    if (
      !validateLoginMobileNumber(
        `${this.state.countryCode}${this.state.mobileNumber}`
      )
    ) {
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
    BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPress);
  }

  moveToExplore = () => {
    this.props.navigation.navigate("NewItineraryStack");
  };

  render() {
    const { isMobileVerified, countryCode, mobileNumber } = this.state;

    return [
      <CountryCodePicker
        key={0}
        isVisible={this.state.isCountryCodeModalVisible}
        onClose={this.hideCountryCodeModal}
        selectCountryCode={this.selectCountryCode}
      />,

      <View key={1} style={styles.mobileNumberContainer}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>
            {isMobileVerified ? `Enter OTP` : `Verify your mobile number`}
          </Text>
        </View>

        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoText}>
            {isMobileVerified
              ? countryCode === "+91"
                ? `OTP is sent to your mobile (${mobileNumber}) and registered email.`
                : `OTP is sent to your registered email address.`
              : `So that we can find bookings that are linked to your mobile number.`}
          </Text>
        </View>

        {isMobileVerified ? (
          <OtpField
            isWaiting={this.state.isWaiting}
            waitTime={this.state.waitTime}
            resendOtp={this.resendOtp}
            setOtpInputRef={this._otpInputRef}
            otp={this.state.otpNumber}
            editOtp={this.editOtpNumber}
            submitOtp={this.verifyOtp}
          />
        ) : (
          <MobileNumberInput
            countryCode={this.state.countryCode}
            editMobileNumber={this.editMobileNumber}
            hasError={this.state.hasError}
            isMobileVerified={this.state.isMobileVerified}
            mobileNumber={this.state.mobileNumber}
            showCountryCodeModal={this.showCountryCodeModal}
            submitMobileNumber={this.submitMobileNumber}
            mobileInputRef={this._mobileInputRef}
          />
        )}

        {this.state.isUnregisteredNumber ? (
          <UnregisteredNumber onClick={this.moveToExplore} />
        ) : null}

        {!this.state.isMobileVerified && this.state.isLoading ? (
          <View style={styles.numberVerificationLoadingContainer}>
            <ActivityIndicator size="large" color={constants.firstColor} />
          </View>
        ) : null}
      </View>,

      <KeyboardAvoidingActionBar
        containerStyle={styles.otpBottomBar}
        xSensorPlaceholderColor={"white"}
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
    ...Platform.select({
      ios: {
        lineHeight: 20
      }
    }),
    color: constants.shade1,
    ...constants.kern1
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
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0
  },
  numberVerificationLoadingContainer: {
    alignSelf: "center",
    marginTop: 16
  }
});

export default MobileNumber;
