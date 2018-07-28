import React, { Component } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherHeader from "../Components/VoucherHeader";
import VoucherName from "../Components/VoucherName";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import FlightCard from "./Components/FlightCard";
import { inject } from "mobx-react/custom";
import FlightTripView from "./Components/FlightTripView";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import PassengerName from "../HotelVoucherScreen/Components/PassengerName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import IosCloseButton from "../Components/IosCloseButton";

@inject("itineraries")
@inject("voucherStore")
class FlightVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isCloseVisible: true
  };

  headerToggle = status => {
    this.setState({
      isCloseVisible: status
    });
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { getFlightVoucherById } = this.props.voucherStore;
    const { getFlightById } = this.props.itineraries;
    const identifier = this.props.navigation.getParam("identifier", "");

    /**
     * TODO: header text content needed
     * TODO: Meal preference missing
     * // Total Paid
     * // Booking source missing
     */
    const {
      voucherId,
      flyCityText,
      passengers,
      dateOfIssue,
      cancellationPolicy
    } =
      getFlightVoucherById(identifier) || {};
    const { trips, allTrips } = getFlightById(identifier) || {};

    const tripDetails = allTrips.map(trip => {
      return trips[trip];
    });

    const xHeight = isIphoneX()
      ? constants.xNotchHeight
      : Platform.OS === "ios"
        ? 20
        : 0;

    const flightInvoiceInfo = [
      {
        name: "Issued date",
        value: dateOfIssue
      },
      {
        name: "Total paid",
        value: ""
      },
      {
        name: "Booking source",
        value: ""
      },
      {
        name: "Booking type",
        value: cancellationPolicy
      }
    ];

    return [
      <ParallaxScrollView
        key={0}
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={48 + xHeight}
        fadeOutForeground={Platform.OS !== "android"}
        onChangeHeaderVisibility={this.headerToggle}
        renderStickyHeader={() => (
          <VoucherStickyHeader action={this.close} text={voucherId} />
        )}
        renderForeground={() => (
          <VoucherHeader
            infoText={flyCityText}
            title={voucherId}
            menu={() => {}}
            onClickClose={this.close}
            image={constants.splashBackground}
            placeHolderHeight={48 + xHeight}
          />
        )}
      >
        <View style={styles.flightVoucherContainer}>
          {tripDetails.map((trip, tripIndex) => {
            return (
              <FlightTripView
                key={tripIndex}
                trip={trip}
                isLast={tripIndex === tripDetails.length - 1}
              />
            );
          })}
          <SectionHeader sectionName={"TRAVELLERS"} />
          {passengers &&
            passengers.map((passenger, passengerIndex) => {
              return (
                <PassengerName
                  key={passengerIndex}
                  name={`${passenger.salutation}. ${passenger.firstName} ${
                    passenger.lastName
                  }`}
                  secondaryText={`TICKET NO: ${passenger.ticketNumber}`}
                />
              );
            })}
          <VoucherSplitSection
            sections={flightInvoiceInfo}
            containerStyle={{
              borderTopWidth: 1,
              borderColor: constants.shade4,
              marginTop: 16,
              paddingTop: 16,
              marginBottom: 24
            }}
          />
        </View>
      </ParallaxScrollView>,
      Platform.OS === "ios" && this.state.isCloseVisible ? (
        <IosCloseButton key={1} clickAction={this.close} />
      ) : null
    ];
  }
}

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  activityDate: {
    marginBottom: 8
  },
  arrivalSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  accordionSection: {
    paddingHorizontal: 24
  },
  flightVoucherContainer: {
    marginHorizontal: 24
  }
});

export default FlightVoucher;
