import React, { Component } from "react";
import { View, Text, Platform, StyleSheet, StatusBar } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherHeader from "../Components/VoucherHeader";
import VoucherName from "../Components/VoucherName";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import FlightCard from "./Components/FlightCard";
import FlightTripView from "./Components/FlightTripView";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import PassengerName from "../HotelVoucherScreen/Components/PassengerName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import IosCloseButton from "../Components/IosCloseButton";
import { inject, observer } from "mobx-react/custom";

@inject("passportDetailsStore")
@observer
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
    const flight = this.props.navigation.getParam("flight", {});
    /**
     * TODO: header text content needed
     * TODO: Meal preference missing
     * // Total Paid
     * // Booking source missing
     */
    const {
      flyCityText,
      dateOfIssue,
      cancellationPolicy,
      pnr,
      sourceProvider,
      totalCost,
      invoiceNumber,
      bookingReferenceId,
      webCheckInUrl,
      refundable
    } = flight.voucher;
    const { trips, allTrips, airlineCode } = flight;

    const { getPassengerDetails: passengers } = this.props.passportDetailsStore;

    const tripDetails = allTrips.map(trip => {
      return trips[trip];
    });

    const xHeight = isIphoneX()
      ? constants.xNotchHeight
      : Platform.OS === "ios"
        ? 20
        : 0;

    const flightInvoiceInfo = [
      // {
      //   name: "Booking Reference ID",
      //   value: bookingReferenceId || "NA"
      // },
      // {
      //   name: "Total paid",
      //   value: totalCost ? `Rs. ${totalCost.toFixed(2)}` : "NA"
      // },
      // {
      //   name: "Booking source",
      //   value: sourceProvider || "NA"
      // },
      {
        name: "Booking type",
        value: refundable ? "Refundable" : "Non-Refundable"
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
          <VoucherStickyHeader action={this.close} text={`PNR - ${pnr}`} />
        )}
        renderForeground={() => (
          <VoucherHeader
            infoText={flyCityText}
            title={pnr}
            menu={() => {}}
            onClickClose={this.close}
            image={constants.flightVoucherBanner}
            placeHolderHeight={48 + xHeight}
          >
            <View style={styles.voucherHeaderWrapper}>
              {tripDetails.map((trip, tripIndex) => {
                const { routes } = trip;
                return (
                  <Text key={tripIndex} style={styles.voucherHeaderRoute}>{`${
                    routes[0].departureCity
                  } → ${routes[routes.length - 1].arrivalCity}`}</Text>
                );
              })}
              <Text style={styles.voucherHeaderInfo}>{"PNR"}</Text>
              <Text style={styles.voucherHeaderText}>{pnr}</Text>
            </View>
          </VoucherHeader>
        )}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.flightVoucherContainer}>
          {tripDetails.map((trip, tripIndex) => {
            return (
              <FlightTripView
                webCheckInUrl={webCheckInUrl}
                key={tripIndex}
                trip={trip}
                airlineCode={airlineCode}
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
  voucherHeaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  voucherHeaderRoute: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    color: "white",
    marginBottom: 8
  },
  voucherHeaderInfo: {
    fontFamily: constants.primarySemiBold,
    color: "rgba(255,255,255,0.6)",
    fontSize: 13
  },
  voucherHeaderText: {
    fontFamily: constants.primarySemiBold,
    color: constants.secondColor,
    fontSize: 30
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
