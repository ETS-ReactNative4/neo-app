import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
  LayoutAnimation
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

class CustomPhrase extends Component {
  static propTypes = forbidExtraProps({
    openLanguageSelector: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.object.isRequired
  });

  state = {
    customPhrase: "",
    isKeyboardVisible: false,
    keyboardSpace: isIphoneX() ? constants.xSensorAreaHeight : 0
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: isIphoneX()
        ? e.endCoordinates.height
        : e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: isIphoneX() ? constants.xSensorAreaHeight : 0
    });
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

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onEditText = e => {
    this.setState({
      customPhrase: e.target.value
    });
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    return [
      <View
        key={0}
        style={[
          styles.customPhraseContainer,
          { bottom: this.state.keyboardSpace }
        ]}
      >
        <TextInput
          style={styles.customPhraseInput}
          onChange={this.onEditText}
          returnKeyType={"done"}
          underlineColorAndroid={"transparent"}
          value={this.state.customPhrase}
          placeholder={"Or, type a custom message"}
        />
        <SimpleButton
          text={this.props.selectedLanguage.languageCode}
          action={this.props.openLanguageSelector}
          containerStyle={{
            backgroundColor: "white",
            width: 64,
            marginLeft: 8
          }}
          textColor={constants.firstColor}
        />
      </View>,
      isIphoneX() && !this.state.isKeyboardVisible ? (
        <XSensorPlaceholder
          key={1}
          containerStyle={{ backgroundColor: "white" }}
        />
      ) : null
    ];
  }
}

const styles = StyleSheet.create({
  customPhraseContainer: {
    height: 48,
    width: responsiveWidth(100),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "white",
    position: "absolute"
  },
  customPhraseInput: {
    flex: 1,
    height: 32,
    backgroundColor: constants.shade5,
    borderRadius: 7,
    paddingHorizontal: 8,
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.shade2
  }
});

export default CustomPhrase;
