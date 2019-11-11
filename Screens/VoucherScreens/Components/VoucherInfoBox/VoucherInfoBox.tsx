import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface VoucherInfoBoxProps {
  containerStyle: ViewStyle;
}

const VoucherInfoBox = ({
  containerStyle = StyleSheet.create({})
}: VoucherInfoBoxProps) => {
  return <View style={[containerStyle]}></View>;
};

export interface VoucherInfoBoxStyles {}

const styles = StyleSheet.create<VoucherInfoBoxStyles>({});

export default VoucherInfoBox;
