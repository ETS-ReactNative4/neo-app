import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import dialer from "../../../Services/dialer/dialer";
import directions from "../../../Services/directions/directions";
import { recordEvent } from "../../../Services/analytics/analyticsService";

class EmergencyContactSection extends Component {
  static propTypes = {
    cityContactDetails: PropTypes.object.isRequired
  };

  render() {
    /**
     * TODO: Need Local Call Code!!
     */
    /**
     * TODO: Mail button for Embassy!!
     */
    const {
      embassyAddress,
      embassyEmail,
      embassyContactNumber,
      policeNumber,
      ambulanceNumber,
      fireNumber,
      missingChildrenNumber,
      dialCode,
      dialCodeDescription,
      embassyLatitude,
      embassyLongitude
    } = this.props.cityContactDetails;

    const contactNumbersList = [
      policeNumber
        ? {
            title: "Police",
            number: policeNumber,
            recordEvent: () =>
              recordEvent(constants.emergencyContactsPoliceNumberClick)
          }
        : null,
      ambulanceNumber
        ? {
            title: "Ambulance",
            number: ambulanceNumber,
            recordEvent: () =>
              recordEvent(constants.emergencyContactsAmbulanceNumberClick)
          }
        : null,
      fireNumber
        ? {
            title: "Fire Department",
            number: fireNumber,
            recordEvent: () =>
              recordEvent(constants.emergencyContactsFireDeptNumberClick)
          }
        : null,
      missingChildrenNumber
        ? {
            title: "In case of missing children",
            number: missingChildrenNumber,
            recordEvent: () =>
              recordEvent(constants.emergencyContactsChildrenMissingNumberClick)
          }
        : null
    ];

    return (
      <ScrollView style={styles.emergencyContactsContainer}>
        <View style={styles.dialCodeContainer}>
          <Text style={styles.dialCodeTitle}>{"Dial Code"}</Text>
          <Text style={styles.dialCodeText}>{dialCode || "NA"}</Text>
        </View>
        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyText}>
            {dialCodeDescription || "NA"}
          </Text>
        </View>
        {/*<View style={styles.phoneNumberTitleContainer}>*/}
        {/*<Text style={styles.phoneNumberTitle}>{"CALLING FROM INDIA"}</Text>*/}
        {/*<Text style={styles.phoneNumberTitle}>{"LOCAL CALL"}</Text>*/}
        {/*</View>*/}
        {/*<View style={styles.phoneNumberExampleContainer}>*/}
        {/*<Text style={styles.phoneNumber}>*/}
        {/*<Text style={styles.countryCode}>{dialCode || "NA"}</Text>*/}
        {/*{` `}*/}
        {/*{`12 1234567`}*/}
        {/*</Text>*/}
        {/*<Text style={styles.phoneNumber}>*/}
        {/*<Text style={styles.countryCode}>{"NA"}</Text>*/}
        {/*{` `}*/}
        {/*{`12 1234567`}*/}
        {/*</Text>*/}
        {/*</View>*/}
        <View style={styles.emergencyNumbersContainer}>
          {contactNumbersList.map((contactNumber, contactNumberIndex) => {
            if (!contactNumber) return null;
            return (
              <TouchableOpacity
                onPress={() => {
                  contactNumber.recordEvent();
                  dialer(contactNumber.number);
                }}
                key={contactNumberIndex}
                style={styles.emergencyNumberWrapper}
              >
                <Text style={styles.emergencyNumbers}>
                  {contactNumber.title}
                </Text>
                <Text style={[styles.emergencyNumbers, styles.numberText]}>
                  {contactNumber.number || "NA"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.addressTitleContainer}>
          <Text style={styles.addressTitle}>Indian Embassy</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{embassyAddress || "NA"}</Text>
        </View>

        <View style={styles.actionRow}>
          <SimpleButton
            iconSize={17}
            textStyle={{
              ...constants.fontCustom(constants.primaryLight, 17),
              paddingTop: 5
            }}
            icon={constants.compassIcon}
            text={"Directions"}
            action={() => {
              recordEvent(constants.emergencyContactsEmbassyDirectionsClick);
              directions({
                latitude: embassyLatitude,
                longitude: embassyLongitude
              });
            }}
            textColor={constants.black2}
            color={"white"}
            hasBorder={true}
          />
          <SimpleButton
            iconSize={17}
            textStyle={{
              ...constants.fontCustom(constants.primaryLight, 17),
              paddingTop: 5
            }}
            icon={constants.callIcon}
            text={"Contact"}
            action={() => {
              recordEvent(constants.emergencyContactsEmbassyContactsClick);
              dialer(embassyContactNumber);
            }}
            textColor={constants.black2}
            color={"white"}
            hasBorder={true}
          />
        </View>
      </ScrollView>
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
  emergencyNumbersContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    minHeight: 84
  },
  emergencyNumberWrapper: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8
  },
  emergencyNumbers: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black1
  },
  numberText: {
    color: constants.firstColor,
    fontFamily: constants.primarySemiBold,
    textDecorationLine: "underline"
  },
  addressTitleContainer: {
    marginTop: 28,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  addressTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1
  },
  addressContainer: {
    paddingHorizontal: 24
  },
  addressText: {
    marginTop: 8,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  },
  actionRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default EmergencyContactSection;
