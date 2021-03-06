import React, { Component, Fragment } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherHeader from "../Components/VoucherHeader";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import FlightTripView from "./Components/FlightTripView";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import PassengerName from "../HotelVoucherScreen/Components/PassengerName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import IosCloseButton from "../Components/IosCloseButton";
import { inject, observer } from "mobx-react";
import moment from "moment";
import FlightActionSection from "./Components/FlightActionSection";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import PropTypes from "prop-types";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
  ? 20
  : 0;

@ErrorBoundary()
@inject("passportDetailsStore")
@inject("itineraries")
@observer
class FlightVoucher extends Component {
  static propTypes = {
    passportDetailsStore: PropTypes.object,
    itineraries: PropTypes.object,
    navigation: PropTypes.object,
    route: PropTypes.object
  };

  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 214 + xHeight
    }
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
    const { flight = {} } = this.props.route.params || {};
    /**
     * TODO: header text content needed
     * TODO: Meal preference missing
     * // Total Paid
     * // Booking source missing
     */
    const { flyCityText, pnr, webCheckInUrl, voucherUrl } =
      flight.voucher || {};
    const {
      trips,
      allTrips,
      airlineCode,
      excessBaggageInfo,
      flightClass
    } = flight;
    const { firstDay } = this.props.itineraries;
    const today = moment();
    const timeDiff = firstDay.diff(today, "hours");
    const isWebCheckinActive = timeDiff <= 48;

    const { getPassengerDetails: passengers } = this.props.passportDetailsStore;

    const tripDetails = allTrips.map(trip => {
      return trips[trip];
    });

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
      // {
      //   name: "Booking type",
      //   value: refundable ? "Refundable*" : "Non-Refundable"
      // }
    ];

    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={this.state.isCloseVisible ? 0 : 48 + xHeight}
          fadeOutForeground={Platform.OS !== "android"}
          onChangeHeaderVisibility={this.headerToggle}
          renderStickyHeader={() => (
            <VoucherStickyHeader
              action={this.close}
              text={pnr ? `PNR - ${pnr}` : ""}
            />
          )}
          renderForeground={() => (
            <VoucherHeader
              infoText={flyCityText}
              title={pnr}
              menu={() => {}}
              onClickClose={this.close}
              image={constants.flightVoucherBanner}
              placeHolderHeight={48 + xHeight}
              voucherUrl={voucherUrl}
            >
              <View style={styles.voucherHeaderWrapper}>
                {tripDetails.map((trip, tripIndex) => {
                  const { routes } = trip;
                  return (
                    <Text key={tripIndex} style={styles.voucherHeaderRoute}>{`${
                      routes[0].departureCity
                    } ??? ${routes[routes.length - 1].arrivalCity}`}</Text>
                  );
                })}
                <Text style={styles.voucherHeaderInfo}>{"PNR"}</Text>
                <Text style={styles.voucherHeaderText}>{pnr}</Text>
              </View>
            </VoucherHeader>
          )}
        >
          <View style={styles.flightVoucherContainer}>
            {tripDetails.map((trip, tripIndex) => {
              return [
                <FlightTripView
                  excessBaggageInfo={excessBaggageInfo}
                  flightClass={getTitleCase(flightClass)}
                  webCheckInUrl={webCheckInUrl}
                  isWebCheckinActive={isWebCheckinActive}
                  key={tripIndex}
                  trip={trip}
                  airlineCode={airlineCode}
                  isLast={tripIndex === tripDetails.length - 1}
                />,
                <FlightActionSection
                  key={tripIndex + trip.length}
                  webCheckInUrl={webCheckInUrl}
                  isWebCheckinActive={isWebCheckinActive}
                />
              ];
            })}
            <SectionHeader sectionName={"TRAVELLERS"} />
            {passengers &&
              passengers.map((passenger, passengerIndex) => {
                return (
                  <PassengerName
                    key={passengerIndex}
                    name={`${passenger.salutation}. ${passenger.firstName} ${passenger.lastName}`}
                  />
                );
              })}
            <VoucherSplitSection
              sections={flightInvoiceInfo}
              containerStyle={styles.invoiceInfo}
            />
            <ViewVoucherButton voucherUrl={voucherUrl} />

            {/* refundable ? <ConditionsApplyText /> : null */}
          </View>
        </ParallaxScrollView>
        {Platform.OS === "ios" && this.state.isCloseVisible ? (
          <IosCloseButton clickAction={this.close} />
        ) : null}
      </Fragment>
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
  },
  invoiceInfo: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade4,
    marginTop: 16,
    paddingTop: 16,
    marginBottom: 24
  }
});

export default FlightVoucher;
