import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import HomeTitle from "../../CommonComponents/HomeTitle/HomeTitle";
import TripToggle from "../../CommonComponents/TripToggle/TripToggle";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          LeftButton={
            <HamburgerButton action={() => navigation.openDrawer()} />
          }
          TitleComponent={
            <HomeTitle action={() => navigation.navigate("YourBookings")} />
          }
          title={""}
          RightButton={<TripToggle />}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default Home;
