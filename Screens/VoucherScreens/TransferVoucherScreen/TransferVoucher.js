import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import IosCloseButton from "../Components/IosCloseButton";
import moment from "moment";
import getTransferImage from "../../../Services/getImageService/getTransferImage";
import dialer from "../../../Services/dialer/dialer";
import { inject, observer } from "mobx-react/custom";
import TitleDate from "../Components/TitleDate";
import getLocaleString from "../../../Services/getLocaleString/getLocaleString";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";

@ErrorBoundary()
@inject("passportDetailsStore")
@observer
class TransferVoucher extends Component {
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
      arrivalTime: costingArrivalTime
    } = transfer;

    const {
      arrivalTime,
      pickupTime,
      bookedTime,
      bookingId,
      contactNumber,
      from,
      to
    } = transfer.voucher;

    const xHeight = isIphoneX()
      ? constants.xNotchHeight
      : Platform.OS === "ios"
        ? 20
        : 0;
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
      vehicle === "TRAIN"
        ? {
            name: "Departure Time",
            value: departureTime
              ? moment(departureTime, "HH:mm").format("hh:mm a")
              : "NA"
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
              pickupTime && pickupTime !== -1
                ? moment(pickupTime).format("hh:mm a")
                : "NA"
          }
        : null,
      {
        name: "Meeting point",
        value: pickup || "NA"
      },
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
          <TitleDate date={dateMillis} />

          <VoucherName name={text} />

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

          {contactNumber ? (
            <SimpleButton
              text={"Contact"}
              action={() => dialer(contactNumber)}
              color={"transparent"}
              containerStyle={{
                width: responsiveWidth(100) - 48,
                marginTop: 24
              }}
              textColor={constants.black2}
              hasBorder={true}
              icon={constants.callIcon}
              iconSize={16}
            />
          ) : null}

          <VoucherSplitSection sections={bookingDetails} />
        </View>

        <View style={styles.accordionSection}>{/*<VoucherAccordion />*/}</View>
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
  arrivalSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  accordionSection: {
    paddingHorizontal: 24
  }
});

export default TransferVoucher;
