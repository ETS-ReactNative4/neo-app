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
import CollapsibleTextSection from "../../../CommonComponents/CollapsibleTextSection/CollapsibleTextSection";
import CheckInCheckOut from "../Components/CheckInCheckOut";
import VoucherAccordion from "../Components/VoucherAccordion";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
    ? 20
    : 0;

@ErrorBoundary()
@inject("passportDetailsStore")
@observer
class RentalCarVoucher extends Component {
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
    const rentalCar = this.props.navigation.getParam("rentalCar", {});

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
    } = rentalCar;

    const {
      arrivalTime,
      pickupTime,
      pickupTimeStr,
      dropTime,
      dropTimeStr,
      bookedTime,
      bookingId,
      contactNumber,
      from,
      to,
      vehicleName,
      voucherUrl,
      meetingPoint,
      gpsIncluded,
      pickupLocation,
      dropLocation,
      pickupInstructions,
      dropInstructions
    } = rentalCar.voucher;
    const pickupDate =
      pickupTime && pickupTime > 0
        ? moment(pickupTime).format(constants.commonDateFormat)
        : "";
    const dropDate =
      dropTime && dropTime > 0
        ? moment(dropTime).format(constants.commonDateFormatReverse)
        : "";

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
      {
        name: "Model",
        value: vehicleName || "NA"
      },
      {
        name: "Duration",
        value: `${duration} day${duration > 1 ? "s" : ""}`
      },
      {
        name: "GPS Included",
        value: gpsIncluded ? "Yes" : "No"
      }
    ];
    const pickingUpDetails = [
      {
        name: "Pickup Location",
        value: pickupLocation
      },
      {
        name: "Pickup Date",
        value: pickupDate
      },
      {
        name: "Pickup Time",
        value: pickupTimeStr
      }
    ];
    const droppingOffDetails = [
      {
        name: "Drop Location",
        value: dropLocation
      },
      {
        name: "Drop Date",
        value: dropDate
      },
      {
        name: "Drop Time",
        value: dropTimeStr
      }
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
      pickupLocation && dropLocation
        ? `${pickupLocation} to ${dropLocation}`
        : "";

    const rentalCarAccordion = [
      {
        name: "Picking up",
        component: (
          <View>
            <VoucherSplitSection sections={pickingUpDetails} />
            <CollapsibleTextSection
              title={"Instructions"}
              containerStyle={{ marginTop: 16 }}
              content={pickupInstructions}
            />
          </View>
        )
      },
      {
        name: "Dropping Off",
        component: (
          <View>
            <VoucherSplitSection sections={droppingOffDetails} />
            <CollapsibleTextSection
              title={"Instructions"}
              containerStyle={{ marginTop: 16 }}
              content={dropInstructions}
            />
          </View>
        )
      }
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
          <CheckInCheckOut
            checkInDate={pickupDate}
            checkInTitle={"PICK UP"}
            checkOutTitle={"DROP OFF"}
            checkInTime={pickupTimeStr}
            checkOutDate={dropDate}
            checkOutTime={dropTimeStr}
          />
          <View style={styles.titleSection}>
            <VoucherName name={voucherName} />

            <VoucherSplitSection
              sections={passengerDetails}
              rightFontStyle={{ width: responsiveWidth(50) - 24 }}
            />

            <VoucherAccordion
              sections={rentalCarAccordion}
              openFirstSection={true}
            />

            <VoucherSplitSection sections={bookingDetails} />
          </View>

          <VoucherContactActionBar contact={contactNumber} />

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

export default RentalCarVoucher;
