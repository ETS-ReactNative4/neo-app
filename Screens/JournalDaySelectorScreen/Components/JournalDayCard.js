import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const JournalDayCard = ({ image, info, action }) => {
  return (
    <View style={styles.journalDayCardContainer}>
      <ImageBackground
        blurRadius={2}
        source={image}
        resizeMode={"cover"}
        style={styles.dayCardImage}
      >
        <View style={styles.imageOverlay}>
          <Icon name={constants.downloadIcon} color={"white"} size={24} />
        </View>
      </ImageBackground>
      <Text style={styles.infoText}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  journalDayCardContainer: {
    minHeight: 254,
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24,
    backgroundColor: "white"
  },
  dayCardImage: {
    backgroundColor: "white",
    height: 164
  },
  imageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  infoText: {
    padding: 16,
    ...constants.fontCustom(constants.primaryRegular, 14, 20),
    color: constants.black1
  }
});

export default JournalDayCard;
