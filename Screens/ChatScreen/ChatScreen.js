import React, { Component } from "react";
import { SafeAreaView, View, WebView } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";

class ChatScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#6666ff" }}>
        <WebView
          source={{ uri: constants.crispServerUrl }}
          style={{
            flex: 1,
            marginTop: isIphoneX() ? constants.xNotchHeight : 0
          }}
        />
      </View>
    );
  }
}

export default ChatScreen;
