import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";

const VoucherStickyHeader = ({ text, action }) => {
  return (
    <View>
      {isIphoneX() ? <XSensorPlaceholder /> : null}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={action} style={styles.closeButton}>
          <Icon name={constants.closeIcon} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{text}</Text>
      </View>
    </View>
  );
};

VoucherStickyHeader.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 0.25,
    borderBottomColor: constants.black2
  },
  closeButton: {
    marginHorizontal: 16
  },
  title: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1
  }
});

export default VoucherStickyHeader;
