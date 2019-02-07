import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";

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

const containerWidth = responsiveWidth(100) - 48;
const iconWidth = 20;
const styles = StyleSheet.create({
  transferInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: constants.black1,
    minHeight: 32,
    borderRadius: 3,
    width: containerWidth
  },
  alertContainer: {
    height: 20,
    width: iconWidth,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  transferInfoText: {
    ...constants.fontCustom(constants.primarySemiBold, 13, 16),
    color: "white",
    marginHorizontal: 4,
    width: containerWidth - iconWidth - 16,
    marginVertical: 4,
    ...Platform.select({
      ios: {
        marginTop: 2
      }
    })
  }
});

export default TransferInfoBox;
