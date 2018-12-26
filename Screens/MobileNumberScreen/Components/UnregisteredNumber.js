import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";

const UnregisteredNumber = ({ onClick }) => {
  return (
    <View style={styles.container}>
      <Icon size={17} color={constants.black2} name={constants.infoIcon} />
      <View style={styles.errorTextWrapper}>
        <Text style={styles.errorText}>
          {constants.mobileNumberScreenText.unregisteredNumberText}
          {"\n"}
          <Text
            style={styles.exploreText}
            onPress={onClick}
          >{`Click here to Explore Itineraries.`}</Text>
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
    flexWrap: "wrap",
    marginLeft: 8
  },
  errorText: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  },
  exploreText: {
    color: constants.firstColor,
    textDecorationLine: "underline"
  }
});

UnregisteredNumber.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default UnregisteredNumber;
