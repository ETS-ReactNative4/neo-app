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
    isCountryCodeModalVisible: false
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

  editMobileNumber = mobileNumber => {
    if (mobileNumber.length <= 10) {
      this.setState({ mobileNumber });
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

  render() {
    return [
      <CountryCodePicker
        key={0}
        isVisible={this.state.isCountryCodeModalVisible}
        onClose={this.hideCountryCodeModal}
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

        <View style={styles.mobileNumberBox}>
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
            />
          </View>
        </View>

        <PasswordInput
          password={this.state.password}
          onEdit={this.editPassword}
        />

        <OtpInput
          otp={this.state.otp}
          onEdit={this.editOtp}
          onComplete={this.verifyOtp}
        />
      </View>,
      <OtpBar
        key={2}
        keyboardSpace={this.state.keyboardSpace}
        resendOtp={this.resendOtp}
        verifyOtp={this.verifyOtp}
      />,
      <NextBar
        key={3}
        onClickNext={() => {}}
        keyboardSpace={this.state.keyboardSpace}
      />
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
        height: 36
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
    marginHorizontal: 8
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
