import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const VisaStageFooter = ({ containerStyle = StyleSheet.create({}) }) => {
  return <View style={[containerStyle]}></View>;
};

VisaStageFooter.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({});

export default VisaStageFooter;
