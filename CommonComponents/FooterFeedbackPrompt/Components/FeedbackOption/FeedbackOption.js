import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import Icon from "../../../Icon/Icon";

class FeedbackOption extends Component {
  state = {
    isSelected: false,
    feedbackText: ""
  };

  onEditText = feedbackText => this.setState({ feedbackText });

  toggleSelection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isSelected: !this.state.isSelected });
  };

  render() {
    // option={option} userFeedback={userFeedback} updateUserFeedback={updateUserFeedback}
    const { option, userFeedback, updateUserFeedback } = this.props;
    const { isSelected } = this.state;

    const OptionWrapper = isSelected ? View : TouchableOpacity;
    const OptionWrapperProps = isSelected
      ? {}
      : {
          onPress: this.toggleSelection
        };
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
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
            <View style={styles.unselectedBox} />
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
            style={
              isSelected
                ? styles.feedbackTextInputSelected
                : styles.feedbackTextInputUnselected
            }
            onChangeText={this.onEditText}
            returnKeyType={"next"}
            underlineColorAndroid={"transparent"}
            value={this.state.feedbackText}
            multiline={true}
            onSubmitEditing={() => null}
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
    borderColor: constants.shade3
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
