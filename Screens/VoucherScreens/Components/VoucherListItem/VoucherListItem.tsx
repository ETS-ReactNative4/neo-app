import React from "react";
import { View, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";
import constants from "../../../../constants/constants";

export interface VoucherListItemProps {
  containerStyle: ViewStyle;
  leftContainerStyle: ViewStyle;
  leftTextStyle: ViewStyle;
  rightContainerStyle: ViewStyle;
  rightTextStyle: ViewStyle;
  infoTextStyle: ViewStyle;
  name: string;
  value: string;
  info: string;
  isLast: boolean;
}

const VoucherListItem = ({
  containerStyle = StyleSheet.create({}),
  leftContainerStyle = StyleSheet.create({}),
  leftTextStyle = StyleSheet.create({}),
  rightContainerStyle = StyleSheet.create({}),
  rightTextStyle = StyleSheet.create({}),
  infoTextStyle = StyleSheet.create({}),
  name = "",
  value = "",
  info = "",
  isLast = false
}: VoucherListItemProps) => {
  return (
    <View
      style={[
        styles.voucherListItemStyle,
        !isLast ? styles.lastItem : {},
        containerStyle
      ]}
    >
      <View style={[styles.leftContainer, leftContainerStyle]}>
        <Text style={[styles.leftText, leftTextStyle]}>{name}</Text>
      </View>
      <View style={[styles.rightContainer, rightContainerStyle]}>
        <Text style={[styles.rightText, rightTextStyle]}>{value} </Text>
        {info ? (
          <Text style={[styles.infoText, infoTextStyle]}>{info}</Text>
        ) : null}
      </View>
    </View>
  );
};

export interface VoucherListItemStyles {
  voucherListItemStyle: ViewStyle;
  lastItem: ViewStyle;
  leftContainer: ViewStyle;
  leftText: TextStyle;
  rightContainer: ViewStyle;
  rightText: TextStyle;
  infoText: TextStyle;
}

const styles = StyleSheet.create<VoucherListItemStyles>({
  voucherListItemStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24
  },
  lastItem: {
    borderBottomWidth: 1,
    borderBottomColor: constants.shade5
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  leftText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 17),
    color: constants.shade1
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  rightText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 17),
    color: constants.black1
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 17),
    color: constants.shade2
  }
});

export default VoucherListItem;
