import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";

class EmergencyContactSection extends Component {
  render() {
    return (
      <View style={styles.emergencyContactsContainer}>
        <View style={styles.dialCodeContainer}>
          <Text style={styles.dialCodeTitle}>{"Dial Code"}</Text>
          <Text style={styles.dialCodeText}>{"+31"}</Text>
        </View>
        <View style={styles.emergencyTextContainer}>
          <Text
            style={styles.emergencyText}
          >{`To call Belgium from India, dial + or 00 then 32 (the country code for Belgium), then the area code (without the initial 0) and the local number.

For local calls within Belgium, start with the area code (with the initial 0). In the case above area code is 12`}</Text>
        </View>
        <View style={styles.phoneNumberTitleContainer}>
          <Text style={styles.phoneNumberTitle}>{"CALLING FROM INDIA"}</Text>
          <Text style={styles.phoneNumberTitle}>{"LOCAL CALL"}</Text>
        </View>
        <View style={styles.phoneNumberExampleContainer}>
          <Text style={styles.phoneNumber}>
            <Text style={styles.countryCode}>{"+32"}</Text>
            {` `}
            {`12 1234567`}
          </Text>
          <Text style={styles.phoneNumber}>
            <Text style={styles.countryCode}>{"012"}</Text>
            {` `}
            {`12 1234567`}
          </Text>
        </View>
        <View style={styles.emergencyNumbersContainer}>
          <View style={styles.emergencyNumberWrapper}>
            <Text style={styles.emergencyNumbers}>{"Police"}</Text>
            <Text style={styles.emergencyNumbers}>{"112"}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emergencyContactsContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  dialCodeContainer: {
    marginTop: 28,
    height: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dialCodeTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 19),
    color: constants.black1
  },
  dialCodeText: {
    ...constants.fontCustom(constants.primarySemiBold, 19),
    color: constants.black1
  },
  emergencyTextContainer: {
    paddingHorizontal: 24,
    marginTop: 13
  },
  emergencyText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.shade1
  },
  phoneNumberTitleContainer: {
    marginTop: 16,
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24
  },
  phoneNumberTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 10),
    color: constants.black1
  },
  phoneNumberExampleContainer: {
    marginTop: 8,
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24
  },
  phoneNumber: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.shade3
  },
  countryCode: {
    color: constants.black1
  },
  emergencyNumbersContainer: {}
});

export default EmergencyContactSection;
