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
import { inject, observer } from "mobx-react/custom";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

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
        source={constants.starterScreenBackground}
        style={styles.container}
      >
        <SafeAreaView>
          <View style={styles.logoRow}>
            <Image
              source={constants.pytLogoBlack}
              style={styles.logo}
              resizeMode={"contain"}
            />
          </View>
          <View style={styles.buttonRow}>
            <SimpleButton
              text={constants.starterScreenText.mainButton}
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
            <SimpleButton
              text={constants.starterScreenText.exploreButton}
              textColor={constants.shade2}
              textStyle={{
                ...constants.fontCustom(constants.primarySemiBold, 18)
              }}
              color={`white`}
              hasBorder={true}
              action={() => {
                this.clickedPlan();
                recordEvent(constants.starterPlanVacation);
              }}
              containerStyle={{ width: 220, height: 48, marginVertical: 16 }}
            />
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingTop: responsiveHeight(45)
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  logo: {
    height: 62,
    width: 200
  },
  buttonRow: {
    width: responsiveWidth(100),
    alignItems: "center",
    justifyContent: "center"
  },
  hyperlink: {
    textDecorationLine: "underline"
  },
  tncWrapper: {
    marginHorizontal: 48,
    marginTop: 16
  },
  tncText: {
    ...constants.fontCustom(constants.primaryLight, 10, 16),
    color: constants.shade1,
    textAlign: "center"
  },
  tncLink: {
    fontFamily: constants.primarySemiBold,
    textDecorationLine: "underline"
  }
});

export default Starter;
