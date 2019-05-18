import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const PDFCloseButton = ({ action }) => {
  return (
    <TouchableHighlight
      style={styles.closeButtonContainer}
      onPress={action}
      underlayColor={"transparent"}
    >
      <Icon name={constants.closeIcon} color={constants.black1} size={24} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  closeButtonContainer: {
    height: constants.headerHeight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  }
});

export default PDFCloseButton;
