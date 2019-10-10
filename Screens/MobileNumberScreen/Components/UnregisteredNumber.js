import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";

const UnregisteredNumber = ({ onClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.errorTextWrapper}>
        <Text style={styles.errorText}>
          {constants.mobileNumberScreenText.unregisteredNumberText}
          {"\n\n"}
          <Text
            style={styles.exploreText}
            onPress={onClick}
          >{`Explore Itineraries`}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 24
  },
  errorTextWrapper: {
    flexWrap: "wrap"
  },
  errorText: {
    ...constants.fontCustom(constants.primaryLight, 15, 20),
    color: constants.shade1,
    width: responsiveWidth(100) - 48
  },
  exploreText: {
    fontSize: 17,
    fontFamily: constants.primarySemiBold,
    color: constants.firstColor,
    textDecorationLine: "underline"
  }
});

UnregisteredNumber.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default UnregisteredNumber;
