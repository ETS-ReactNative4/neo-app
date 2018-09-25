import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  SafeAreaView
} from "react-native";
import constants from "../../constants/constants";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import { inject, observer } from "mobx-react/custom";

@inject("appState")
@observer
class Starter extends Component {
  static navigationOptions = {
    header: null
  };

  clickedBooking = () => {
    this.props.navigation.navigate("MobileNumber");
  };

  clickedPlan = () => {
    this.props.appState.setTripMode(false);
  };

  render() {
    return (
      <ImageBackground
        source={constants.starterBackground}
        style={styles.container}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.6, 0.85, 0.95, 1]}
          colors={[
            "transparent",
            constants.firstGradientAlpha(0.5),
            constants.firstGradientAlpha(0.7),
            constants.firstGradientAlpha(0.9)
          ]}
          style={styles.gradientContainer}
        >
          <SafeAreaView>
            <View style={styles.logoRow}>
              <Image
                source={constants.pytLogoNew}
                style={styles.logo}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.buttonRow}>
              <View>
                <SimpleButton
                  text={`Find a Booking`}
                  textColor={`white`}
                  color={constants.firstColor}
                  underlayColor={constants.firstColorAlpha(0.7)}
                  action={this.clickedBooking}
                  containerStyle={{ marginRight: 8 }}
                />
                <View style={[styles.textWrapper, { marginRight: 8 }]}>
                  <Text style={styles.infoText}>
                    View the trips you have booked or have been invited to join.
                  </Text>
                </View>
              </View>
              <View>
                <SimpleButton
                  text={`Plan a vacation`}
                  textColor={constants.firstColor}
                  color={"white"}
                  underlayColor={constants.firstColorAlpha(0.7)}
                  action={this.clickedPlan}
                />
                <View style={styles.textWrapper}>
                  <Text style={styles.infoText}>
                    Open your saved itineraries or plan & book a fabulous
                    vacation.
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
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
  gradientContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  },
  logo: {
    height: 31,
    width: 168
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    flexWrap: "wrap"
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
