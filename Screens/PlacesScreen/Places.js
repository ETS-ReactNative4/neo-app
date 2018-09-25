import React, { Component } from "react";
import { View } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

class Places extends Component {
  static navigationOptions = navigation => {
    return {
      header: <CommonHeader title={""} navigation={navigation} />
    };
  };

  render() {
    return <View />;
  }
}

export default Places;
