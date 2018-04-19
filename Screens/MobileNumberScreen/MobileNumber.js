import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

class MobileNumber extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={""} navigation={navigation} />
    };
  };

  render() {
    return (
      <View>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

export default MobileNumber;
