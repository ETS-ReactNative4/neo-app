import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const PreviewControlButton = ({
  containerStyle = {},
  onClick = () => null,
  isActive = false,
  icon = constants.closeIcon,
  isSelected = false
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
      style={[
        styles.previewControlButtonContainer,
        isSelected ? styles.selected : null,
        containerStyle
      ]}
    >
      <Icon name={icon} color={"white"} size={16} />
    </TouchableOpacity>
  );
};

PreviewControlButton.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
});

const styles = StyleSheet.create({
  previewControlButtonContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: "center",
    justifyContent: "center"
  },
  selected: {
    backgroundColor: constants.seventhColor
  }
});

export default PreviewControlButton;
