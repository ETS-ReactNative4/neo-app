import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationActions } from "react-navigation";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import navigationService from "../../../../Services/navigationService/navigationService";
import constants from "../../../../constants/constants";

const openStatus = NavigationActions.navigate({ routeName: "FlightStatus" });
const FlightActionSection = () => {
  return (
    <View style={styles.flightActionSection}>
      <SimpleButton
        text={"Status"}
        action={() => navigationService.navigation.dispatch(openStatus)}
        textColor={constants.firstColor}
        color={"white"}
        hasBorder={true}
        containerStyle={{ height: 40, width: 158 }}
      />
      <SimpleButton
        text={"Web Checkin"}
        action={() => null}
        textColor={constants.firstColor}
        color={"white"}
        hasBorder={true}
        containerStyle={{ height: 40, width: 158 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flightActionSection: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default FlightActionSection;
