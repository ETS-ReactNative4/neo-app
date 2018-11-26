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
    xSensorPlaceholderColor: PropTypes.string,
    onKeyBoardStateChange: PropTypes.func
  });

  state = {
    keyboardSpace: 0,
    isKeyboardVisibleiOS: false,
    isKeyboardVisibleAndroid: false
  };
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardWillChangeFrameListener;
  _keyboardWillHideListener;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this._keyboardWillChangeFrameListener = Keyboard.addListener(
          "keyboardWillChangeFrame",
          this.keyboardWillChangeFrame
        );
        this._keyboardWillHideListener = Keyboard.addListener(
          "keyboardWillHide",
          this.keyboardWillHide
        );
        this._keyboardDidShowListener = Keyboard.addListener(
          "keyboardDidShow",
          this.keyboardDidShow
        );
        this._keyboardDidHideListener = Keyboard.addListener(
          "keyboardDidHide",
          this.keyboardDidHide
        );
      }
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        this._keyboardWillChangeFrameListener &&
          this._keyboardWillChangeFrameListener.remove();
        this._keyboardWillHideListener &&
          this._keyboardWillHideListener.remove();
        this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
        this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this._keyboardWillChangeFrameListener &&
      this._keyboardWillChangeFrameListener.remove();
    this._keyboardWillHideListener && this._keyboardWillHideListener.remove();
    this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
  }

  keyboardWillChangeFrame = e => {
    this.setState({
      isKeyboardVisibleiOS: true,
      keyboardSpace: e.endCoordinates.height
    });
    const { onKeyBoardStateChange } = this.props;
    onKeyBoardStateChange && onKeyBoardStateChange("visible");
  };

  keyboardWillHide = () => {
    this.setState({
      isKeyboardVisibleiOS: false,
      keyboardSpace: 0
    });
    const { onKeyBoardStateChange } = this.props;
    onKeyBoardStateChange && onKeyBoardStateChange("hidden");
  };

  keyboardDidShow = () => {
    this.setState({
      isKeyboardVisibleAndroid: true
    });
    const { onKeyBoardStateChange } = this.props;
    onKeyBoardStateChange && onKeyBoardStateChange("visible");
  };

  keyboardDidHide = () => {
    this.setState({
      isKeyboardVisibleAndroid: false
    });
    const { onKeyBoardStateChange } = this.props;
    onKeyBoardStateChange && onKeyBoardStateChange("hidden");
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
      this.state.isKeyboardVisibleiOS ? null : (
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0, 0, 0, .3)"
  }
});

export default KeyboardAvoidingActionBar;
