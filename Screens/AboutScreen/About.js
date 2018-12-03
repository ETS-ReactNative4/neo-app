import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";

class About extends Component {
  static navigationOptions = HomeHeader;
  _webView;

  render() {
    return (
      <View style={styles.aboutContainer}>
        <ControlledWebView
          source={{ uri: `${constants.productUrl}about-us` }}
          onNavigationStateChange={() => null}
          style={{
            flex: 1
          }}
          webviewRef={e => (this._webView = e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default About;
