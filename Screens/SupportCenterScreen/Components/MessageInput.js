import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ViewPropTypes
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import { Dropdown } from "react-native-material-dropdown";

/**
 * A input component that can display a list of options
 * or a text input based on `isSelectionMode` flag
 */
const MessageInput = ({
  label,
  options,
  onOptionsChange,
  selectedOption,
  isSelectionMode,
  text,
  textPlaceholder,
  onChangeText,
  containerStyle = StyleSheet.create({}),
  inputRef = React.createRef()
}) => {
  return (
    <View style={[styles.messageInputContainer, containerStyle]}>
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.textInputWrapper}>
        {!isSelectionMode ? (
          <TextInput
            ref={inputRef}
            multiline={true}
            style={[styles.textInput, !text ? styles.placeholderStyle : null]}
            onChangeText={onChangeText}
            value={text}
            underlineColorAndroid={"transparent"}
            placeholder={textPlaceholder}
            placeholderTextColor={constants.shade2}
            textAlignVertical={"top"}
          />
        ) : (
          <Dropdown
            style={styles.dropDownWrapper}
            onChangeText={onOptionsChange}
            data={options}
            value={selectedOption}
            itemCount={6}
            dropdownPosition={0}
            rippleOpacity={0}
            renderBase={({ title }) => {
              return (
                <View style={styles.dropDownTextWrapper}>
                  <Text style={styles.dropDownText}>{title}</Text>
                  <Icon
                    name={constants.arrowDown}
                    color={constants.black1}
                    size={8}
                  />
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

MessageInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  onOptionsChange: PropTypes.func,
  selectedOption: PropTypes.string,
  isSelectionMode: PropTypes.bool,
  text: PropTypes.string,
  textPlaceholder: PropTypes.string,
  onChangeText: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  inputRef: PropTypes.instanceOf(() => null)
};

const styles = StyleSheet.create({
  messageInputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  labelWrapper: {
    marginBottom: 8
  },
  labelText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.black2
  },
  textInputWrapper: {
    marginLeft: Platform.OS === constants.platformAndroid ? -2 : 0
  },
  textInput: {
    ...constants.fontCustom(constants.primaryRegular, 16, 20),
    color: constants.black1
  },
  placeholderStyle: {
    fontFamily: constants.primarySemiBold
  },
  dropDownWrapper: {
    marginLeft: 4
  },
  dropDownTextWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 4,
    height: 24,
    alignItems: "center"
  },
  dropDownText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1,
    marginRight: 8
  }
});

export default MessageInput;
