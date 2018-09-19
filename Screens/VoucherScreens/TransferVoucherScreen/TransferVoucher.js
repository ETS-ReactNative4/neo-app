import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
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
import VoucherAccordion from "../Components/VoucherAccordion";
import IosCloseButton from "../Components/IosCloseButton";
import moment from "moment";
import getTransferImage from "../../../Services/getImageService/getTransferImage";

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
      passengers,
      vehicle,
      type,
      pickup,
      drop,
      text,
      dateMillis,
      totalCost
    } = transfer;

    const { arrivalTime, pickupTime, bookedTime } = transfer.voucher;

    const xHeight = isIphoneX()
      ? constants.xNotchHeight
      : Platform.OS === "ios"
        ? 20
        : 0;
    const passengerDetails = [
      {
        name: "Lead passenger",
        value: "NA"
      },
      {
        name: "No of Passengers",
        value: passengers || "NA"
      },
      {
        name: "Vehicle type",
        value: vehicle || "NA"
      },
      {
        name: "Type",
        value: type
          ? type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()
          : "NA"
      }
    ];
    const arrivalDetails = [
      {
        name: "Arrival at",
        value: drop || "NA"
      },
      {
        name: "Arrival time",
        value: arrivalTime && arrivalTime !== -1 ? arrivalTime : "NA 00:00 am"
      },
      {
        name: "Pickup time",
        value: pickupTime && pickupTime !== -1 ? arrivalTime : "NA 00:00 am"
      },
      {
        name: "Meeting point",
        value: pickup || "NA"
      }
    ];
    const bookingDetails = [
      {
        name: "Booked On",
        value: moment(bookedTime).format("DD/MM/YY")
      },
      {
        name: "Total Paid",
        value: totalCost ? `Rs. ${totalCost}` : "NA"
      },
      {
        name: "Booking Source",
        value: "NA"
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
          <VoucherStickyHeader action={this.close} text={"NA"} />
        )}
        renderForeground={() => (
          <VoucherHeader
            infoText={`BOOKING ID`}
            title={`NA`}
            menu={() => {}}
            image={{ uri: getTransferImage(vehicle, type) }}
            onClickClose={this.close}
          />
        )}
      >
        <View style={styles.titleSection}>
          <Text style={styles.activityDate}>
            {moment(dateMillis).format("ddd DD")}
          </Text>

          <VoucherName name={text} />

          <VoucherSplitSection sections={passengerDetails} />
        </View>

        <View style={styles.arrivalSection}>
          <SectionHeader
            sectionName={"ARRIVAL DETAILS"}
            containerStyle={{ marginBottom: 0 }}
          />

          <VoucherSplitSection sections={arrivalDetails} />

          <SimpleButton
            text={"Contact"}
            action={() => null}
            color={"transparent"}
            containerStyle={{ width: responsiveWidth(100) - 48, marginTop: 24 }}
            textColor={constants.black2}
            hasBorder={true}
            icon={constants.callIcon}
            iconSize={16}
          />

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

export default TransferVoucher;
