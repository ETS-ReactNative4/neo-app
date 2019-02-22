import React, { Component, Fragment } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import IosCloseButton from "../Components/IosCloseButton";
import moment from "moment";
import getTransferImage from "../../../Services/getImageService/getTransferImage";
import { inject, observer } from "mobx-react/custom";
import TitleDate from "../Components/TitleDate";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";
import VoucherContactActionBar from "../Components/VoucherContactActionBar";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import VoucherAddressSection from "../Components/VoucherAddressSection";
import FooterStickyActionBar from "../../../CommonComponents/FooterStickyActionBar/FooterStickyActionBar";
import VoucherAccordion from "../Components/VoucherAccordion";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
    ? 20
    : 0;

@ErrorBoundary()
@inject("passportDetailsStore")
@observer
class TransferVoucher extends Component {
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
    const transfer = this.props.navigation.getParam("transfer", {});

    const {
      leadPassengerName,
      passengerCount
    } = this.props.passportDetailsStore;

    const {
      passengers,
      vehicle,
      type,
      pickup,
      drop,
      text,
      dateMillis,
      totalCost,
      publishedCost,
      departureTime,
      arrivalTime: costingArrivalTime,
      pDateMillis,
      day,
      duration,
      mon
    } = transfer;

    const {
      arrivalTime,
      pickupTime,
      bookedTime,
      bookingId,
      contactNumber,
      from,
      to,
      voucherUrl,
      meetingPoint,
      pickupInstructions
    } = transfer.voucher;

    const passengerDetails = [
      {
        name: "Lead passenger",
        value: leadPassengerName || "NA"
      },
      {
        name: "No of Passengers",
        value: passengerCount || "NA"
      },
      {
        name: "Vehicle type",
        value: getTitleCase(vehicle) || "NA"
      },
      vehicle === "Rental Car"
        ? {
            name: "Duration",
            value: `${duration} day${duration > 1 ? "s" : ""}`
          }
        : null,
      vehicle === "TRAIN"
        ? {
            name: "Departure Time",
            value: departureTime
              ? moment(departureTime, "HH:mm").format("hh:mm a")
              : "NA"
          }
        : null,
      vehicle === "TRAIN"
        ? {
            name: "Departure Station",
            value: pickup || "NA"
          }
        : null
    ];
    if (type) {
      passengerDetails.push({
        name: "Type",
        value: type ? getTitleCase(type) : "NA"
      });
    }
    const arrivalDetails = [
      {
        name: "Arrival at",
        value: drop || "NA"
      },
      vehicle !== "TRAIN"
        ? {
            name: "Pickup time",
            value:
              pickupTime && pickupTime > 0
                ? moment(pickupTime).format("hh:mm a")
                : "NA"
          }
        : null,
      vehicle !== "TRAIN"
        ? {
            name: "Meeting point",
            value: pickup || "NA"
          }
        : null,
      vehicle === "TRAIN"
        ? {
            name: "Arrival Time",
            value: costingArrivalTime
              ? moment(costingArrivalTime, "HH:mm").format("hh:mm a")
              : "NA"
          }
        : null
    ];
    const bookingDetails = [
      {
        name: "Booked On",
        value: moment(bookedTime).format("DD MMM, YY")
      },
      {
        name: "Booking Source",
        value: "Pickyourtrail"
      }
    ];

    const voucherName =
      vehicle === "Rental Car" ? `${pickup} to ${drop}` : text;

    let voucherDate = dateMillis;
    if (vehicle === "Rental Car") {
      voucherDate =
        pickupTime && pickupTime > 0
          ? moment(pickupTime).valueOf()
          : pDateMillis && pDateMillis > 0
            ? moment(pDateMillis).valueOf()
            : moment(
                `${day}/${mon}/${constants.currentYear}`,
                "DD/MMM/YYYY"
              ).valueOf();
    }
    if (pickupTime && pickupTime > 0) {
      voucherDate = moment(pickupTime).valueOf();
    }

    const transferAccordionSections = [
      pickupInstructions
        ? {
            name: "Pickup Instructions",
            component: (
              <View style={styles.accordionTextWrapper}>
                <Text style={styles.accordionText}>{pickupInstructions}</Text>
              </View>
            )
          }
        : null
    ];

    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={48 + xHeight}
          fadeOutForeground={Platform.OS !== "android"}
          onChangeHeaderVisibility={this.headerToggle}
          renderStickyHeader={() => (
            <VoucherStickyHeader
              action={this.close}
              text={`Booking Reference - ${bookingId}`}
            />
          )}
          renderForeground={() => (
            <VoucherHeader
              infoText={`BOOKING REFERENCE`}
              title={bookingId}
              menu={() => {}}
              image={{ uri: getTransferImage(vehicle, type) }}
              onClickClose={this.close}
            />
          )}
        >
          <View style={styles.titleSection}>
            <TitleDate date={voucherDate} />

            <VoucherName name={voucherName} />

            <VoucherSplitSection
              sections={passengerDetails}
              rightFontStyle={{ width: responsiveWidth(50) - 24 }}
            />
          </View>

          <View style={styles.arrivalSection}>
            <SectionHeader
              sectionName={"ARRIVAL DETAILS"}
              containerStyle={{ marginBottom: 0 }}
            />

            <VoucherSplitSection sections={arrivalDetails} />

            <VoucherAddressSection
              containerStyle={{ marginTop: 16 }}
              address={meetingPoint}
            />

            <VoucherContactActionBar contact={contactNumber} />

            <VoucherAccordion
              sections={transferAccordionSections}
              openFirstSection={true}
            />

            <VoucherSplitSection sections={bookingDetails} />
          </View>

          <ViewVoucherButton
            containerStyle={{ alignSelf: "center", marginTop: 16 }}
            voucherUrl={voucherUrl}
          />
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
  arrivalSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  accordionSection: {
    paddingHorizontal: 24
  },
  accordionTextWrapper: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  accordionText: {
    width: responsiveWidth(100) - 48,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  }
});

export default TransferVoucher;
