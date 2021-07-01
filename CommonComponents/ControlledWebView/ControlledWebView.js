import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import {
  getEnvironmentName,
  isProduction
} from "../../Services/getEnvironmentDetails/getEnvironmentDetails";

const ControlledWebView = ({
  source,
  onNavigationStateChange,
  style,
  webviewRef,
  injectedJavascript,
  hideLoadingIndicator,
  useWebKit = true,
  originWhitelist = ["*"],
  onShouldStartLoadWithRequest = () => true, // should always return true to properly load pages
  ...otherProps
}) => {
  return [
    <WebView
      key={0}
      source={source}
      startInLoadingState={!hideLoadingIndicator}
      onNavigationStateChange={onNavigationStateChange}
      style={style}
      ref={webviewRef}
      useWebKit={useWebKit}
      originWhitelist={originWhitelist}
      injectedJavaScript={injectedJavascript}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      {...otherProps}
    />,
    !isProduction() ? (
      <View key={1} style={styles.urlInfoBox} pointerEvents={"none"}>
        <Text style={styles.urlInfo}>{`${getEnvironmentName()} : ${
          source.uri
        }`}</Text>
      </View>
    ) : null
  ];
};

const styles = StyleSheet.create({
  urlInfoBox: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 14,
    width: responsiveWidth(100),
    alignItems: "flex-start",
    justifyContent: "center",
    top: isIphoneX() ? constants.xNotchHeight : 0
  },
  urlInfo: {
    marginLeft: 24,
    ...constants.fontCustom(constants.primaryLight, 14),
    color: "white"
  }
});

ControlledWebView.propTypes = {
  source: PropTypes.object.isRequired,
  onNavigationStateChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  webviewRef: PropTypes.func.isRequired,
  injectedJavascript: PropTypes.string,
  hideLoadingIndicator: PropTypes.bool,
  useWebKit: PropTypes.bool,
  originWhitelist: PropTypes.array,
  onShouldStartLoadWithRequest: PropTypes.func
};

export default ControlledWebView;
