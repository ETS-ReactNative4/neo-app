import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface VoucherSectionTitleProps {
  containerStyle: ViewStyle;
}

const VoucherSectionTitle = ({
  containerStyle = StyleSheet.create({})
}: VoucherSectionTitleProps) => {
  return <View style={[containerStyle]}></View>;
};

export interface VoucherSectionTitleStyles {}

const styles = StyleSheet.create<VoucherSectionTitleStyles>({});

export default VoucherSectionTitle;
