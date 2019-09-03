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
import { responsiveWidth } from "react-native-responsive-dimensions";
import { logError } from "../../Services/errorLogger/errorLogger";
import apiCall from "../../Services/networkRequests/apiCall";
import { recordEvent } from "../../Services/analytics/analyticsService";
import { registerFcmRefreshListener } from "../../Services/fcmService/fcm";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import NoInternetIndicator from "../../CommonComponents/NoInternetIndicator/NoInternetIndicator";
import isUserLoggedInCallback from "../../Services/isUserLoggedInCallback/isUserLoggedInCallback";
import {
  checkIfFileExists,
  downloadFile,
  openFile
} from "../../Services/fileManager/fileManager";
import storeService from "../../Services/storeService/storeService";
import debouncer from "../../Services/debouncer/debouncer";

const generateVoucherFileName = () => {
  const itineraryId = storeService.itineraries.selectedItineraryId;
  return `Pickyourtrail_voucher_PYT${itineraryId
    .substr(itineraryId.length - 7)
    .toUpperCase()}.pdf`;
};

@ErrorBoundary({ isRoot: true })
@inject("infoStore")
@inject("itineraries")
@inject("voucherStore")
@inject("deviceDetailsStore")
@observer
class BookingsHome extends Component {
  static navigationOptions = HomeHeader;

  state = {
    isDownloadLoading: false,
    isFileDownloaded: false
  };
  _didFocusSubscription;

  onBackButtonPressAndroid = () => {
    const { navigation } = this.props;
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      return false;
    }
  };

  componentDidMount() {
    this.enablePushNotificationServices();
    this.checkFileDownloadStatus();
    this._didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        debouncer(() => {
          const { selectedItineraryId } = this.props.itineraries;
          if (selectedItineraryId) {
            pullToRefresh({
              itinerary: true,
              voucher: true
            });
          }
        });
      }
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  openVoucher = () => {
    const fileName = generateVoucherFileName();
    openFile(fileName);
  };

  checkFileDownloadStatus = () => {
    const fileName = generateVoucherFileName();
    const {
      selectedItineraryId,
      getDownloadedVoucherByUrl
    } = this.props.itineraries;
    /**
     * - Will check if the downloaded voucher's file exists in the
     * filesytem.
     * - It will also check if the voucher downloaded is latest using
     * the last downloaded pdf url.
     */
    checkIfFileExists(fileName)
      .then(isExist => {
        if (isExist) {
          apiCall(
            constants.getFinalVoucherDownloadUrl.replace(
              ":itineraryId",
              selectedItineraryId
            ),
            {},
            "GET"
          )
            .then(response => {
              if (response.status === "SUCCESS" && response.data) {
                const voucher = getDownloadedVoucherByUrl(response.data);
                if (voucher) {
                  this.setState({
                    isFileDownloaded: true
                  });
                } else {
                  this.setState({
                    isFileDownloaded: false
                  });
                }
              } else {
                this.setState({
                  isFileDownloaded: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isFileDownloaded: true
              });
            });
        } else {
          this.setState({
            isFileDownloaded: false
          });
        }
      })
      .catch(() => {
        logError("Failed to check if downloaded voucher exists");
      });
  };

  enablePushNotificationServices = () => {
    const { deviceDetailsStore } = this.props;
    isUserLoggedInCallback(() => {
      getDeviceToken(token => {
        registerFcmRefreshListener();
      });
      deviceDetailsStore.setDeviceDetails();
    });
  };

  openSearch = () => {};

  downloadAllVouchers = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.downloadAllVouchers
    });
    const {
      selectedItineraryId,
      updateVoucherDownloadMap
    } = this.props.itineraries;
    const { setError, setInfo } = this.props.infoStore;
    const fileName = generateVoucherFileName();
    this.setState(
      {
        isDownloadLoading: true
      },
      () => {
        /**
         * This will first make a request to check
         * if the final voucher is ready to be downloaded...
         */
        apiCall(
          constants.getFinalVoucherDownloadUrl.replace(
            ":itineraryId",
            selectedItineraryId
          ),
          {},
          "GET"
        )
          .then(response => {
            if (response.status === "SUCCESS" && response.data) {
              /**
               * The final voucher url is available in the response
               * this will now be downloaded and saved to the filesystem.
               */
              downloadFile(response.data, fileName)
                .then(downloadData => {
                  updateVoucherDownloadMap(response.data, downloadData.data);
                  openFile(fileName)
                    .then(() => {
                      this.setState({
                        isDownloadLoading: false,
                        isFileDownloaded: true
                      });
                    })
                    .catch(() => {
                      this.setState({
                        isDownloadLoading: false
                      });
                    });
                })
                .catch(error => {
                  if (error) {
                    logError("Failed to download final voucher", { error });
                  }
                  this.setState({
                    isDownloadLoading: false
                  });
                });
            } else {
              setInfo(
                constants.downloadVoucherText.almostThere.title,
                constants.downloadVoucherText.almostThere.message
              );
              this.setState({
                isDownloadLoading: false
              });
            }
            /*
            if (response.status === "SUCCESS" && response.data) {
              openCustomTab(
                response.data,
                () => null,
                () => {
                  logError(
                    "Unable to launch custom tab to download final Voucher!",
                    {}
                  );
                }
              );
            } else {

            }
            */
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
      selectedItineraryId,
      cities
    } = this.props.itineraries;
    const { isLoading: voucherLoading } = this.props.voucherStore;
    const { navigation } = this.props;

    const isRefreshing = itineraryLoading || voucherLoading;
    const Header = () =>
      HomeHeader({ navigation: this.props.navigation }).header;

    return (
      <View style={styles.bookingHomeContainer}>
        <Header />
        {/*<SearchPlaceholder action={this.openSearch} />*/}
        <NoInternetIndicator />
        <CustomScrollView
          style={styles.bookingContainer}
          showsVerticalScrollIndicator={false}
          horizontalPadding={24}
          refreshing={isRefreshing}
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
            cities={cities}
            getDateSelectionMatrixSingle={getDateSelectionMatrixSingle}
            getTransferTypeByDay={getTransferTypeByDay}
            navigation={navigation}
          />

          {selectedItineraryId ? (
            <SectionHeader sectionName={"Trip Vouchers"} />
          ) : null}

          <BookingAccordion navigation={navigation} />
          {selectedItineraryId ? (
            this.state.isFileDownloaded ? (
              <SimpleButton
                containerStyle={{
                  width: responsiveWidth(100) - 48,
                  marginBottom: 16
                }}
                color={"white"}
                hasBorder={true}
                text={"View voucher"}
                icon={constants.openFileIcon}
                action={this.openVoucher}
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
                text={
                  this.state.isDownloadLoading
                    ? "Downloading..."
                    : "Download all vouchers"
                }
                icon={
                  this.state.isDownloadLoading ? null : constants.downloadIcon
                }
                action={
                  this.state.isDownloadLoading
                    ? () => null
                    : this.downloadAllVouchers
                }
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
  calendarContainer: {},
  bookingContainer: {}
});

export default BookingsHome;
