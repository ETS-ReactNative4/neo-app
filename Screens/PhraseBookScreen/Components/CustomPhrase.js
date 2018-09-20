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
    selectedLanguage: PropTypes.object.isRequired,
    selectPhrase: PropTypes.func.isRequired,
    targetLanguage: PropTypes.string.isRequired
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
      isKeyboardVisible: true,
      keyboardSpace: isIphoneX()
        ? e.endCoordinates.height
        : e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      isKeyboardVisible: false,
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

  onEditText = phrase => {
    this.setState({
      customPhrase: phrase
    });
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const { selectPhrase, targetLanguage } = this.props;
    const { customPhrase } = this.state;
    const translateAction = () =>
      customPhrase ? selectPhrase(customPhrase, targetLanguage) : null;
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
          onChangeText={this.onEditText}
          returnKeyType={
            Platform.OS === "android" && !customPhrase ? "none" : "done"
          }
          underlineColorAndroid={"transparent"}
          value={customPhrase}
          onSubmitEditing={translateAction}
          placeholder={"Or, type a custom message"}
        />
        {customPhrase && this.state.isKeyboardVisible ? (
          <SimpleButton
            text={"Translate"}
            action={translateAction}
            containerStyle={{
              backgroundColor: "white",
              width: 64,
              marginLeft: 8
            }}
            textStyle={{
              fontSize: 13
            }}
            textColor={constants.firstColor}
          />
        ) : (
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
        )}
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
    ...Platform.select({
      ios: {
        height: 48
      },
      android: {
        height: 56
      }
    }),
    width: responsiveWidth(100),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "white",
    position: "absolute"
  },
  customPhraseInput: {
    flex: 1,
    ...Platform.select({
      ios: {
        height: 32
      },
      android: {
        height: 40
      }
    }),
    backgroundColor: constants.shade5,
    borderRadius: 7,
    paddingHorizontal: 8,
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.shade2
  }
});

export default CustomPhrase;
