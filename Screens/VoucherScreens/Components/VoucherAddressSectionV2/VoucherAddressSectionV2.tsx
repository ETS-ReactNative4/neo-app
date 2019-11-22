import React from "react";
import { View, StyleSheet, ViewStyle, Text, TextStyle } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";

export interface VoucherAddressSectionV2Props {
  containerStyle?: ViewStyle;
  address: string;
}

const VoucherAddressSectionV2 = ({
  containerStyle = StyleSheet.create({}),
  address = ""
}: VoucherAddressSectionV2Props) => {
  if (!address) return null;
  return (
    <View style={[styles.voucherAddressSectionContainer, containerStyle]}>
      <View style={styles.titleContainer}>
        <Icon name={constants.locationIcon} size={14} />
        <Text style={styles.addressTitleText}>{"ADDRESS"}</Text>
      </View>
      <View style={styles.addressTextContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>
    </View>
  );
};

export interface VoucherAddressSectionV2Styles {
  voucherAddressSectionContainer: ViewStyle;
  titleContainer: ViewStyle;
  addressTitleText: TextStyle;
  addressTextContainer: TextStyle;
  addressText: TextStyle;
}

const styles = StyleSheet.create<VoucherAddressSectionV2Styles>({
  voucherAddressSectionContainer: {
    padding: 24
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  addressTitleText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.black1,
    marginLeft: 8,
    marginTop: 2
  },
  addressTextContainer: {
    marginTop: 16
  },
  addressText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black2
  }
});

export default VoucherAddressSectionV2;
