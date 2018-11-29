import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  RefreshControl,
  BackHandler
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
import { recordEvent } from "../../Services/analytics/analyticsService";
import { registerFcmRefreshListener } from "../../Services/fcmService/fcm";

@inject("infoStore")
@inject("itineraries")
@inject("voucherStore")
@observer
class BookingsHome extends Component {
  static navigationOptions = HomeHeader;

  _didFocusSubscription;
  _willBlurSubscription;

  state = {
    isDownloadLoading: false
  };

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  onBackButtonPressAndroid = () => {
    BackHandler.exitApp();
  };

  componentDidMount() {
    getDeviceToken(token => {
      registerFcmRefreshListener();
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  openSearch = () => {};

  downloadAllVouchers = () => {
    recordEvent(constants.bookingsHomeDownloadAllVouchersClick);
    const { selectedItineraryId } = this.props.itineraries;
    const { setError } = this.props.infoStore;
    this.setState(
      {
        isDownloadLoading: true
      },
      () => {
        apiCall(
          constants.getFinalVoucherDownloadUrl.replace(
            ":itineraryId",
            selectedItineraryId
          ),
          {},
          "GET"
        )
          .then(response => {
            this.setState({
              isDownloadLoading: false
            });
            if (response.status === "SUCCESS" && response.data) {
              CustomTabs.openURL(response.data, {
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
            } else {
              setError(
                "Unable to Download!",
                "Looks like your vouchers aren't ready yet!"
              );
            }
          })
          .catch(err => {
            this.setState({
              isDownloadLoading: false
            });
            setError(
              "Unable to Download!",
              "Internal Server Error!",
              constants.notificationIcon,
              "Okay"
            );
            console.error(err);
          });
      }
    );
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
        {/*<SearchPlaceholder action={this.openSearch} />*/}
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
          {this.state.isDownloadLoading ? (
            <SimpleButton
              containerStyle={{
                width: responsiveWidth(100) - 48,
                marginBottom: 16
              }}
              color={"white"}
              hasBorder={true}
              text={"Download all vouchers"}
              icon={constants.downloadIcon}
              action={() => null}
              iconSize={20}
              textColor={constants.firstColor}
            />
          ) : (
            <SimpleButton
              containerStyle={{
                width: responsiveWidth(100) - 48,
                marginBottom: 16
              }}
              color={"white"}
              hasBorder={true}
              text={"Download all vouchers"}
              icon={constants.downloadIcon}
              action={this.downloadAllVouchers}
              iconSize={20}
              textColor={constants.firstColor}
            />
          )}
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
