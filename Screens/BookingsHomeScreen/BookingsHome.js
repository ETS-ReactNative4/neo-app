import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  RefreshControl
} from "react-native";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";
import BookingCalendar from "./Components/BookingCalendar/BookingCalendar";
import BookingAccordion from "./Components/BookingAccordion/BookingAccordion";
import { inject, observer } from "mobx-react/custom";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import { getDeviceToken } from "../../Services/fcmService/fcm";
import pullToRefresh from "../../Services/refresh/pullToRefresh";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

@inject("itineraries")
@inject("voucherStore")
@observer
class BookingsHome extends Component {
  static navigationOptions = HomeHeader;

  componentDidMount() {
    getDeviceToken();
  }

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
      isLoading: itineraryLoading,
      selectedItineraryId
    } = this.props.itineraries;
    const { isLoading: voucherLoading } = this.props.voucherStore;
    const { navigation } = this.props;

    return (
      <View style={styles.bookingHomeContainer}>
        <SearchPlaceholder action={this.openSearch} />
        <ScrollView
          style={styles.bookingContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={itineraryLoading || voucherLoading}
              onRefresh={() => {
                pullToRefresh(
                  {
                    itinerary: true,
                    voucher: true
                  },
                  selectedItineraryId
                );
              }}
            />
          }
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

          <SimpleButton
            containerStyle={{
              width: responsiveWidth(100) - 48,
              marginBottom: 16
            }}
            color={"white"}
            hasBorder={true}
            text={"Download all vouchers"}
            icon={constants.activityIcon}
            action={() => null}
            iconSize={20}
            textColor={constants.firstColor}
          />
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
