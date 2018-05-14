import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import BookingTitle from "../BookingsHomeScreen/Components/BookingTitle";
import TripToggle from "../../CommonComponents/TripToggle/TripToggle";
import SearchButton from "../../CommonComponents/SearchButton/SearchButton";

class BookedItinerary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          TitleComponent={
            <BookingTitle
              duration={"Mar 14 - Mar 24"}
              title={"PYT1233345"}
              action={() => {}}
            />
          }
          RightButton={<SearchButton action={() => {}} />}
          title={""}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return <View style={styles.bookedItineraryContainer} />;
  }
}

const styles = StyleSheet.create({
  bookedItineraryContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24
  }
});

export default BookedItinerary;
