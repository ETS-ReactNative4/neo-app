import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const AddImageThumbnail = ({ action }) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.addImageThumbnail}
    >
      <Icon name={constants.addImageIcon} size={24} color={constants.black2} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addImageThumbnail: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constants.shade5,
    borderRadius: 2
  }
});

export default AddImageThumbnail;
