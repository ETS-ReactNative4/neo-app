import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";

const TransferInfoBox = ({ containerStyle = {}, text }) => {
  return (
    <View style={[styles.transferInfoBox, containerStyle]}>
      <View style={styles.alertContainer}>
        <Icon size={17} color={"white"} name={constants.infoIcon} />
      </View>
      <Text style={styles.transferInfoText}>{text}</Text>
    </View>
  );
};

TransferInfoBox.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  text: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  transferInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: constants.black1,
    minHeight: 32,
    borderRadius: 3
  },
  alertContainer: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  transferInfoText: {
    ...constants.fontCustom(constants.primarySemiBold, 13, 16),
    color: "white",
    marginHorizontal: 4,
    marginVertical: 4,
    ...Platform.select({
      ios: {
        marginTop: 2
      }
    })
  }
});

export default TransferInfoBox;
