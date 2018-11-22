import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

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
        <Image
          source={constants.journalComingSoonIllus}
          resizeMode={"contain"}
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100)
          }}
        />
      </View>
    );
  }
}

export default Journal;
