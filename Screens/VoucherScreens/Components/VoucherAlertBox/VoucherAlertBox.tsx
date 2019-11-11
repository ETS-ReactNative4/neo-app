import React from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";

export interface VoucherAlertBoxProps {
  containerStyle?: ViewStyle;
  alertText: string;
}

const VoucherAlertBox = ({
  containerStyle = StyleSheet.create({}),
  alertText
}: VoucherAlertBoxProps) => {
  return (
    <View style={[styles.voucherAlertBoxContainer, containerStyle]}>
      <Icon />
      <Text>{}</Text>
    </View>
  );
};

export interface VoucherAlertBoxStyles {
  voucherAlertBoxContainer: ViewStyle;
}

const styles = StyleSheet.create<VoucherAlertBoxStyles>({
  voucherAlertBoxContainer: {}
});

export default VoucherAlertBox;
