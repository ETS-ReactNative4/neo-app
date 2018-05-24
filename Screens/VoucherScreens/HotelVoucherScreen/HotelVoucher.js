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
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";

class HotelVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <VoucherHeader
            infoText={`BOOKING ID`}
            title={`1242345`}
            menu={() => {}}
            onClickClose={() => {}}
          />

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
        </ScrollView>
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
  }
});

export default HotelVoucher;
