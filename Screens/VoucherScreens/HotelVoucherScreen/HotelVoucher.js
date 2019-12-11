import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import CircleThumbnail from "../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import PassengerName from "./Components/PassengerName";
import VoucherAccordion from "../Components/VoucherAccordion";
import IosCloseButton from "../Components/IosCloseButton";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import moment from "moment";
import VoucherContactActionBar from "../Components/VoucherContactActionBar";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import ConditionsApplyText from "../Components/ConditionsApplyText";
import CheckInCheckOut from "../Components/CheckInCheckOut";
import _ from "lodash";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../../assets/fontMap/hotel-amenities.json";
import VoucherAlertBox from "../Components/VoucherAlertBox/VoucherAlertBox";
import VoucherAddressSectionV2 from "../Components/VoucherAddressSectionV2/VoucherAddressSectionV2";
import PropTypes from "prop-types";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
  ? 20
  : 0;

@ErrorBoundary()
class HotelVoucher extends Component {
  static propTypes = {
    navigation: PropTypes.object
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
    const hotel = this.props.navigation.getParam("hotel", {});
    const Icon = createIconSetFromIcoMoon(icoMoonConfig);

    const {
      checkInDate,
      checkOutDate,
      name,
      roomsInHotel,
      amenityDisplayList,
      imageURL,
      mobile,
      lat,
      lon
    } = hotel;

    const {
      rooms,
      hotelAddress1,
      hotelAddress2,
      checkInDate: checkInDateVoucher,
      checkInTime: checkInTimeVoucher,
      checkOutDate: checkOutDateVoucher,
      checkOutTime: checkOutTimeVoucher,
      voucherUrl
    } = hotel.voucher;

    const amenitiesSection = [
      {
        name: "Hotel Amenities",
        component: amenityDisplayList ? (
          <Fragment>
            {amenityDisplayList.map((amenity, amenityIndex) => {
              const customStyle = {};
              return (
                <View
                  key={amenityIndex}
                  style={[
                    styles.amenitiesTextWrapper,
                    amenityIndex === amenityDisplayList.length - 1
                      ? customStyle
                      : {}
                  ]}
                >
                  <Icon
                    name={amenity.iconUrl}
                    size={18}
                    color={constants.black2}
                  />
                  <Text style={styles.amenitiesText} key={amenityIndex}>
                    {amenity.amenityName}
                  </Text>
                </View>
              );
            })}
            <VoucherAlertBox
              alertText={constants.voucherText.hotelAmenitiesDisclaimer}
              mode={"alert"}
              containerStyle={styles.alertContainer}
            />
          </Fragment>
        ) : null
      }
    ];

    const bookingDetailSection = [
      // Removed Temporarily since data is not accurate
      // {
      //   name: "Booked on",
      //   value: bookedTime ? moment(bookedTime).format("DD MMM, YY") : "NA"
      // },
      // {
      //   name: "Booking source",
      //   value: "Pickyourtrail"
      // }
    ];

    const bookingPNR = rooms
      ? rooms.reduce((pnrString, room) => {
          if (pnrString) {
            pnrString += `${"\n"}, ${room.bookingReferenceId}`;
          } else {
            pnrString = room.bookingReferenceId;
          }
          return pnrString;
        }, "")
      : "";

    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={this.state.isCloseVisible ? 0 : 48 + xHeight}
          renderStickyHeader={() => (
            <VoucherStickyHeader
              action={this.close}
              text={bookingPNR ? `Booking ID - ${bookingPNR}` : ""}
            />
          )}
          fadeOutForeground={Platform.OS !== "android"}
          onChangeHeaderVisibility={this.headerToggle}
          renderForeground={() => (
            <VoucherHeader
              infoText={`BOOKING ID`}
              title={bookingPNR}
              menu={() => {}}
              onClickClose={this.close}
              image={{ uri: imageURL }}
              voucherUrl={voucherUrl}
            />
          )}
        >
          <CheckInCheckOut
            checkInDate={
              checkInDateVoucher
                ? moment(
                    checkInDateVoucher,
                    constants.voucherDateFormat
                  ).format(constants.commonDateFormat)
                : moment(checkInDate, constants.costingDateFormat).format(
                    constants.commonDateFormat
                  )
            }
            checkInTime={`${checkInTimeVoucher ||
              constants.hotelDefaultCheckInTime}*`}
            checkOutDate={
              checkOutDateVoucher
                ? moment(
                    checkOutDateVoucher,
                    constants.voucherDateFormat
                  ).format(constants.commonDateFormatReverse)
                : moment(checkOutDate, constants.costingDateFormat).format(
                    constants.commonDateFormatReverse
                  )
            }
            checkOutTime={`${checkOutTimeVoucher ||
              constants.hotelDefaultCheckOutTime}*`}
          />

          <VoucherName name={name} textStyle={styles.voucherNameWrapper} />

          <View style={styles.bookingDetailsRow}>
            <SectionHeader
              sectionName={`BOOKING DETAILS`}
              containerStyle={styles.bookingDetailsHeader}
            />
            {roomsInHotel &&
              roomsInHotel.map((room, roomIndex) => {
                let {
                  name: roomName,
                  roomImages,
                  freeBreakfast,
                  freeWireless,
                  roomConfiguration,
                  roomTypeId,
                  mealOptions = []
                } = room;

                const { adultCount, childAges } = roomConfiguration;

                const roomVoucherDetails = rooms
                  ? rooms.find(
                      roomDetail => roomDetail.roomTypeId === roomTypeId
                    )
                  : {};
                let {
                  leadPassenger,
                  otherPassengers,
                  bookingReferenceId
                } = roomVoucherDetails;
                leadPassenger = leadPassenger || {};
                otherPassengers = otherPassengers || [];

                /**
                 * Find the user's meal option if mealoptions are available.
                 * This will replace breakfast if present.
                 *
                 * - User "might" have selected a mealoption in a list of meal options.
                 */
                const mealOption = mealOptions.length
                  ? (mealOptions.find(option => option.selected) || {})
                      .mealCodeDisplayText
                  : "";

                const roomImage = roomImages
                  ? roomImages.length
                    ? { uri: roomImages[0] }
                    : constants.hotelSmallPlaceHolder
                  : constants.hotelSmallPlaceHolder;

                const { checkIn, checkOut } = roomVoucherDetails;
                if (checkIn > 1 && checkOut > 1) {
                  freeWireless =
                    typeof roomVoucherDetails.freeWireless === "boolean"
                      ? roomVoucherDetails.freeWireless
                      : freeWireless;
                  freeBreakfast =
                    typeof roomVoucherDetails.freeBreakFast === "boolean"
                      ? roomVoucherDetails.freeBreakFast
                      : freeBreakfast;
                }

                const hotelAmenitySummary = [
                  {
                    name: "Booking Reference ID",
                    value: bookingReferenceId || ""
                  },
                  mealOption
                    ? {
                        name: "Meal Option",
                        value: mealOption
                      }
                    : {
                        name: "Breakfast",
                        value:
                          typeof freeBreakfast === "undefined"
                            ? ""
                            : freeBreakfast
                            ? "Included"
                            : "Not Included"
                      },
                  {
                    name: "Free Wifi",
                    value:
                      typeof freeWireless === "undefined"
                        ? ""
                        : freeWireless
                        ? "Included"
                        : "Not Included"
                  }
                ];

                const hasMealBeenPaid = mealOption || freeBreakfast;

                return (
                  <View key={roomIndex} style={styles.bookedSuit}>
                    <View style={styles.bookedSuitInfo}>
                      <CircleThumbnail
                        defaultImageUri={constants.hotelSmallPlaceHolder}
                        image={roomImage}
                      />
                      <View style={styles.bookedSuitDetails}>
                        <Text style={styles.bookedSuitType}>{roomName}</Text>
                        <Text
                          style={styles.suitBookingDetails}
                        >{`Booked for ${adultCount} adult${
                          adultCount > 1 ? "s" : ""
                        } ${
                          childAges.length
                            ? `${childAges.length} child${
                                childAges.length > 1 ? "ren" : ""
                              }`
                            : ""
                        }`}</Text>
                      </View>
                    </View>

                    {!_.isEmpty(leadPassenger) ? (
                      <PassengerName
                        name={`${leadPassenger.salutation}. ${leadPassenger.firstName} ${leadPassenger.lastName}`}
                      />
                    ) : null}
                    {otherPassengers &&
                      otherPassengers.map((passenger, passengerIndex) => {
                        return (
                          <PassengerName
                            key={passengerIndex}
                            name={`${passenger.salutation}. ${passenger.firstName} ${passenger.lastName}`}
                          />
                        );
                      })}

                    <View style={styles.hotelDetailsSection}>
                      <VoucherSplitSection sections={hotelAmenitySummary} />
                    </View>

                    {hasMealBeenPaid ? (
                      <VoucherAlertBox
                        alertText={constants.voucherText.freeBreakfastInfoText}
                        mode={"info"}
                      />
                    ) : null}
                  </View>
                );
              })}

            {hotelAddress1 || hotelAddress2 ? (
              <VoucherAddressSectionV2
                containerStyle={styles.voucherAddressSectionWrapper}
                address={hotelAddress1 || hotelAddress2}
              />
            ) : null}

            <VoucherContactActionBar contact={mobile} location={{ lat, lon }} />

            <VoucherAlertBox
              alertText={`${
                lat && lon
                  ? constants.voucherText.directionsDisclaimerText + "\n\n"
                  : ""
              }${constants.voucherText.securityDepositText}`}
              mode={"alert"}
              containerStyle={styles.alertContainer}
            />

            <VoucherAccordion sections={amenitiesSection} />

            <View style={styles.bookingSection}>
              <VoucherSplitSection sections={bookingDetailSection} />
            </View>

            <ViewVoucherButton voucherUrl={voucherUrl} />

            <ConditionsApplyText
              text={constants.voucherText.hotelTimingConditionText}
            />
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
  bookingDetailsRow: {
    paddingHorizontal: 24
  },
  bookedSuit: {
    marginTop: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  bookedSuitInfo: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  bookedSuitDetails: {
    marginLeft: 8
  },
  bookedSuitType: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1
  },
  suitBookingDetails: {
    ...constants.font13(constants.primaryLight),
    color: constants.black2
  },

  hotelDetailsSection: {
    marginTop: 24,
    paddingBottom: 8,
    borderBottomWidth: 0,
    borderBottomColor: constants.shade4
  },
  textRowWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 4
  },
  sectionName: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade2
  },
  sectionValue: {
    ...constants.font17(constants.primaryLight),
    color: constants.black1
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },

  alertContainer: {
    marginVertical: 8,
    borderRadius: 4
  },

  amenitiesTextWrapper: {
    marginTop: 8,
    marginBottom: 4,
    flexDirection: "row"
  },
  amenitiesText: {
    ...constants.fontCustom(constants.primaryLight, 18, 20),
    color: constants.black2,
    marginLeft: 8
  },

  bookingSection: {
    marginVertical: 32
  },
  voucherNameWrapper: {
    marginHorizontal: 24
  },
  bookingDetailsHeader: {
    marginBottom: 0
  },
  voucherAddressSectionWrapper: {
    marginTop: 16,
    padding: 0
  }
});

export default HotelVoucher;
