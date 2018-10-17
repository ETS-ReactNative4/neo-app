import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";

class FlightStatus extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Weather"} navigation={navigation} />
    };
  };

  render() {
    return (
      <View style={styles.flightStatusContainer}>
        <View style={styles.flightBanner}>
          <View style={styles.infoArea}>
            <Text style={styles.flightName}>GoAir Flight 2345</Text>
            <Text style={styles.schedule}>SCHEDULED Delayed by 10 mins</Text>
            <Text style={styles.date}>Mon, Aug 22</Text>
          </View>
          <View style={styles.logoArea}>
            <Image
              style={styles.flightIcon}
              resizeMode={"contain"}
              source={constants.notificationIcon}
            />
          </View>
        </View>
        <View style={styles.flightTrip}>
          <View style={styles.departureTextWrapper}>
            <Text style={styles.departureText}>Depart Chennai</Text>
          </View>
          <View style={styles.tripInfoContainer}>
            <View style={styles.flightCodeWrapper}>
              <Text style={styles.flightCode}>COC</Text>
            </View>
            <View style={styles.tripInfoWrapper}>
              <Text style={styles.tripTime}>11.30pm (sched. 10.20pm)</Text>
              <Text style={styles.terminalText}>Terminal 2, Gate 12A</Text>
            </View>
          </View>
        </View>
        <ScrollableTabView
          tabBarActiveTextColor={constants.black2}
          tabBarInactiveTextColor={constants.firstColor}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: constants.black2
          }}
          tabBarTextStyle={{ ...constants.font13(constants.primaryLight) }}
          initialPage={0}
          style={{ alignSelf: "center", width: responsiveWidth(100) }}
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel={"COC-KUL"} />
          <View tabLabel={"KUL-ACK"} />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flightStatusContainer: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "white"
  },
  flightBanner: {
    flexDirection: "row",
    marginTop: 24
  },
  infoArea: {
    flex: 1
  },
  flightName: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1
  },
  schedule: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    marginTop: 8,
    color: "rgba(208,2,27,1)"
  },
  date: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    marginTop: 8,
    color: constants.black2
  },
  logoArea: {
    alignItems: "center",
    justifyContent: "center"
  },
  flightIcon: {
    height: 48,
    width: 48
  },

  flightTrip: {
    marginTop: 16
  },
  departureTextWrapper: {},
  departureText: {
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.black1
  },
  tripInfoContainer: {
    flexDirection: "row",
    marginTop: 8
  },
  flightCodeWrapper: {
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  flightCode: {
    ...constants.fontCustom(constants.primaryLight, 32),
    color: constants.black2
  },
  tripInfoWrapper: {
    height: 32,
    justifyContent: "center",
    marginLeft: 8
  },
  tripTime: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2
  },
  terminalText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2
  }
});

export default FlightStatus;
