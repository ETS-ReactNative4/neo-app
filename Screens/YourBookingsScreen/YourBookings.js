import React, { Component } from "react";
import { View, ScrollView, TouchableHighlight, Image } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";

class YourBookings extends Component {
  static navigationOptions = ({ navigation }) => {
    const LeftButton = (
      <TouchableHighlight
        style={{ paddingHorizontal: 16 }}
        onPress={() => {}}
        underlayColor={"transparent"}
      >
        <Image
          resizeMode={"contain"}
          source={constants.closeIcon}
          style={{ height: 24, width: 30 }}
        />
      </TouchableHighlight>
    );

    const RightButton = (
      <TouchableHighlight
        style={{ paddingHorizontal: 16 }}
        onPress={() => {}}
        underlayColor={"transparent"}
      >
        <Image
          resizeMode={"contain"}
          source={constants.searchIcon}
          style={{ height: 24, width: 30 }}
        />
      </TouchableHighlight>
    );

    return {
      header: (
        <CommonHeader
          LeftButton={LeftButton}
          RightButton={RightButton}
          title={"Your Bookings"}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return <View />;
  }
}

export default YourBookings;
