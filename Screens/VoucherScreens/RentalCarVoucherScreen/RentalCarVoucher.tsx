import React, { Component, Fragment } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
// @ts-ignore
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import IosCloseButton from "../Components/IosCloseButton";
import moment from "moment";
import getTransferImage from "../../../Services/getImageService/getTransferImage";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";
import VoucherContactActionBar from "../Components/VoucherContactActionBar";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import CollapsibleTextSection from "../../../CommonComponents/CollapsibleTextSection/CollapsibleTextSection";
import CheckInCheckOut from "../Components/CheckInCheckOut";
import VoucherAccordion from "../Components/VoucherAccordion";
import RentalCarActionBar from "../Components/RentalCarActionBar";
import VoucherAlertBox from "../Components/VoucherAlertBox/VoucherAlertBox";
import { IRentalCarCosting } from "../../../TypeInterfaces/IItinerary";
import PassportDetails from "../../../mobx/PassportDetails";
import { IVoucherSplitSectionData } from "../types/voucherScreenTypes";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === constants.platformIos
  ? 20
  : 0;

export interface RentalCarVoucherProps {
  navigation: any;
  route: {
    params: {
      rentalCar: IRentalCarCosting | {};
    };
  };
  passportDetailsStore: PassportDetails;
}

export interface RentalCarVoucherState {
  isCloseVisible: boolean;
}

@ErrorBoundary()
@inject("passportDetailsStore")
@observer
class RentalCarVoucher extends Component<
  RentalCarVoucherProps,
  RentalCarVoucherState
> {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 1
    }
  };

  state = {
    isCloseVisible: true
  };

  headerToggle = (status: boolean) => {
    this.setState({
      isCloseVisible: status
    });
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    // @ts-ignore
    const rentalCar: IRentalCarCosting = this.props.route.params
      ? this.props.route.params.rentalCar
      : {};

    const {
      leadPassengerName,
      passengerCount
    } = this.props.passportDetailsStore;

    const { vehicle, type, pickup, drop, duration } = rentalCar;

    const {
      pickupTime,
      pickupTimeStr,
      dropTimeStr,
      pickupDateStr,
      dropDateStr,
      bookingId,
      contactNumber,
      vehicleName,
      voucherUrl,
      gpsIncluded,
      pickupLocation,
      dropLocation,
      pickupInstructions,
      dropInstructions,
      pickupImage,
      dropImage,
      pickupContactNumber,
      dropContactNumber,
      insuranceType
    } = rentalCar.voucher;
    const pickupDate = pickupDateStr
      ? moment(pickupDateStr, constants.voucherDateFormat).format(
          constants.commonDateFormat
        )
      : "";
    const dropDate = dropDateStr
      ? moment(dropDateStr, constants.voucherDateFormat).format(
          constants.commonDateFormatReverse
        )
      : "";

    const passengerDetails: IVoucherSplitSectionData[] = [
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
      },
      {
        name: "Insurance Type",
        value: insuranceType || "NA"
      }
    ];
    const pickingUpDetails: IVoucherSplitSectionData[] = [
      {
        name: "Pickup Location",
        value: pickupLocation || "NA"
      },
      {
        name: "Pickup Date",
        value: pickupDate || "NA"
      },
      {
        name: "Pickup Time",
        value: pickupTimeStr || "NA"
      }
    ];
    const droppingOffDetails: IVoucherSplitSectionData[] = [
      {
        name: "Drop Location",
        value: dropLocation || "NA"
      },
      {
        name: "Drop Date",
        value: dropDate || "NA"
      },
      {
        name: "Drop Time",
        value: dropTimeStr || "NA"
      }
    ];
    const bookingDetails: IVoucherSplitSectionData[] = [
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

    const voucherName =
      pickupLocation && dropLocation
        ? `${pickupLocation} to ${dropLocation}`
        : `${pickup} to ${drop}`;

    const rentalCarAccordion: IVoucherSplitSectionData[] = [
      {
        name: "Picking up",
        component: (
          <View>
            <VoucherSplitSection sections={pickingUpDetails} />
            <CollapsibleTextSection
              title={"Instructions"}
              containerStyle={styles.instructionsWrapper}
              content={pickupInstructions}
            />
            <RentalCarActionBar
              contact={pickupContactNumber}
              imageUrl={pickupImage}
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
              containerStyle={styles.instructionsWrapper}
              content={dropInstructions}
            />
            <RentalCarActionBar
              contact={dropContactNumber}
              imageUrl={dropImage}
            />
          </View>
        )
      }
    ];

    /**
     * Will open pickup or drop sections in the accordion by default based on the current date
     */
    const today = moment();
    const timeDiff = moment(pickupTime).diff(today, "days");
    let openSections = [0];
    if (timeDiff < 0) {
      openSections = [1];
    }

    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={this.state.isCloseVisible ? 0 : 48 + xHeight}
          fadeOutForeground={Platform.OS !== constants.platformAndroid}
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
              image={{ uri: getTransferImage(vehicle, type) }}
              onClickClose={this.close}
              voucherUrl={voucherUrl}
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
              rightFontStyle={styles.passengerFont}
            />

            <VoucherAccordion
              activeSections={openSections}
              sections={rentalCarAccordion}
            />

            <VoucherSplitSection sections={bookingDetails} />
          </View>

          <VoucherAlertBox
            alertText={constants.voucherText.rentalCarMinBalanceText}
            mode={"info"}
            containerStyle={styles.voucherAlertWrapper}
          />

          <VoucherContactActionBar contact={contactNumber} />

          <ViewVoucherButton
            containerStyle={styles.viewVoucherStyle}
            voucherUrl={voucherUrl}
          />
        </ParallaxScrollView>
        {Platform.OS === constants.platformIos && this.state.isCloseVisible ? (
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
  },
  viewVoucherStyle: { alignSelf: "center", marginTop: 16 },
  instructionsWrapper: { marginTop: 16 },
  passengerFont: { width: responsiveWidth(50) - 24 },
  voucherAlertWrapper: {
    marginHorizontal: 24
  }
});

export default RentalCarVoucher;
