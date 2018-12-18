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
import BookingCalendar from "./Components/BookingCalendar/BookingCalendar";
import BookingAccordion from "./Components/BookingAccordion/BookingAccordion";
import { inject, observer } from "mobx-react/custom";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import { getDeviceToken } from "../../Services/fcmService/fcm";
import pullToRefresh from "../../Services/refresh/pullToRefresh";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import { CustomTabs } from "react-native-custom-tabs";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import { logError } from "../../Services/errorLogger/errorLogger";
import apiCall from "../../Services/networkRequests/apiCall";
import { recordEvent } from "../../Services/analytics/analyticsService";
import { registerFcmRefreshListener } from "../../Services/fcmService/fcm";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";

@ErrorBoundary({ isRoot: true })
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
    const { navigation } = this.props;
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      return false;
    }
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
    const { setError, setInfo } = this.props.infoStore;
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
              setInfo(
                constants.downloadVoucherText.almostThere.title,
                constants.downloadVoucherText.almostThere.message
              );
            }
          })
          .catch(err => {
            this.setState({
              isDownloadLoading: false
            });
            setError(
              constants.downloadVoucherText.error.title,
              constants.downloadVoucherText.error.message,
              constants.errorBoxIllus,
              constants.downloadVoucherText.error.actionText
            );
            console.error(err);
          });
      }
    );
  };

  render() {
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
        <CustomScrollView
          style={styles.bookingContainer}
          showsVerticalScrollIndicator={false}
          horizontalPadding={24}
          refreshing={itineraryLoading || voucherLoading}
          onRefresh={() => {
            pullToRefresh({
              itinerary: true,
              voucher: true
            });
          }}
        >
          <BookingCalendar
            containerStyle={styles.calendarContainer}
            numOfActivitiesByDay={numOfActivitiesByDay}
            startEndDates={startEndDates}
            days={days}
            getDateSelectionMatrixSingle={getDateSelectionMatrixSingle}
            getTransferTypeByDay={getTransferTypeByDay}
            navigation={navigation}
          />

          <BookingAccordion navigation={navigation} />
          {selectedItineraryId ? (
            this.state.isDownloadLoading ? (
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
            )
          ) : null}
        </CustomScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookingHomeContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  calendarContainer: {
    marginTop: 16
  },
  bookingContainer: {}
});

export default BookingsHome;
