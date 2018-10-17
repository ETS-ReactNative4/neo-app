import React, { Component } from "react";
import { View, Text } from "react-native";

class Journal extends Component {
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
        <Text>Journal Screen...</Text>
      </View>
    );
  }
}

export default Journal;
