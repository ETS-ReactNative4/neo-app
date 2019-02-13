import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationActions } from "react-navigation";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import navigationService from "../../../../Services/navigationService/navigationService";
import constants from "../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import { logError } from "../../../../Services/errorLogger/errorLogger";
import storeService from "../../../../Services/storeService/storeService";
import openCustomTab from "../../../../Services/openCustomTab/openCustomTab";

const openStatus = NavigationActions.navigate({ routeName: "FlightStatus" });
const FlightActionSection = ({ webCheckInUrl, isWebCheckinActive }) => {
  return (
    <View style={styles.flightActionSection}>
      {webCheckInUrl ? (
        <SimpleButton
          text={"Web Checkin"}
          action={() => {
            if (isWebCheckinActive) {
              openCustomTab(
                webCheckInUrl,
                () => null,
                () => {
                  logError(
                    `Unable to launch custom tab for web checkin! - ${webCheckInUrl}`
                  );
                }
              );
            } else {
              storeService.infoStore.setInfo(
                constants.voucherText.webCheckinUnavailableHeader,
                constants.voucherText.webCheckinUnavailableText
              );
            }
          }}
          textColor={constants.firstColor}
          color={"white"}
          hasBorder={true}
          containerStyle={{ height: 40, width: responsiveWidth(100) - 48 }}
        />
      ) : null}
      {webCheckInUrl ? (
        <Text style={styles.webCheckinInfoText}>
          <Text style={styles.noteText}>{"Note: "}</Text>
          {constants.voucherText.webCheckinInfoText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  flightActionSection: {
    flexDirection: "column",
    alignItems: "center"
  },
  webCheckinInfoText: {
    marginVertical: 8,
    ...constants.fontCustom(constants.primaryLight, 12),
    color: constants.black1,
    textAlign: "left"
  },
  noteText: {
    fontFamily: constants.primarySemiBold
  }
});

FlightActionSection.propTypes = {
  webCheckInUrl: PropTypes.string.isRequired,
  isWebCheckinActive: PropTypes.bool.isRequired
};

export default FlightActionSection;
