import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableHighlight,
  Keyboard,
  Image,
  Platform
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import OtpInput from "../../CommonComponents/OtpInput/OtpInput";
import NextBar from "./Components/NextBar";
import OtpBar from "./Components/OtpBar";
import YourBookings from "../YourBookingsScreen/YourBookings";
import PasswordInput from "./Components/PasswordInput";
import CountryCodePicker from "./Components/CountryCodePicker";
import UnregisteredNumber from "./Components/UnregisteredNumber";
import apiCall from "../../Services/networkRequests/apiCall";
import Loader from "../../CommonComponents/Loader/Loader";

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
    otp: new Array(4).fill(""),
    keyboardSpace: 0,
    password: "",
    isCountryCodeModalVisible: false,
    isMobileVerified: false,
    isUnregisteredNumber: false,
    hasError: false,
    isLoading: false
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

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
    this.props.navigation.navigate("YourBookings");
  };

  resendOtp = () => {};

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
      const requestBody = {
        mob_num: this.state.mobileNumber,
        ccode: this.state.countryCode
      };
      this.setState({
        isLoading: true
      });
      apiCall("mobile/user/verify/sendotp", requestBody)
        .then(data => {
          this.setState({
            isLoading: false
          });
          if (data === "fail") {
            this.setState({
              isUnregisteredNumber: true
            });
          } else {
            this.setState({
              isUnregisteredNumber: false,
              isMobileVerified: true
            });
          }
        })
        .catch(() => {
          this.setState({
            isLoading: false
          });
        });
    }
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

        <View
          style={[
            styles.mobileNumberBox,
            this.state.hasError ? { borderBottomColor: "red" } : {}
          ]}
        >
          <TouchableHighlight
            onPress={this.showCountryCodeModal}
            underlayColor={"transparent"}
          >
            <View style={styles.countryCodeBox}>
              <View style={styles.countryCodeTextWrapper}>
                <Text style={styles.countryCodeText}>
                  {this.state.countryCode}
                </Text>
              </View>
              <Image
                style={styles.dropDownIcon}
                source={constants.dropDownArrow}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.numberInputBox}>
            <TextInput
              onChangeText={this.editMobileNumber}
              placeholder={"1234567890"}
              value={this.state.mobileNumber}
              style={styles.numberInput}
              keyboardType={"phone-pad"}
              maxLength={10}
              underlineColorAndroid={"transparent"}
              returnKeyType={"next"}
              editable={!this.state.isMobileVerified}
            />
          </View>
        </View>

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
  },
  mobileNumberBox: {
    marginTop: 8,
    marginHorizontal: 24,
    height: 48,
    borderBottomColor: constants.shade3,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  countryCodeBox: {
    alignItems: "center",
    flexDirection: "row"
  },
  countryCodeTextWrapper: {
    ...Platform.select({
      ios: {
        height: 36,
        paddingTop: 5
      },
      android: {
        height: 48
      }
    })
  },
  countryCodeText: {
    fontFamily: constants.primaryLight,
    textAlign: "justify",
    color: constants.black2,
    ...Platform.select({
      ios: {
        fontSize: 36
      },
      android: {
        fontSize: 30
      }
    })
  },
  dropDownIcon: {
    height: 20,
    width: 20,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        marginTop: 8
      },
      android: {}
    })
  },
  numberInputBox: {
    flex: 1
  },
  numberInput: {
    ...Platform.select({
      ios: {
        fontFamily: constants.primaryLight,
        fontSize: 36,
        textAlign: "justify"
      },
      android: {
        fontFamily: constants.primaryLight,
        fontSize: 36,
        height: 56,
        textAlign: "justify"
      }
    }),
    color: constants.black2
  }
});

export default MobileNumber;
