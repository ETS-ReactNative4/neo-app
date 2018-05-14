import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import BookingTitle from "../BookingsHomeScreen/Components/BookingTitle";
import SearchButton from "../../CommonComponents/SearchButton/SearchButton";
import BookedItineraryTopBar from "./Components/BookedItineraryTopBar/BookedItineraryTopBar";

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
    return (
      <View style={styles.bookedItineraryContainer}>
        <BookedItineraryTopBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookedItineraryContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default BookedItinerary;
