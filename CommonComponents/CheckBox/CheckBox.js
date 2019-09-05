import React from "react";
import { StyleSheet, ViewPropTypes, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import constants from "../../constants/constants";

const CheckBox = ({
  containerStyle = StyleSheet.create({}),
  isChecked,
  action = () => null
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[
        styles.checkBoxContainer,
        isChecked ? styles.selectedBox : styles.unselectedBox,
        containerStyle
      ]}
    >
      <Icon name={constants.checkIcon} size={10} color={"white"} />
    </TouchableOpacity>
  );
};

CheckBox.propTypes = {
  containerStyle: ViewPropTypes.style,
  isChecked: PropTypes.bool,
  action: PropTypes.func
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2
  },
  selectedBox: {
    backgroundColor: constants.firstColor,
    borderWidth: 2,
    borderColor: constants.firstColor
  },
  unselectedBox: {
    borderWidth: 2,
    borderColor: constants.shade3
  }
});

export default CheckBox;
