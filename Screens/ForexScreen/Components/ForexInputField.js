import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import _ from "lodash";

class ForexInputField extends Component {
  static propTypes = forbidExtraProps({
    label: PropTypes.string,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    setRef: PropTypes.func,
    returnKeyType: PropTypes.string,
    onSubmitField: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onEdit: PropTypes.func
  });

  render() {
    const {
      label = "",
      containerStyle = {},
      setRef = () => null,
      returnKeyType = "done",
      onSubmitField = () => null,
      placeholder = "",
      value = "",
      onEdit = () => null
    } = this.props;

    return (
      <View style={[styles.forexInputContainer, containerStyle]}>
        <Text style={styles.labelText}>{_.toUpper(label)}</Text>
        <TextInput
          ref={e => setRef(e)}
          onChangeText={text => onEdit(text)}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={constants.shade5}
          style={styles.forexInput}
          underlineColorAndroid={"transparent"}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitField}
          keyboardAppearance={"dark"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelText: {
    ...constants.fontCustom(constants.primaryLight, 12, 16),
    color: constants.shade1
  },
  forexInputContainer: {
    marginHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade2
  },
  forexInput: {
    height: Platform.OS === constants.platformIos ? 32 : 40,
    width: responsiveWidth(100) - 48,
    ...constants.fontCustom(constants.primaryRegular, 20),
    color: constants.black1
  }
});

export default ForexInputField;
