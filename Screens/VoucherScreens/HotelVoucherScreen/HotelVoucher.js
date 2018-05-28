import React, { Component } from "react";
import {
  View,
  Animated,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView
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

class HotelVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const xHeight = isIphoneX() ? constants.xNotchHeight : 0;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ParallaxScrollView
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={48 + xHeight}
          renderStickyHeader={() => (
            <VoucherStickyHeader action={() => {}} text={"1242345"} />
          )}
          renderForeground={() => (
            <VoucherHeader
              infoText={`BOOKING ID`}
              title={`1242345`}
              menu={() => {}}
              onClickClose={() => {}}
            />
          )}
        >
          <View style={styles.checkInRow}>
            <View style={styles.checkInBox}>
              <Text style={styles.checkTitle}>CHECK IN</Text>
              <Text style={styles.checkDate}>Sun, 24 Dec</Text>
              <Text style={styles.checkTime}>14:30</Text>
            </View>
            <View style={styles.checkOutBox}>
              <Text style={styles.checkTitle}>CHECK OUT</Text>
              <Text style={styles.checkDate}>Sun, 24 Dec</Text>
              <Text style={styles.checkTime}>14:30</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Text
              style={styles.hotelName}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >{`Claremont Guest House`}</Text>
            <View style={styles.addressContainer}>
              <View style={styles.addressSection}>
                <Text
                  style={styles.hotelAddress}
                  numberOfLines={3}
                  ellipsizeMode={"tail"}
                >
                  {`1-4b, Address line 1, Address Line 2. Address line 3, Addrss lastline 600700`}
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
            <View style={styles.bookedSuit}>
              <View style={styles.bookedSuitInfo}>
                <CircleThumbnail image={constants.splashBackground} />
                <View style={styles.bookedSuitDetails}>
                  <Text
                    style={styles.bookedSuitType}
                  >{`Single Bedroom Suite`}</Text>
                  <Text
                    style={styles.suitBookingDetails}
                  >{`Booked for 2 Adults`}</Text>
                </View>
              </View>

              <View style={styles.userDetails}>
                <View style={styles.userIcon}>
                  <Icon name={constants.trainIcon} color={"black"} size={16} />
                </View>
                <View style={styles.userNameWrapper}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                    style={styles.userName}
                  >{`Mr. Chetana Purushotham Mewada`}</Text>
                </View>
              </View>

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
                  <Text style={styles.sectionValue}>Partially Refundable</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <SimpleButton
                  text={"Directions"}
                  containerStyle={{ width: responsiveWidth(40) }}
                  action={() => {}}
                  color={"transparent"}
                  textColor={constants.black2}
                  hasBorder={true}
                  icon={constants.trainIcon}
                  iconSize={16}
                />
                <SimpleButton
                  text={"Directions"}
                  containerStyle={{ width: responsiveWidth(40) }}
                  action={() => {}}
                  color={"transparent"}
                  textColor={constants.black2}
                  hasBorder={true}
                  icon={constants.trainIcon}
                  iconSize={16}
                />
              </View>

              <View style={styles.amenitiesSection}>
                <Text style={styles.amenitiesText}>Hotel amenities</Text>
                <Icon
                  name={constants.trainIcon}
                  color={constants.shade2}
                  size={16}
                />
              </View>

              <View style={styles.bookingSection}>
                <View style={styles.textRowWrapper}>
                  <Text style={styles.sectionName}>Breakfast</Text>
                  <Text style={styles.sectionValue}>Complementary</Text>
                </View>
                <View style={styles.textRowWrapper}>
                  <Text style={styles.sectionName}>Breakfast</Text>
                  <Text style={styles.sectionValue}>Complementary</Text>
                </View>
                <View style={styles.textRowWrapper}>
                  <Text style={styles.sectionName}>Breakfast</Text>
                  <Text style={styles.sectionValue}>Complementary</Text>
                </View>
              </View>
            </View>
          </View>
        </ParallaxScrollView>
      </SafeAreaView>
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
  hotelName: {
    fontFamily: constants.primarySemiBold,
    fontSize: 24,
    color: constants.black1
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
    marginTop: 24
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

  userDetails: {
    flexDirection: "row",
    marginTop: 16
  },
  userIcon: {
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  userNameWrapper: {
    marginLeft: 8
  },
  userName: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    marginTop: 3,
    color: constants.black1
  },

  hotelDetailsSection: {
    marginTop: 24,
    paddingBottom: 24,
    borderBottomWidth: 2,
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
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: constants.shade4
  },

  amenitiesSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    borderBottomWidth: 2,
    borderBottomColor: constants.shade4
  },
  amenitiesText: {
    ...constants.font20(constants.primaryLight),
    color: constants.black2
  },

  bookingSection: {
    marginVertical: 32
  }
});

export default HotelVoucher;
