import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const VisaStageBullets = ({ containerStyle = StyleSheet.create({}) }) => {
  return <View style={[containerStyle]}></View>;
};

VisaStageBullets.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({});

export default VisaStageBullets;
