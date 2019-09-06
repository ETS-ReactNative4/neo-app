import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import constants from "../../constants/constants";
import { Dropdown as RNDropDown } from "react-native-material-dropdown";

const DropDown = ({
  containerStyle = StyleSheet.create({}),
  dropDownOptions = [],
  selectedValue = "",
  onChange = () => null
}) => {
  return (
    <RNDropDown
      containerStyle={containerStyle}
      onChangeText={onChange}
      label="Images to display"
      data={dropDownOptions}
      value={selectedValue}
      itemCount={6}
      dropdownPosition={0}
      rippleOpacity={0}
      renderBase={({ title }) => {
        return (
          <View style={styles.dropDownTextWrapper}>
            <Text style={styles.dropDownText}>{title}</Text>
            <View style={styles.iconWrapper}>
              <Icon
                name={constants.dropDownArrowIcon}
                color={constants.black1}
                size={8}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

DropDown.propTypes = {
  containerStyle: ViewPropTypes.style,
  dropDownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func
};

const styles = StyleSheet.create({
  dropDownTextWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  dropDownText: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: constants.black1
  },
  iconWrapper: {
    marginLeft: 8
  }
});

export default DropDown;
