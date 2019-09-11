import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const VisaInfoCardFooter = ({ containerStyle = StyleSheet.create({}) }) => {
  return <View style={[containerStyle]}></View>;
};

VisaInfoCardFooter.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({});

export default VisaInfoCardFooter;
