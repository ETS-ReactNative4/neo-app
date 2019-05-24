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
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

class FeedbackOption extends Component {
  static propTypes = forbidExtraProps({
    option: PropTypes.object.isRequired,
    userFeedback: PropTypes.object.isRequired,
    unselectOption: PropTypes.func.isRequired,
    isFocusedOption: PropTypes.bool.isRequired,
    updateUserFeedback: PropTypes.func.isRequired,
    focusOption: PropTypes.func.isRequired,
    blurOption: PropTypes.func.isRequired
  });

  _feedbackInputRef = React.createRef();

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

  onInputSubmit = () => {
    this.submitText();
    this.toggleSelection();
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
      // In Android the input field looses focus due to animation.
      // Need to wait for the animation to complete before focus.
      setTimeout(() => {
        this._feedbackInputRef.current.focus();
      }, 500);
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
        behavior={
          Platform.OS === constants.platformAndroid ? "height" : "padding"
        }
        enabled={false} // Set to false - otherwise android will push the entire screen above the keyboard
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
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={[
              styles.optionText,
              isOptionChosen
                ? styles.optionTextSelected
                : styles.optionTextUnselected,
              isFocusedOption
                ? styles.optionTextFocused
                : styles.optionTextBlurred
            ]}
          >
            {option.text}
          </Text>
          {isFocusedOption ? (
            <SimpleButton
              text={"Done"}
              containerStyle={{ width: 48 }}
              underlayColor={"transparent"}
              action={this.onInputSubmit}
              color={"transparent"}
              textColor={"white"}
            />
          ) : null}
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
            onSubmitEditing={this.onInputSubmit}
            editable={isFocusedOption}
            placeholderTextColor={
              isFocusedOption ? constants.shade2 : "transparent"
            }
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
    padding: 16,
    ...constants.fontCustom(constants.primaryRegular, 16)
  },
  optionTextFocused: {
    width:
      containerWidth -
      26 /*margin size*/ -
      16 /*Icon size*/ -
      8 /*padding size*/ -
      50 /*Done Button size*/
  },
  optionTextBlurred: {
    width:
      containerWidth -
      26 /*margin size*/ -
      16 /*Icon size*/ -
      8 /*padding size*/
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
    height: 104,
    color: "transparent"
  }
});

export default FeedbackOption;
