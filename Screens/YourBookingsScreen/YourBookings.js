import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

class YourBookings extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Your Bookings"} navigation={navigation} />
    };
  };

  render() {
    return <View />;
  }
}

export default YourBookings;
