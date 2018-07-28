import React from "react";
import constants from "../../../constants/constants";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";

const IosCloseButton = ({ clickAction }) => {
  return (
    <TouchableOpacity
      style={styles.closeIconContainer}
      onPress={clickAction}
      activeOpacity={0.2}
    >
      <Icon color={"white"} name={constants.closeIcon} size={24} />
    </TouchableOpacity>
  );
};

IosCloseButton.propTypes = {
  clickAction: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  closeIconContainer: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 32,
    left: 16
  }
});

export default IosCloseButton;
