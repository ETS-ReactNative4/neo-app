import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import Icon from "../../../Icon/Icon";

class FeedbackOption extends Component {
  _feedbackInputRef = React.createRef();

  state = {
    isSelected: false,
    feedbackText: ""
  };

  onEditText = feedbackText => {
    const { option, updateUserFeedback } = this.props;
    this.setState({ feedbackText });
    updateUserFeedback(option.identifier, feedbackText);
  };

  toggleSelection = () => {
    const { selectOption, deselectOption, option } = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isSelected: !this.state.isSelected }, () => {
      if (this.state.isSelected) {
        this._feedbackInputRef.current.focus();
        selectOption(option.identifier);
      } else {
        deselectOption();
      }
    });
  };

  render() {
    const {
      option,
      userFeedback,
      keyboardHeight,
      isKeyboardVisible
    } = this.props;
    const { isSelected } = this.state;

    const isOptionChosen = typeof userFeedback[option.identifier] === "string";

    const OptionWrapper = isSelected ? View : TouchableOpacity;
    const OptionWrapperProps = isSelected
      ? {}
      : {
          onPress: this.toggleSelection
        };
    return (
      <KeyboardAvoidingView
        style={
          isKeyboardVisible
            ? { position: "absolute", bottom: keyboardHeight }
            : {}
        }
        behavior="padding"
        enabled
      >
        <OptionWrapper
          activeOpacity={0.8}
          style={
            isSelected
              ? styles.feedbackHeaderContainer
              : styles.clickableContainer
          }
          {...OptionWrapperProps}
        >
          {isSelected ? (
            <View style={styles.selectedCheckBox}>
              <Icon
                name={constants.checkIcon}
                size={22}
                color={constants.seventhColor}
              />
            </View>
          ) : (
            <View
              style={[
                styles.unselectedBox,
                isOptionChosen
                  ? { backgroundColor: constants.seventhColor }
                  : {}
              ]}
            >
              {isOptionChosen ? (
                <Icon name={constants.checkIcon} size={22} color={"white"} />
              ) : null}
            </View>
          )}
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={[
              styles.optionText,
              isSelected
                ? styles.optionTextSelected
                : styles.optionTextUnselected
            ]}
          >
            {option.text}
          </Text>
        </OptionWrapper>
        <View
          style={
            isSelected
              ? styles.feedbackTextContainerSelected
              : styles.feedbackTextContainerUnselected
          }
        >
          <TextInput
            ref={this._feedbackInputRef}
            style={
              isSelected
                ? styles.feedbackTextInputSelected
                : styles.feedbackTextInputUnselected
            }
            onChangeText={this.onEditText}
            returnKeyType={"done"}
            underlineColorAndroid={"transparent"}
            value={this.state.feedbackText}
            multiline={true}
            onSubmitEditing={() => {
              this.toggleSelection();
              Keyboard.dismiss();
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
    height: 0
  }
});

export default FeedbackOption;
