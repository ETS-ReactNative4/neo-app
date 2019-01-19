import React, { Component } from "react";
import { View, Text } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";

class Notifications extends Component {
  static navigationOptions = HomeHeader;

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default Notifications;
