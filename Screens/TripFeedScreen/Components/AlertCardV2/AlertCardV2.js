import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const AlertCardV2 = ({
  containerStyle = StyleSheet.create({}),
  title,
  message,
  link,
  tag,
  pattern,
  modalData = {},
  icon,
  highlightIcon,
  cta,
  backgroundColor
}) => {
  return <View style={[containerStyle]}></View>;
};

AlertCardV2.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  message: PropTypes.string,
  link: PropTypes.string,
  tag: PropTypes.string,
  pattern: PropTypes.string,
  modalData: PropTypes.Object,
  icon: PropTypes.string,
  highlightIcon: PropTypes.string,
  cta: PropTypes.string,
  backgroundColor: PropTypes.string
};

const styles = StyleSheet.create({});

export default AlertCardV2;
