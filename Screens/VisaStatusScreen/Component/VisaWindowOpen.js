import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const VisaWindowOpen = ({
  containerStyle = StyleSheet.create({}),
  visaDetails
}) => {
  return <View style={[containerStyle]}></View>;
};

VisaWindowOpen.propTypes = {
  containerStyle: ViewPropTypes.style,
  visaDetails: PropTypes.object
};

const styles = StyleSheet.create({});

export default VisaWindowOpen;
