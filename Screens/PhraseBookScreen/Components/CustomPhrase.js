import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  Keyboard
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import localeCode from "locale-code";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";

class CustomPhrase extends Component {
  static propTypes = forbidExtraProps({
    openLanguageSelector: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.object.isRequired,
    selectPhrase: PropTypes.func.isRequired,
    targetLanguage: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    onKeyBoardStateChange: PropTypes.func.isRequired,
    isKeyboardVisible: PropTypes.bool.isRequired
  });

  state = {
    customPhrase: ""
  };

  onEditText = phrase => {
    this.setState({
      customPhrase: phrase
    });
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const { selectPhrase, targetLanguage, isKeyboardVisible } = this.props;
    const { customPhrase } = this.state;
    const translateAction = () => {
      customPhrase ? selectPhrase(customPhrase, targetLanguage) : null;
      Keyboard.dismiss();
    };
    return [
      <KeyboardAvoidingActionBar
        key={0}
        containerStyle={styles.customPhraseContainer}
        navigation={this.props.navigation}
        onKeyBoardStateChange={this.props.onKeyBoardStateChange}
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
        {isKeyboardVisible && customPhrase ? (
          <SimpleButton
            text={""}
            action={translateAction}
            icon={constants.translateIcon}
            iconSize={24}
            containerStyle={{
              backgroundColor: "white",
              width: null,
              paddingLeft: 16
            }}
            textStyle={{
              fontSize: 13
            }}
            textColor={constants.firstColor}
          />
        ) : (
          <SimpleButton
            text={localeCode.getLanguageName(
              this.props.selectedLanguage.languageCode
            )}
            action={this.props.openLanguageSelector}
            containerStyle={{
              backgroundColor: "white",
              width: null,
              marginLeft: 8
            }}
            textColor={constants.firstColor}
          />
        )}
      </KeyboardAvoidingActionBar>
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
    backgroundColor: "white"
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
