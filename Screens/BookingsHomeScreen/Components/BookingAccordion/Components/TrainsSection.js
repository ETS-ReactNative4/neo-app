import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";

const TrainsSection = ({ section }) => {
  return (
    <View>
      {section.items.map((train, index) => {
        let isLast = index === section.items.length - 1;

        return <Train key={index} train={train} isLast={isLast} />;
      })}
    </View>
  );
};

TrainsSection.propTypes = {
  section: PropTypes.object.isRequired
};

const Train = ({ train, isLast }) => {
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
          <Text style={styles.contentHeader}>{`${
            train.dateMillis
              ? moment(train.dateMillis).format("MMM DD")
              : moment(
                  `${train.day}/${train.mon}/${constants.currentYear}`,
                  "DD/MMM/YYYY"
                ).format("MMM DD")
          } (${train.departureTime} - ${train.arrivalTime})`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {train.text}
          </Text>
        </View>
      </View>
      <View style={styles.rightPlaceholder}>
        <Text style={styles.rightPlaceholderText}>Stayed</Text>
      </View>
    </View>
  );
};

Train.propTypes = {
  train: PropTypes.object.isRequired,
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

export default TrainsSection;
