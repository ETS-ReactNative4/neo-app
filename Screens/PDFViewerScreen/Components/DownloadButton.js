import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const PDFDownloadButton = ({ action }) => {
  return (
    <TouchableHighlight
      style={styles.downloadButtonContainer}
      onPress={action}
      underlayColor={"transparent"}
    >
      <Icon name={constants.downloadIcon} color={constants.black1} size={24} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  downloadButtonContainer: {
    height: constants.headerHeight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  }
});

export default PDFDownloadButton;
