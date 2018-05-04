import React, { Component } from "react";
import { View, Text, Switch, TouchableHighlight } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import BookingTitle from "./Components/BookingTitle";
import constants from "../../constants/constants";
import TripToggle from "./Components/TripToggle";

class BookingsHome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          LeftButton={
            <HamburgerButton action={() => navigation.navigate("DrawerOpen")} />
          }
          TitleComponent={
            <BookingTitle
              duration={"Mar 14 - Mar 24"}
              title={"PYT1233345"}
              action={() => {}}
            />
          }
          title={""}
          RightButton={
            <TripToggle
              isActive={false}
              action={() => {}}
              containerStyle={{ marginHorizontal: 24 }}
            />
          }
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return (
      <View style={{ paddingHorizontal: 24 }}>
        <Text>Bookings Home</Text>
      </View>
    );
  }
}

export default BookingsHome;
