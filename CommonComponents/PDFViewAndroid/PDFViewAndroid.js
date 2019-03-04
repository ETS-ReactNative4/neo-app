import React from "react";
import { Platform, StyleSheet, Alert } from "react-native";
import constants from "../../constants/constants";
import { logError } from "../../Services/errorLogger/errorLogger";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const PDFViewAndroid = ({ uri, containerStyle = {} }) => {
  if (Platform.OS === constants.platformIos) return null;
  let PDF = require("react-native-pdf").default;
  return (
    <PDF
      source={{ uri }}
      onError={error => {
        logError(error, { type: "Error in Android PDF Viewer", PDFUri: uri });
        Alert.alert("Error", constants.pdfViewerErrorText);
      }}
      style={[styles.pdfViewer, containerStyle]}
    />
  );
};

PDFViewAndroid.propTypes = forbidExtraProps({
  uri: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

const styles = StyleSheet.create({
  pdfViewer: {
    flex: 1
  }
});

export default PDFViewAndroid;
