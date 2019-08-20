import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import openCustomTab from "../../../Services/openCustomTab/openCustomTab";
import toggleHomeScreen from "../../../Services/toggleHomeScreen/toggleHomeScreen";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

/**
 * Displays a static information section inside homepage with two options
 * - Take user to the product url using custom tab
 * - Toggle home screen to the booking screen
 */
const HomePageCustomTripWidget = ({ navigation }) => {
  return (
    <View style={styles.customTripInfoContainer}>
      <Image
        source={constants.customTripIllus}
        style={styles.customTripImage}
        resizeMode={"contain"}
      />
      <Text style={styles.headerText}>
        {constants.homeText.customTripTitle}
      </Text>
      <Text style={styles.bodyText}>{constants.homeText.customTripBody}</Text>
      <View style={styles.buttonRow}>
        <SimpleButton
          text={constants.homeText.openProductText}
          textColor={`white`}
          textStyle={{
            ...constants.fontCustom(constants.primarySemiBold, 18)
          }}
          color={constants.firstColor}
          underlayColor={constants.firstColorAlpha(0.7)}
          action={() => {
            recordEvent(constants.Home.event, {
              click: constants.Home.click.openProduct
            });
            openCustomTab(
              `${constants.productUrl}${constants.leadSourceMappingQueryParams}`
            );
          }}
          containerStyle={{ width: 208, height: 40 }}
        />
        <SimpleButton
          text={constants.homeText.findBookingText}
          textColor={constants.shade2}
          textStyle={{
            ...constants.fontCustom(constants.primarySemiBold, 18)
          }}
          color={`white`}
          hasBorder={true}
          action={() => {
            recordEvent(constants.Home.event, {
              click: constants.Home.click.findBooking
            });
            toggleHomeScreen(navigation);
          }}
          containerStyle={{ width: 208, height: 40, marginVertical: 16 }}
        />
      </View>
    </View>
  );
};

HomePageCustomTripWidget.propTypes = forbidExtraProps({
  navigation: PropTypes.object.isRequired
});

const styles = StyleSheet.create({
  customTripInfoContainer: {
    marginHorizontal: 24,
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  customTripImage: {
    width: 250,
    height: 175,
    marginBottom: 16
  },
  headerText: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1,
    textAlign: "center",
    marginBottom: 8
  },
  bodyText: {
    marginBottom: 16,
    ...constants.fontCustom(constants.primaryLight, 16, 20),
    color: constants.shade1,
    textAlign: "center"
  },
  buttonRow: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  }
});

export default HomePageCustomTripWidget;
