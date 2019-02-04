import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PackageInfo from "../../package.json";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";

const ControlledWebView = ({
  source,
  onNavigationStateChange,
  style,
  webviewRef,
  injectedJavascript,
  hideLoadingIndicator,
  useWebKit = true,
  onShouldStartLoadWithRequest = () => true // should always return true to properly load pages
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
      injectedJavaScript={injectedJavascript}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
    />,
    PackageInfo.environment !== "production" ? (
      <View key={1} style={styles.urlInfoBox} pointerEvents={"none"}>
        <Text style={styles.urlInfo}>{`${PackageInfo.environment} : ${
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

ControlledWebView.propTypes = forbidExtraProps({
  source: PropTypes.object.isRequired,
  onNavigationStateChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  webviewRef: PropTypes.func.isRequired,
  injectedJavascript: PropTypes.string,
  hideLoadingIndicator: PropTypes.bool,
  useWebKit: PropTypes.bool,
  onShouldStartLoadWithRequest: PropTypes.func
});

export default ControlledWebView;
