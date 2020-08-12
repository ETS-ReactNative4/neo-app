import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import { inject, observer } from "mobx-react";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PaymentInfoCard from "./Components/PaymentInfoCard";
import apiCall from "../../Services/networkRequests/apiCall";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import storeService from "../../Services/storeService/storeService";
import { CONSTANT_drawerEvents } from "../../constants/appEvents";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import { SCREEN_PAYMENT_SUMMARY } from "../../NavigatorsV2/ScreenNames";

@ErrorBoundary({ isRoot: true })
@inject("yourBookingsStore")
@observer
class PaymentHome extends Component {
  state = {
    isLoading: false,
    paymentMeta: {},
    displayCurrency: null
  };
  _didFocusSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this.getPaymentMeta();
      }
    );

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: "Payments"
        })
    });
  }

  componentDidMount() {
    this.getPaymentMeta();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  getPaymentMeta() {
    this.setState({
      isLoading: true
    });
    apiCall(constants.getPaymentMeta)
      .then(response => {
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 1000);
        if (response.status === "SUCCESS") {
          this.setState({
            paymentMeta: response.data,
            displayCurrency: response.displayCurrency
          });
        } else {
          this.apiFailure();
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        this.apiFailure();
      });
  }

  apiFailure = () => {};

  render() {
    const {
      upcomingItineraries,
      // completedItineraries,
      isLoading,
      getUpcomingItineraries
    } = this.props.yourBookingsStore;

    const itinerariesList = upcomingItineraries;

    return (
      <View style={styles.paymentContainer}>
        <CustomScrollView
          refreshing={isLoading || this.state.isLoading}
          onRefresh={() => {
            getUpcomingItineraries();
            this.getPaymentMeta();
          }}
        >
          {!itinerariesList.length && !isLoading ? (
            <EmptyListPlaceholder
              text={`No active bookings found on this number. If the booking is made by someone else, you need an invite from them to proceed.`}
              containerStyle={{
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: constants.shade4,
                marginHorizontal: 24
              }}
            />
          ) : null}
          {itinerariesList.map((itinerary, index) => {
            const paymentDetails = this.state.paymentMeta[
              itinerary.itineraryId
            ];
            if (paymentDetails) {
              let isLast = false;
              if (index === itinerariesList.length - 1) isLast = true;
              return (
                <PaymentInfoCard
                  key={index}
                  itineraryName={itinerary.itineraryName}
                  itineraryId={itinerary.itineraryId}
                  selectItinerary={() =>
                    this.props.navigation.navigate(SCREEN_PAYMENT_SUMMARY, {
                      itineraryId: itinerary.itineraryId,
                      itineraryName: itinerary.itineraryName,
                      paymentDetails
                    })
                  }
                  isLast={isLast}
                  isPaymentPending={paymentDetails.paymentStatus !== "SUCCESS"}
                  paymentDue={paymentDetails.paymentDue}
                  paymentStatus={paymentDetails.paymentStatus}
                  nextPendingDate={paymentDetails.nextPendingDate}
                  totalAmountPaid={paymentDetails.totalAmountPaid}
                  displayCurrency={this.state.displayCurrency}
                />
              );
            } else {
              return null;
            }
          })}
        </CustomScrollView>
        {isIphoneX() ? <XSensorPlaceholder /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PaymentHome;
