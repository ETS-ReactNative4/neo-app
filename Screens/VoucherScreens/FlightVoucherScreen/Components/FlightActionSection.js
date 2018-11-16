import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationActions } from "react-navigation";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import navigationService from "../../../../Services/navigationService/navigationService";
import constants from "../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import { CustomTabs } from "react-native-custom-tabs";
import { logError } from "../../../../Services/errorLogger/errorLogger";

const openStatus = NavigationActions.navigate({ routeName: "FlightStatus" });
const FlightActionSection = ({ webCheckInUrl }) => {
  return (
    <View style={styles.flightActionSection}>
      <SimpleButton
        text={"Web Checkin"}
        action={() => {
          CustomTabs.openURL(webCheckInUrl, {
            showPageTitle: true
          })
            .then(launched => {
              if (!launched) {
                logError(
                  `Unable to launch custom tab for web checkin! - ${webCheckInUrl}`
                );
              }
              return null;
            })
            .catch(err => {
              logError(err);
            });
        }}
        textColor={constants.firstColor}
        color={"white"}
        hasBorder={true}
        containerStyle={{ height: 40, width: responsiveWidth(100) - 48 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flightActionSection: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

FlightActionSection.propTypes = {
  webCheckInUrl: PropTypes.string.isRequired
};

export default FlightActionSection;
