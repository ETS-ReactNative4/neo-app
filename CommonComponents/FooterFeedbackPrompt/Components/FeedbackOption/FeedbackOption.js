import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import Icon from "../../../Icon/Icon";

class FeedbackOption extends Component {
  _feedbackInputRef = React.createRef();

  panResponderStart = () => {
    this.props.disableDragging();
    return false;
  };

  panResponderMove = () => {
    this.props.disableDragging();
    return false;
  };

  onEditText = feedbackText => {
    const { option, updateUserFeedback } = this.props;
    updateUserFeedback(option.identifier, feedbackText);
  };

  submitText = () => {
    setTimeout(() => {
      // timeout added to let text update complete
      const { option, updateUserFeedback, userFeedback } = this.props;
      const feedbackText = userFeedback[option.identifier];
      if (feedbackText) {
        updateUserFeedback(option.identifier, feedbackText.trim());
      }
    }, 500);
  };

  toggleSelection = () => {
    const {
      focusOption,
      blurOption,
      option,
      userFeedback,
      isFocusedOption
    } = this.props;
    const isOptionChosen = typeof userFeedback[option.identifier] === "string";
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isFocusedOption) {
      if (Platform.OS === constants.platformIos) {
        this._feedbackInputRef.current.focus();
      } else {
        // In Android the input field looses focus due to animation.
        // Need to wait for the animation to complete before focus.
        setTimeout(() => {
          this._feedbackInputRef.current.focus();
        }, 500);
      }
      focusOption(option.identifier);
      if (!isOptionChosen) {
        this.onEditText("");
      }
    } else {
      Keyboard.dismiss();
      blurOption();
    }
  };

  render() {
    const {
      option,
      userFeedback,
      keyboardHeight,
      isKeyboardVisible,
      unselectOption,
      isFocusedOption
    } = this.props;

    const isOptionChosen = typeof userFeedback[option.identifier] === "string";

    const OptionWrapper = isFocusedOption ? View : TouchableOpacity;
    const OptionWrapperProps = isFocusedOption
      ? {}
      : {
          onPress: this.toggleSelection
        };

    const CheckBoxWrapper = isOptionChosen ? TouchableOpacity : View;
    const checkBoxProps = isOptionChosen
      ? {
          onPress: () => unselectOption(option.identifier)
        }
      : {};

    const feedbackText = userFeedback[option.identifier] || "";

    return (
      <KeyboardAvoidingView
        style={
          isKeyboardVisible
            ? { position: "absolute", bottom: keyboardHeight }
            : {}
        }
        behavior={
          Platform.OS === constants.platformAndroid ? "height" : "padding"
        }
        enabled
        onStartShouldSetResponder={this.panResponderStart}
        onMoveShouldSetResponder={this.panResponderMove}
      >
        <OptionWrapper
          activeOpacity={0.8}
          style={
            isFocusedOption
              ? styles.feedbackHeaderContainer
              : [
                  styles.clickableContainer,
                  isOptionChosen
                    ? {
                        backgroundColor: constants.seventhColor
                      }
                    : {}
                ]
          }
          {...OptionWrapperProps}
        >
          {isFocusedOption ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.toggleSelection();
                unselectOption(option.identifier);
              }}
              style={styles.selectedCheckBox}
            >
              <Icon
                name={constants.checkIcon}
                size={22}
                color={constants.seventhColor}
              />
            </TouchableOpacity>
          ) : (
            <CheckBoxWrapper
              {...checkBoxProps}
              style={[
                styles.unselectedBox,
                isOptionChosen ? { backgroundColor: "white" } : {}
              ]}
            >
              {isOptionChosen ? (
                <Icon
                  name={constants.checkIcon}
                  size={22}
                  color={constants.seventhColor}
                />
              ) : null}
            </CheckBoxWrapper>
          )}
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={[
              styles.optionText,
              isOptionChosen
                ? styles.optionTextSelected
                : styles.optionTextUnselected
            ]}
          >
            {option.text}
          </Text>
        </OptionWrapper>
        <View
          style={
            isFocusedOption
              ? styles.feedbackTextContainerSelected
              : styles.feedbackTextContainerUnselected
          }
        >
          <TextInput
            ref={this._feedbackInputRef}
            style={
              isFocusedOption
                ? styles.feedbackTextInputSelected
                : styles.feedbackTextInputUnselected
            }
            onChangeText={this.onEditText}
            returnKeyType={"done"}
            underlineColorAndroid={"transparent"}
            value={feedbackText}
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              this.submitText();
              this.toggleSelection();
            }}
            placeholderTextColor={constants.shade2}
            placeholder={"Tell us more..."}
            textAlignVertical={"top"}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const containerWidth = responsiveWidth(100) - 32;

const styles = StyleSheet.create({
  clickableContainer: {
    alignSelf: "center",
    minHeight: 48,
    marginVertical: 4,
    width: containerWidth,
    backgroundColor: constants.seventhColorAlpha(0.2),
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center"
  },
  feedbackHeaderContainer: {
    alignSelf: "center",
    minHeight: 48,
    width: containerWidth,
    backgroundColor: constants.seventhColor,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: constants.seventhColor
  },

  unselectedBox: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: constants.seventhColor
  },
  selectedCheckBox: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: constants.seventhColor
  },

  optionText: {
    width: containerWidth - 26 - 16 - 8,
    ...constants.fontCustom(constants.primaryRegular, 16),
    padding: 16
  },
  optionTextSelected: {
    color: "white"
  },
  optionTextUnselected: {
    color: constants.seventhColor
  },

  feedbackTextContainerUnselected: {
    width: containerWidth,
    height: 0
  },
  feedbackTextContainerSelected: {
    height: 104,
    width: containerWidth,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: constants.shade3,
    backgroundColor: "white"
  },
  feedbackTextInputSelected: {
    padding: 8,
    height: 104,
    ...constants.fontCustom(constants.primaryRegular, 17, 24),
    color: constants.black2,
    marginBottom: 24
  },
  feedbackTextInputUnselected: {
    height: 0,
    color: "transparent"
  }
});

export default FeedbackOption;
