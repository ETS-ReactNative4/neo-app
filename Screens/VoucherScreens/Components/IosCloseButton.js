import React from "react";
import constants from "../../../constants/constants";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";

const IosCloseButton = ({ clickAction }) => {
  return (
    <TouchableOpacity
      style={styles.closeIconTouchable}
      onPress={clickAction}
      activeOpacity={0.2}
    >
      <View style={styles.iconContainer}>
        <Icon color={"white"} name={constants.closeIcon} size={24} />
      </View>
    </TouchableOpacity>
  );
};

IosCloseButton.propTypes = {
  clickAction: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 16
  },
  closeIconTouchable: {
    position: "absolute",
    top: 16,
    padding: 16
  }
});

export default IosCloseButton;
