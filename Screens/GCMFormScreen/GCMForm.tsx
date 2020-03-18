import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

export interface GCMFormProps {
  containerStyle?: ViewStyle;
}

const GCMForm = ({ containerStyle }: GCMFormProps) => {
  return <View style={[styles.formContainerStyle, containerStyle]} />;
};

const styles = StyleSheet.create({
  formContainerStyle: {
    flex: 1
  }
});

export default GCMForm;
