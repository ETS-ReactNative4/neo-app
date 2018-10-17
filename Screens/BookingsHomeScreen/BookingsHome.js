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
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import constants from "../../constants/constants";
import { getDeviceToken } from "../../Services/fcmService/fcm";

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
      selectedItineraryId,
      getItineraryDetails,
      isLoading: itineraryLoading
    } = this.props.itineraries;
    const { isLoading: voucherLoading, getVouchers } = this.props.voucherStore;
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
                getItineraryDetails(selectedItineraryId);
                getVouchers(selectedItineraryId);
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

          {/* <ControlledWebView
            source={{ uri: constants.crispServerUrl }}
            onNavigationStateChange={() => null}
            style={{ height: 0, width: 0 }}
            webviewRef={() => null}
            injectedJavascript={""}
            hideLoadingIndicator={true}
          />

          <ControlledWebView
            source={{ uri: constants.productUrl }}
            onNavigationStateChange={() => null}
            style={{ height: 0, width: 0 }}
            webviewRef={() => null}
            injectedJavascript={""}
            hideLoadingIndicator={true}
          /> */}
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
