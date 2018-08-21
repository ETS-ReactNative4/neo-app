import React, { Component } from "react";
import { View, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import HomeTitle from "../../CommonComponents/HomeTitle/HomeTitle";
import TripToggle from "../../CommonComponents/TripToggle/TripToggle";

class Notifications extends Component {
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
          RightButton={<TripToggle containerStyle={{ marginHorizontal: 24 }} />}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default Notifications;
