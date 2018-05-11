import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";
import constants from "../../constants/constants";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { isIphoneX } from "react-native-iphone-x-helper";

class Starter extends Component {
  static navigationOptions = {
    header: null
  };

  clickedBooking = () => {
    // this.props.navigation.push("Bookings");
    this.props.navigation.push("MobileNumber");
  };

  clickedExplore = () => {
    this.props.navigation.push("Explore");
  };

  render() {
    return (
      <ImageBackground
        source={constants.starterBackground}
        style={styles.container}
      >
        <SafeAreaView>
          <View style={styles.buttonRow}>
            <SimpleButton
              text={`Find a Booking`}
              textColor={`white`}
              color={constants.firstColor}
              underlayColor={constants.firstColorAlpha(0.7)}
              action={this.clickedBooking}
              containerStyle={{ marginRight: 8 }}
            />
            <SimpleButton
              text={`Plan a vacation`}
              textColor={constants.firstColor}
              color={"white"}
              underlayColor={constants.firstColorAlpha(0.7)}
              action={this.clickedExplore}
            />
          </View>
          <View style={styles.textRow}>
            <View style={[styles.textWrapper, { marginRight: 8 }]}>
              <Text style={styles.infoText}>
                View the trips you have booked or have been invited to join.
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>
                Open your saved itineraries or plan & book a fabulous vacation.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  textRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: isIphoneX() ? 0 : 24
  },
  textWrapper: {
    marginTop: 8,
    height: 32,
    width: 160,
    flexWrap: "wrap"
  },
  infoText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    flexWrap: "wrap",
    ...constants.font10(constants.primaryLight),
    lineHeight: 10
  }
});

export default Starter;
