import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Switch,
  TouchableHighlight,
  StyleSheet,
  LayoutAnimation,
  Platform
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import constants from "../../constants/constants";
import TripToggle from "../../CommonComponents/TripToggle/TripToggle";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";
import BookingCalendar from "./Components/BookingCalendar/BookingCalendar";
import BookingAccordion from "./Components/BookingAccordion/BookingAccordion";
import { inject, observer } from "mobx-react/custom";
import HomeTitle from "../../CommonComponents/HomeTitle/HomeTitle";

@inject("itineraries")
@inject("voucherStore")
@observer
class BookingsHome extends Component {
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

  openSearch = () => {};

  render() {
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    const {
      startEndDates,
      days,
      getDateSelectionMatrixSingle,
      numOfActivitiesByDay,
      getTransferTypeByDay,
      selectedItineraryId
    } = this.props.itineraries;
    const { selectedVoucher } = this.props.voucherStore;
    const { navigation } = this.props;

    return (
      <View style={styles.bookingHomeContainer}>
        <SearchPlaceholder action={this.openSearch} />
        <ScrollView
          style={styles.bookingContainer}
          showsVerticalScrollIndicator={false}
        >
          <BookingCalendar
            numOfActivitiesByDay={numOfActivitiesByDay}
            startEndDates={startEndDates}
            days={days}
            getDateSelectionMatrixSingle={getDateSelectionMatrixSingle}
            getTransferTypeByDay={getTransferTypeByDay}
            navigation={navigation}
          />

          <BookingAccordion navigation={navigation} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookingHomeContainer: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "white"
  },
  bookingContainer: {}
});

export default BookingsHome;
