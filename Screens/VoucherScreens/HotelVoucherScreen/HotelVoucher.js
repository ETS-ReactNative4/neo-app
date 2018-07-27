import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Platform
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import CircleThumbnail from "../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import Icon from "../../../CommonComponents/Icon/Icon";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import { inject } from "mobx-react/custom";
import PassengerName from "./Components/PassengerName";
import VoucherAccordion from "../Components/VoucherAccordion";

@inject("itineraries")
@inject("voucherStore")
class HotelVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.offset ? "down" : "up";
    this.offset = currentOffset;
    console.log(direction);
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { getHotelVoucherById } = this.props.voucherStore;
    const { getHotelById } = this.props.itineraries;
    const identifier = this.props.navigation.getParam("identifier", "");
    const hotel = {
      ...getHotelById(identifier),
      ...getHotelVoucherById(identifier)
    };
    const xHeight = isIphoneX() ? constants.xNotchHeight : 0;

    // Contact number
    // Google Map linking
    // Booking date
    // total paid
    const {
      voucherId,
      checkInDateDisplay,
      checkInMonthDisplay,
      checkInDayOfWeek,
      checkOutDateDisplay,
      checkOutMonthDisplay,
      checkOutDayOfWeek,
      checkInTime, // 24-hour format?
      checkOutTime, // 24-hour format?
      name,
      hotelAddress1,
      hotelAddress2,
      rooms,
      amenities,
      bookingSource,
      imageURL
    } = hotel;

    const amenitiesSection = [
      {
        name: "Hotel Amenities",
        component: amenities.map((amenity, amenityIndex) => {
          const customStyle = {
            borderBottomWidth: 1,
            borderBottomColor: constants.shade4
          };
          return (
            <View
              style={[
                styles.amenitiesTextWrapper,
                amenityIndex === amenities.length - 1 ? customStyle : {}
              ]}
            >
              <Text style={styles.amenitiesText} key={amenityIndex}>{`• ${
                amenity.name
              }`}</Text>
            </View>
          );
        })
      }
    ];

    const bookingDetailSection = [
      {
        title: "Booked on",
        text: ""
      },
      {
        title: "Total paid",
        text: ""
      },
      {
        title: "Booking source",
        text: bookingSource
      }
    ];

    return (
      <ParallaxScrollView
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={48 + xHeight}
        renderStickyHeader={() => (
          <VoucherStickyHeader action={this.close} text={voucherId} />
        )}
        fadeOutForeground={Platform.OS !== "android"}
        renderForeground={() => (
          <VoucherHeader
            infoText={`BOOKING ID`}
            title={voucherId}
            menu={() => {}}
            onClickClose={this.close}
            image={{ uri: imageURL }}
          />
        )}
      >
        <View style={styles.checkInRow}>
          <View style={styles.checkInBox}>
            <Text style={styles.checkTitle}>CHECK IN</Text>
            <Text
              style={styles.checkDate}
            >{`${checkInDayOfWeek}, ${checkInDateDisplay} ${checkInMonthDisplay}`}</Text>
            <Text style={styles.checkTime}>{checkInTime}</Text>
          </View>
          <View style={styles.checkOutBox}>
            <Text style={styles.checkTitle}>CHECK OUT</Text>
            <Text
              style={styles.checkDate}
            >{`${checkOutDayOfWeek}, ${checkOutDateDisplay} ${checkOutMonthDisplay}`}</Text>
            <Text style={styles.checkTime}>{checkOutTime}</Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <VoucherName name={name} />
          <View style={styles.addressContainer}>
            <View style={styles.addressSection}>
              <Text
                style={styles.hotelAddress}
                numberOfLines={3}
                ellipsizeMode={"tail"}
              >
                {`${hotelAddress1 || ""} ${hotelAddress2 || ""}`}
              </Text>
            </View>
            <View style={styles.addressMarkerSection}>
              <Image
                style={styles.addressMarker}
                resizeMode={"contain"}
                source={constants.notificationIcon}
              />
            </View>
          </View>
        </View>

        <View style={styles.bookingDetailsRow}>
          <SectionHeader
            sectionName={`BOOKING DETAILS`}
            containerStyle={{ marginBottom: 0 }}
          />
          {rooms.map((room, roomIndex) => {
            const {
              leadPassenger, // Gender Needed?
              roomType,
              roomPaxInfo,
              otherPassengers
            } = room;

            return (
              <View key={roomIndex} style={styles.bookedSuit}>
                <View style={styles.bookedSuitInfo}>
                  <CircleThumbnail image={constants.splashBackground} />
                  <View style={styles.bookedSuitDetails}>
                    <Text style={styles.bookedSuitType}>{roomType}</Text>
                    <Text
                      style={styles.suitBookingDetails}
                    >{`Booked for ${roomPaxInfo}`}</Text>
                  </View>
                </View>

                <PassengerName
                  name={`${leadPassenger.salutation}. ${
                    leadPassenger.firstName
                  } ${leadPassenger.lastName}`}
                />
                {otherPassengers.map((passenger, passengerIndex) => {
                  return (
                    <PassengerName
                      key={passengerIndex}
                      name={`${passenger.salutation}. ${passenger.firstName} ${
                        passenger.lastName
                      }`}
                    />
                  );
                })}

                <View style={styles.hotelDetailsSection}>
                  <View style={styles.textRowWrapper}>
                    <Text style={styles.sectionName}>Breakfast</Text>
                    <Text style={styles.sectionValue}>Complementary</Text>
                  </View>
                  <View style={styles.textRowWrapper}>
                    <Text style={styles.sectionName}>Free Wifi</Text>
                    <Text style={styles.sectionValue}>Included</Text>
                  </View>
                  <View style={styles.textRowWrapper}>
                    <Text style={styles.sectionName}>Booking Type</Text>
                    <Text style={styles.sectionValue}>
                      Partially Refundable
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.actionRow}>
            <SimpleButton
              text={"Contact"}
              containerStyle={{ width: responsiveWidth(43) }}
              action={() => {}}
              color={"transparent"}
              textColor={constants.black2}
              hasBorder={true}
              icon={constants.trainIcon}
              iconSize={16}
            />
            <SimpleButton
              text={"Directions"}
              containerStyle={{ width: responsiveWidth(43) }}
              action={() => {}}
              color={"transparent"}
              textColor={constants.black2}
              hasBorder={true}
              icon={constants.trainIcon}
              iconSize={16}
            />
          </View>

          <VoucherAccordion sections={amenitiesSection} />

          <View style={styles.bookingSection}>
            {bookingDetailSection.map((booking, bookingIndex) => {
              return (
                <View style={styles.textRowWrapper}>
                  <Text style={styles.sectionName}>{booking.title}</Text>
                  <Text style={styles.sectionValue}>{booking.text}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  checkInRow: {
    height: 64,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16
  },
  checkInBox: {
    alignItems: "flex-start"
  },
  checkOutBox: {
    alignItems: "flex-end"
  },
  checkTitle: {
    fontFamily: constants.primarySemiBold,
    fontSize: 11,
    color: constants.black2
  },
  checkDate: {
    fontSize: 17,
    fontFamily: constants.primarySemiBold,
    color: constants.thirdColor
  },
  checkTime: {
    fontSize: 17,
    fontFamily: constants.primaryLight,
    color: constants.shade1,
    marginTop: 5
  },

  addressRow: {
    paddingHorizontal: 24,
    minHeight: 80,
    marginTop: 16
  },
  addressContainer: {
    flexDirection: "row"
  },
  addressSection: {
    width: responsiveWidth(80)
  },
  hotelAddress: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    color: constants.black1
  },
  addressMarkerSection: {
    flex: 1
  },
  addressMarker: {
    height: 24,
    width: 24
  },

  bookingDetailsRow: {
    paddingHorizontal: 24
  },
  bookedSuit: {
    marginTop: 24,
    borderBottomWidth: 1,
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
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },

  amenitiesTextWrapper: {
    marginTop: 8,
    marginBottom: 4
  },
  amenitiesText: {
    ...constants.font20(constants.primaryLight),
    lineHeight: 22,
    color: constants.black2
  },

  bookingSection: {
    marginVertical: 32
  }
});

export default HotelVoucher;
