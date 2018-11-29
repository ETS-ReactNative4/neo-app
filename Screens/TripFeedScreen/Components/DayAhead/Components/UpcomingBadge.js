import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";

const UpcomingBadge = ({ containerStyle }) => {
  return (
    <View style={[styles.upcomingWrapper, containerStyle]}>
      <Text style={styles.upcomingText}>{"UPCOMING"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upcomingWrapper: {
    alignSelf: "flex-start",
    height: 16,
    borderRadius: 9.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constants.seventhColor
  },
  upcomingText: {
    ...constants.fontCustom(constants.primarySemiBold, 10),
    color: "white",
    marginTop: 1,
    paddingHorizontal: 4
  }
});

UpcomingBadge.propTypes = {
  containerStyle: PropTypes.object
};

export default UpcomingBadge;
