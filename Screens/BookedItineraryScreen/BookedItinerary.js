import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import BookingTitle from "../BookingsHomeScreen/Components/BookingTitle";
import SearchButton from "../../CommonComponents/SearchButton/SearchButton";
import BookedItineraryTopBar from "./Components/BookedItineraryTopBar/BookedItineraryTopBar";
import { inject, observer } from "mobx-react/custom";
import Slot from "./Components/Slot";

@inject("itineraries")
@observer
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
    const { days, slots } = this.props.itineraries;

    return (
      <View style={styles.bookedItineraryContainer}>
        <BookedItineraryTopBar />
        <ScrollView>
          {days.map((day, index) => {
            return <Slot key={index} day={day} slot={slots[index]} />;
          })}
        </ScrollView>
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
