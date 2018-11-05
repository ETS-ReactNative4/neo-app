import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import XSensorPlaceholder from "../XSensorPlaceholder/XSensorPlaceholder";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";

class KeyboardAvoidingActionBar extends Component {
  static propTypes = forbidExtraProps({
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
    navigation: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    xSensorPlaceholderColor: PropTypes.string
  });

  state = {
    keyboardSpace: 0,
    isKeyboardVisible: false
  };
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this._keyboardDidShowListener = Keyboard.addListener(
          "keyboardWillChangeFrame",
          this.keyboardDidShow
        );
        this._keyboardDidHideListener = Keyboard.addListener(
          "keyboardWillHide",
          this.keyboardDidHide
        );
      }
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
        this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
  }

  keyboardDidShow = e => {
    this.setState({
      isKeyboardVisible: true,
      keyboardSpace: e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      isKeyboardVisible: false,
      keyboardSpace: 0
    });
  };

  render() {
    let { containerStyle } = this.props;
    if (!containerStyle) containerStyle = {};
    const style = [
      styles.actionBarContainer,
      containerStyle,
      { marginBottom: this.state.keyboardSpace }
    ];
    return [
      <View key={0} style={style}>
        {this.props.children}
      </View>,
      this.state.isKeyboardVisible ? null : (
        <XSensorPlaceholder
          key={1}
          containerStyle={{
            backgroundColor: this.props.xSensorPlaceholderColor || "white"
          }}
        />
      )
    ];
  }
}

const styles = StyleSheet.create({
  actionBarContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0, 0, 0, .3)"
  }
});

export default KeyboardAvoidingActionBar;
