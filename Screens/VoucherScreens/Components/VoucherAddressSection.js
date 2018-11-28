import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const VoucherAddressSection = ({ address, containerStyle }) => {
  if (!containerStyle) containerStyle = {};
  if (!address) return null;
  return (
    <View style={[styles.addressContainer, containerStyle]}>
      <View style={styles.addressSection}>
        <Text
          style={styles.hotelAddress}
          numberOfLines={3}
          ellipsizeMode={"tail"}
        >
          {address}
        </Text>
      </View>
      <View style={styles.addressMarkerSection}>
        <Icon
          size={24}
          color={constants.black1}
          name={constants.locationIcon}
        />
      </View>
    </View>
  );
};

VoucherAddressSection.propTypes = forbidExtraProps({
  address: PropTypes.string.isRequired,
  containerStyle: PropTypes.object.isRequired
});

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row"
  },
  addressSection: {
    width: responsiveWidth(80)
  },
  hotelAddress: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    color: constants.black1
  },
  addressMarkerSection: {
    flex: 1
  },
  addressMarker: {
    height: 24,
    width: 24
  }
});

export default VoucherAddressSection;
