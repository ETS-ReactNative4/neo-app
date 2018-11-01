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
import { CustomTabs } from "react-native-custom-tabs";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { logError } from "../../Services/errorLogger/errorLogger";
import apiCall from "../../Services/networkRequests/apiCall";

@inject("itineraries")
@inject("voucherStore")
@observer
class BookingsHome extends Component {
  static navigationOptions = HomeHeader;

  componentDidMount() {
    getDeviceToken();
  }

  openSearch = () => {};

  downloadAllVouchers = () => {
    const { selectedItineraryId } = this.props.itineraries;
    apiCall(
      constants.getFinalVoucherDownloadUrl.replace(
        ":itineraryId",
        selectedItineraryId
      )
    )
      .then(response => {
        console.log(response);
        CustomTabs.openURL("https://www.pickyourtrail.com", {
          showPageTitle: true
        })
          .then(launched => {
            if (!launched) {
              logError(
                "Unable to launch custom tab to download final Voucher!",
                {}
              );
            }
            return null;
          })
          .catch(err => {
            logError(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };

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
            action={this.downloadAllVouchers}
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
