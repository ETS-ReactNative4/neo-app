import React, { Component } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
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
    else this.props.onComplete();
  };

  moveLeft = index => {
    if (index > 0) this.refs[`input_${index - 1}`].focus();
  };

  render() {
    let { containerStyle } = this.props;
    let { otp } = this.props;

    if (!containerStyle) containerStyle = {};

    return (
      <View style={[styles.otpContainer, containerStyle]}>
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
    );
  }
}

const styles = StyleSheet.create({
  otpContainer: {
    marginTop: 24,
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
        fontSize: 40
      },
      ios: {
        height: 40,
        fontSize: 40,
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
        width: 48
      },
      ios: {
        height: 48,
        width: 48
      }
    }),
    borderBottomColor: "rgba(204,204,204,1)",
    borderBottomWidth: 2,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OtpInput;
