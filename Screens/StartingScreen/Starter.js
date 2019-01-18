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
import openCustomTab from "../../Services/openCustomTab/openCustomTab";

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
                source={constants.pytLogoWhite}
                style={styles.logo}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.buttonRow}>
              <SimpleButton
                text={`Find your booking`}
                textColor={`white`}
                textStyle={{
                  ...constants.fontCustom(constants.primarySemiBold, 18)
                }}
                color={constants.firstColor}
                underlayColor={constants.firstColorAlpha(0.7)}
                action={() => {
                  this.clickedBooking();
                  recordEvent(constants.starterFindBooking);
                }}
                containerStyle={{ width: 220, height: 48 }}
              />
              <View style={styles.textWrapper}>
                <Text style={styles.infoText}>
                  {`Or `}
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
            <View style={styles.tncWrapper}>
              <Text style={styles.tncText}>
                By using pickyourtrail app you agree to our{" "}
                <Text
                  style={styles.tncLink}
                  onPress={() => {
                    openCustomTab(
                      `${constants.productUrl}${constants.termsAndConditions}`
                    );
                  }}
                >
                  Terms and Conditions
                </Text>{" "}
                and all your data will be protected by our{" "}
                <Text
                  style={styles.tncLink}
                  onPress={() => {
                    openCustomTab(
                      `${constants.productUrl}${constants.privacyPolicy}`
                    );
                  }}
                >
                  Privacy Policy
                </Text>
              </Text>
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
    marginBottom: 32
  },
  logo: {
    height: 62,
    width: 200
  },
  buttonRow: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  textWrapper: {
    width: 182,
    marginTop: 24,
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
  },
  tncWrapper: {
    marginHorizontal: 24,
    marginBottom: 16
  },
  tncText: {
    ...constants.fontCustom(constants.primaryLight, 8, 12),
    color: "white",
    textAlign: "center"
  },
  tncLink: {
    fontFamily: constants.primarySemiBold,
    textDecorationLine: "underline"
  }
});

export default Starter;
