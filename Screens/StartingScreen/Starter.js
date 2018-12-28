import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";
import constants from "../../constants/constants";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import LinearGradient from "react-native-linear-gradient";
import { inject, observer } from "mobx-react/custom";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary({ isRoot: true })
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
    this.props.navigation.navigate("NewItineraryStack");
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
              <SimpleButton
                text={`Find a Booking`}
                textColor={`white`}
                color={constants.firstColor}
                underlayColor={constants.firstColorAlpha(0.7)}
                action={() => {
                  this.clickedBooking();
                  recordEvent(constants.starterFindBooking);
                }}
                containerStyle={{ width: 182 }}
              />
              <View style={styles.textWrapper}>
                <Text style={styles.infoText}>
                  {`or `}
                  <Text
                    onPress={() => {
                      this.clickedPlan();
                      recordEvent(constants.starterPlanVacation);
                    }}
                    style={styles.hyperlink}
                  >
                    explore itineraries
                  </Text>
                </Text>
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
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  textWrapper: {
    width: 182,
    marginTop: 12,
    ...Platform.select({
      ios: {
        marginBottom: 16
      },
      android: {
        marginBottom: 32
      }
    }),
    flexWrap: "wrap",
    marginHorizontal: 56
  },
  infoText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    flexWrap: "wrap",
    ...constants.font17(constants.primarySemiBold)
  },
  hyperlink: {
    textDecorationLine: "underline"
  }
});

export default Starter;
