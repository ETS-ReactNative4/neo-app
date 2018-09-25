import React, { Component } from "react";
import { View, Text } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";

class Home extends Component {
  static navigationOptions = HomeHeader;

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default Home;
