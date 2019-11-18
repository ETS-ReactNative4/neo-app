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
import { inject, observer } from "mobx-react";
import TitleDate from "../Components/TitleDate";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";
import VoucherContactActionBar from "../Components/VoucherContactActionBar";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import _ from "lodash";
import CollapsibleTextSection from "../../../CommonComponents/CollapsibleTextSection/CollapsibleTextSection";
import VoucherAlertBox from "../Components/VoucherAlertBox/VoucherAlertBox";
import VoucherAddressSectionV2 from "../Components/VoucherAddressSectionV2/VoucherAddressSectionV2";

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
      pickupTimeStr,
      bookedTime,
      bookingId,
      contactNumber,
      from: fromLocation,
      to: toLocation,
      voucherUrl,
      meetingPoint,
      pickupInstructions,
      departureDateStr, //TODO: Departure time to be used from string
      arrivalDateStr,
      departureTimeStr,
      arrivalTimeStr,
      trainName,
      ticketType,
      ticketFormat,
      seatNo,
      coachNumber,
      trainInfo,
      instruction
    } = transfer.voucher;

    const transferPassengerDetails = () => [
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
      type
        ? {
            name: "Type",
            value: type ? getTitleCase(type) : "NA"
          }
        : null
    ];

    const trainPassengerDetails = () => [
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
      {
        name: "Departure Time",
        value: departureTimeStr
          ? departureTimeStr
          : departureTime
          ? moment(departureTime, "HH:mm").format(constants.shortTimeFormat)
          : "NA"
      },
      {
        name: "Departure Station",
        value: fromLocation || pickup || "NA"
      },
      type
        ? {
            name: "Type",
            value: type ? getTitleCase(type) : "NA"
          }
        : null
    ];

    const isTrainVoucher = _.toUpper(vehicle) === constants.vehicleTypes.train;

    const passengerDetails = isTrainVoucher
      ? trainPassengerDetails()
      : transferPassengerDetails();

    const transferArrivalDetails = () => [
      {
        name: "Starting point",
        value:
          (_.toUpper(vehicle) === constants.vehicleTypes.ferry
            ? fromLocation || pickup
            : pickup) || "NA"
      },
      {
        name: "Pickup time",
        value: pickupTimeStr
          ? pickupTimeStr
          : pickupTime && pickupTime > 0
          ? moment(pickupTime).format(constants.shortTimeFormat)
          : "NA"
      },
      {
        name: "Drop off point",
        value:
          (_.toUpper(vehicle) === constants.vehicleTypes.ferry
            ? toLocation || drop
            : drop) || "NA"
      }
    ];

    const trainArrivalDetails = () => [
      {
        name: "Arrival at",
        value: toLocation || drop || "NA"
      },
      {
        name: "Arrival Time",
        value: arrivalTimeStr
          ? arrivalTimeStr
          : costingArrivalTime
          ? moment(costingArrivalTime, "HH:mm").format(
              constants.shortTimeFormat
            )
          : "NA"
      }
    ];

    const arrivalDetails = isTrainVoucher
      ? trainArrivalDetails()
      : transferArrivalDetails();

    const bookingDetails = [
      // Removed Temporarily since data is not accurate
      // {
      //   name: "Booked On",
      //   value: moment(bookedTime).format("DD MMM, YY")
      // },
      // {
      //   name: "Booking Source",
      //   value: "Pickyourtrail"
      // }
    ];

    let trainDetails = [];

    /**
     * The following info is used to display the
     * train details for the user
     */
    if (
      isTrainVoucher &&
      _.toUpper(ticketType) === _.toUpper(constants.reservedTrainTicketType)
    ) {
      trainDetails = [
        {
          name: "Train name",
          value: trainName || ""
        },
        {
          name: "Train information",
          value: trainInfo || ""
        },
        {
          name: "Coach number",
          value: coachNumber || ""
        },
        {
          name: "Seat number",
          value: seatNo || ""
        },
        {
          name: "Ticket Type",
          value: ticketType || ""
        },
        {
          name: "Ticket Format",
          value: ticketFormat || ""
        }
      ];
    }

    const voucherName = isTrainVoucher
      ? fromLocation && toLocation
        ? `${fromLocation} to ${toLocation}`
        : text
      : text;

    let voucherDate = dateMillis;
    if (pickupTime && pickupTime > 0) {
      voucherDate = moment(pickupTime).valueOf();
    }

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
              text={bookingId ? `Booking Reference - ${bookingId}` : ""}
            />
          )}
          renderForeground={() => (
            <VoucherHeader
              infoText={`BOOKING REFERENCE`}
              title={bookingId}
              menu={() => {}}
              image={{ uri: getTransferImage(vehicle, type) }}
              onClickClose={this.close}
              voucherUrl={voucherUrl}
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
            {trainDetails.length ? (
              <Fragment>
                <SectionHeader
                  sectionName={"TRAIN DETAILS"}
                  containerStyle={{ marginBottom: 0 }}
                />

                <VoucherSplitSection sections={trainDetails} />
              </Fragment>
            ) : null}

            {isTrainVoucher &&
            _.toUpper(ticketType) ===
              _.toUpper(constants.openTrainTicketType) ? (
              <VoucherAlertBox
                mode={"alert"}
                alertText={constants.voucherText.openTrainTicketInfo}
              />
            ) : null}

            <SectionHeader
              sectionName={"ARRIVAL DETAILS"}
              containerStyle={{ marginBottom: 0 }}
            />

            <VoucherSplitSection sections={arrivalDetails} />

            <VoucherAddressSectionV2
              containerStyle={{ marginTop: 16, padding: 0 }}
              address={meetingPoint}
            />

            <VoucherContactActionBar contact={contactNumber} />

            {pickupInstructions ? (
              <CollapsibleTextSection
                title={"Pickup Instructions"}
                content={pickupInstructions}
              />
            ) : null}

            {instruction ? (
              <CollapsibleTextSection
                title={"Instructions"}
                content={instruction}
              />
            ) : null}

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
