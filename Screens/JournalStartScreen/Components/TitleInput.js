import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";

const TitleInput = ({
  titleLabel = "",
  text = "",
  onEdit = () => null,
  onInputSubmit = () => null,
  maxCharacters = 50,
  placeholder = "",
  containerStyle = {},
  inputStyle = {},
  inputRef = {}
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <View style={styles.labelRow}>
        <Text style={styles.titleText}>{titleLabel}</Text>
        <Text style={styles.titleTextCount}>{`${
          text.length ? `${text.length}/${maxCharacters}` : ""
        }`}</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          maxLength={maxCharacters}
          multiline={true}
          style={inputStyle}
          onChangeText={onEdit}
          value={text}
          returnKeyType={"next"}
          blurOnSubmit={true}
          onSubmitEditing={onInputSubmit}
          underlineColorAndroid={"transparent"}
          placeholder={placeholder}
          placeholderTextColor={constants.shade3}
          textAlignVertical={"top"}
        />
      </View>
    </View>
  );
};

TitleInput.propTypes = forbidExtraProps({
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  titleLabel: PropTypes.string.isRequired,
  onInputSubmit: PropTypes.func.isRequired,
  maxCharacters: PropTypes.number,
  placeholder: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  inputRef: PropTypes.object
});

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 36,
    minHeight: 96
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 16
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 12, 12),
    color: constants.shade1,
    marginRight: 4
  },
  titleTextCount: {
    ...constants.fontCustom(constants.primarySemiBold, 10, 10),
    color: constants.shade3
  },
  inputRow: {}
});

export default TitleInput;
