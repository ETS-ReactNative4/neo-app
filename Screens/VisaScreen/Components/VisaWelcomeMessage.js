import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";

const VisaWelcomeMessage = ({
  containerStyle = StyleSheet.create({}),
  name,
  message,
  numOfPax,
  date
}) => {
  return (
    <View style={[styles.visaWelcomeMessageContainer, containerStyle]}>
      <View>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <View>
        <Text style={styles.welcomeMessage}>{message || ""}</Text>
      </View>
      <View style={styles.detailsRow}>
        {numOfPax ? (
          <View style={styles.rowSection}>
            <Icon
              name={constants.peopleIcon}
              size={16}
              color={constants.black1}
            />
            <Text style={styles.infoText}>{`${numOfPax || ""} Pax`}</Text>
          </View>
        ) : null}
        {date ? (
          <View style={styles.rowSection}>
            <Icon
              name={constants.aeroplaneTakeOffIcon}
              size={16}
              color={constants.black1}
            />
            <Text style={styles.infoText}>{date || ""}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

VisaWelcomeMessage.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  numOfPax: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  visaWelcomeMessageContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  userName: {
    ...constants.fontCustom(constants.primarySemiBold, 24),
    color: constants.black1,
    textAlign: "center"
  },
  welcomeMessage: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1,
    marginTop: 16,
    textAlign: "center"
  },
  detailsRow: {
    flexDirection: "row",
    marginTop: 24
  },
  rowSection: {
    flexDirection: "row",
    marginLeft: 24
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    marginLeft: 8,
    marginTop: 4
  }
});

export default VisaWelcomeMessage;
