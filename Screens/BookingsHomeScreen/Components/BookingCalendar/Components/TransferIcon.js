import React from "react";
import { View, Image, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const TransferIcon = ({ transferType }) => {
  const customStyle = {};
  let transferImage;
  switch (transferType.mode) {
    case "TRAIN":
      transferImage = constants.trainIcon;
      break;

    case "FLIGHT":
      transferImage = constants.aeroplaneIcon;
      customStyle.paddingLeft = 1;
      break;

    default:
      transferImage = false;
  }
  if (!transferImage) return null;

  return (
    <View
      style={[
        styles.iconContainer,
        transferType.type === "INTERNATIONAL_DEPART"
          ? { right: 0 }
          : { left: 0 },
        customStyle
      ]}
    >
      <Icon name={transferImage} size={12} color={"white"} />
    </View>
  );
};

TransferIcon.propTypes = forbidExtraProps({
  transferType: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  iconContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "black",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0
  }
});

export default TransferIcon;
