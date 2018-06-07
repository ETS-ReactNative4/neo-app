import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";

const FlightsSection = ({ section }) => {
  return (
    <View>
      {section.items.map((flight, index) => {
        let isLast = index === section.items.length - 1;

        return <Flight key={index} flight={flight} isLast={isLast} />;
      })}
    </View>
  );
};

FlightsSection.propTypes = {
  section: PropTypes.object.isRequired
};

const Flight = ({ flight, isLast }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      borderBottomWidth: 1,
      paddingBottom: 16
    };
  }

  return (
    <View style={[styles.contentContainer, customStyle]}>
      <View style={styles.iconWrapper}>
        <Image
          resizeMode={"cover"}
          style={styles.contentIcon}
          source={constants.splashBackground}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${moment(
            `${flight.day}/${flight.mon}/${constants.currentYear}`,
            "DD/MMM/YYYY"
          ).format("MMM DD")} (${flight.departureTime} - ${
            flight.arrivalTime
          })`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {flight.text}
          </Text>
        </View>
      </View>
      <View style={styles.rightPlaceholder}>
        <Text style={styles.rightPlaceholderText}>Stayed</Text>
      </View>
    </View>
  );
};

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    borderBottomColor: constants.shade4,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    minHeight: 40,
    marginLeft: 16
  },
  contentHeaderWrapper: {
    height: 16,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 14,
    color: constants.shade2
  },
  contentTextWrapper: {
    minHeight: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  },
  rightPlaceholder: {
    flex: 1,
    alignItems: "flex-end"
  },
  rightPlaceholderText: {
    fontFamily: constants.primaryLight,
    fontSize: 10,
    color: constants.black2
  }
});

export default FlightsSection;
