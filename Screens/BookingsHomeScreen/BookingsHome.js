import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Switch,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import BookingTitle from "./Components/BookingTitle";
import constants from "../../constants/constants";
import TripToggle from "../../CommonComponents/TripToggle/TripToggle";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";
import BookingCalendar from "./Components/BookingCalendar";
import BookingAccordion from "./Components/BookingAccordion";
import { inject, observer } from "mobx-react/custom";

@inject("itineraries")
@observer
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
          RightButton={<TripToggle containerStyle={{ marginHorizontal: 24 }} />}
          navigation={navigation}
        />
      )
    };
  };

  openSearch = () => {};

  render() {
    const {
      selectedItinerary: itinerary,
      startEndDates
    } = this.props.itineraries;

    return (
      <ScrollView style={styles.bookingContainer}>
        <SearchPlaceholder action={this.openSearch} />

        <BookingCalendar itinerary={itinerary} startEndDates={startEndDates} />

        <BookingAccordion />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bookingContainer: {
    paddingHorizontal: 24,
    backgroundColor: "white"
  }
});

export default BookingsHome;
