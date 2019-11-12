import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const VoucherStickyHeader = ({ text, action }) => {
  return (
    <View>
      {isIphoneX() ? (
        <XSensorPlaceholder />
      ) : Platform.OS === "ios" ? (
        <View style={{ height: 20 }} />
      ) : null}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={action} style={styles.closeButton}>
          <Icon name={constants.closeIcon} size={20} />
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.title}>
          {text}
        </Text>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.black2
  },
  closeButton: {
    marginHorizontal: 16
  },
  title: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1,
    width: responsiveWidth(100) - 72 // 72 is space occupied by close icon and some margins
  }
});

export default VoucherStickyHeader;
