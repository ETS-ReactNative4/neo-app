import React from "react";
import CustomWebView from "react-native-webview-android-file-upload";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const ControlledWebView = ({
  source,
  onNavigationStateChange,
  style,
  webviewRef,
  injectedJavascript,
  hideLoadingIndicator
}) => {
  return (
    <CustomWebView
      source={source}
      startInLoadingState={hideLoadingIndicator ? false : true}
      onNavigationStateChange={onNavigationStateChange}
      style={style}
      webviewRef={webviewRef}
      injectedJavaScript={injectedJavascript}
    />
  );
};

ControlledWebView.propTypes = forbidExtraProps({
  source: PropTypes.object.isRequired,
  onNavigationStateChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  webviewRef: PropTypes.func.isRequired,
  injectedJavascript: PropTypes.string.isRequired,
  hideLoadingIndicator: PropTypes.bool
});

export default ControlledWebView;
