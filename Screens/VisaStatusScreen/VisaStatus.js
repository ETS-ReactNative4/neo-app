import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const VisaStatus = ({ containerStyle = StyleSheet.create({}) }) => {
  return <View style={[containerStyle]}></View>;
};

VisaStatus.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({});

export default VisaStatus;
