import React, { Component } from "react";
import { View, TextInput, StyleSheet, Platform, Text } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

class OtpInput extends Component {
  static propTypes = {
    otp: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired
  };

  moveFocus = (value, index) => {
    if (value) this.moveRight(index);
    else this.moveLeft(index);
  };

  moveRight = index => {
    if (index < this.props.otp.length - 1)
      this.refs[`input_${index + 1}`].focus();
    else {
      setTimeout(() => {
        this.props.onComplete();
      }, 300);
    }
  };

  moveLeft = index => {
    if (index > 0) this.refs[`input_${index - 1}`].focus();
  };

  render() {
    let { containerStyle } = this.props;
    let { otp } = this.props;

    if (!containerStyle) containerStyle = {};

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.infoText}>{"VERIFY MOBILE WITH OTP"}</Text>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => {
            return (
              <View style={styles.inputWrapper} key={index}>
                <TextInput
                  ref={`input_${index}`}
                  style={styles.inputField}
                  placeholder={"*"}
                  value={value}
                  maxLength={1}
                  onChangeText={value => {
                    this.props.onEdit(value, index);
                    this.moveFocus(value, index);
                  }}
                  underlineColorAndroid={"transparent"}
                  keyboardType={"phone-pad"}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 24
  },
  infoText: {
    color: "rgba(83,87,109,1)",
    marginBottom: 16,
    ...constants.font13(constants.primaryLight)
  },
  otpContainer: {
    ...Platform.select({
      android: {
        height: 72
      },
      ios: {
        height: 48
      }
    }),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  inputField: {
    ...Platform.select({
      android: {
        height: 64,
        width: 32,
        fontSize: 32
      },
      ios: {
        height: 40,
        fontSize: 32,
        width: 24
      }
    }),
    fontFamily: constants.primaryLight,
    color: constants.black2
  },
  inputWrapper: {
    ...Platform.select({
      android: {
        height: 64,
        width: 40
      },
      ios: {
        height: 48,
        width: 40
      }
    }),
    borderBottomColor: constants.shade3,
    borderBottomWidth: 2,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OtpInput;
