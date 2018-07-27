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

@inject("itineraries")
@inject("voucherStore")
class FlightVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { getFlightVoucherById } = this.props.voucherStore;
    const { getFlightById } = this.props.itineraries;
    const identifier = this.props.navigation.getParam("identifier", "");

    // header text content needed
    const { voucherId, flyCityText } = getFlightVoucherById(identifier);
    const { trips, allTrips } = getFlightById(identifier);

    const tripDetails = allTrips.map(trip => {
      return trips[trip];
      // {
      //   route: trips[trip].routes.map(route => {
      //     return `${route.departureCity} → ${
      //       route.arrivalCity
      //     }`
      //   }),
      //   carrierName: trips[trip].routes.map(route => {
      //     return route.carrierName;
      //   }),
      //   departure: trips[trip].routes.map(route => {
      //     return `${route.depMonth} ${
      //       route.depDateOfMonth
      //       }, ${route.departureTime.substring(0, 5)}`;
      //   }),
      //   arrival: trips[trip].routes.map(route => {
      //     return `${route.arrMonth} ${
      //       route.arrDateOfMonth
      //       }, ${route.arrivalTime.substring(0, 5)}`;
      //   }),
      // };
    });

    console.log(tripDetails);
    debugger;

    const xHeight = isIphoneX() ? constants.xNotchHeight : 0;
    return (
      <ParallaxScrollView
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={48 + xHeight}
        fadeOutForeground={Platform.OS !== "android"}
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
          />
        )}
      >
        {tripDetails.map((trip, tripIndex) => {
          return <FlightTripView key={tripIndex} trip={trip} />;
        })}
      </ParallaxScrollView>
    );
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
  }
});

export default FlightVoucher;
