import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const PlaceSectionTitle = ({ title, image }) => {
  return (
    <View style={styles.titleContainer}>
      <Image source={image} style={styles.titleIcon} />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 4
  },
  titleIcon: {
    height: 24,
    width: 24,
    marginLeft: 24
  },
  titleText: {
    ...Platform.select({
      ios: {
        marginTop: 3
      },
      android: {
        marginTop: 1
      }
    }),
    ...constants.fontCustom(constants.primarySemiBold, 20),
    marginLeft: 4,
    color: constants.black1
  }
});

PlaceSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired
};

export default PlaceSectionTitle;
