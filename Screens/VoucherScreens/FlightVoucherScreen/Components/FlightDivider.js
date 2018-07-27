import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import Dash from "react-native-dash";
import Icon from "../../../../CommonComponents/Icon/Icon";

const FlightDivider = ({ onClick, layoverText }) => {
  /**
   * TODO: Actual Arrow Icon needed
   */
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.2}
      style={styles.flightDividerContainer}
    >
      <View style={styles.arrowBox}>
        <View style={styles.topArrow}>
          <Icon size={12} name={constants.arrowRight} />
        </View>
        <View style={styles.bottomArrow}>
          <Icon size={12} name={constants.arrowRight} />
        </View>
      </View>

      <View style={styles.dottedLineContainer}>
        <Dash dashColor={constants.black2} dashGap={1} dashLength={1} />
      </View>

      <View style={styles.layoverTextWrapper}>
        <Text style={styles.layoverText}>{layoverText}</Text>
      </View>

      <View style={styles.dottedLineContainer}>
        <Dash dashColor={constants.black2} dashGap={1} dashLength={1} />
      </View>

      <View style={[styles.arrowBox, { alignItems: "flex-end" }]}>
        <View style={styles.topArrow}>
          <Icon size={12} name={constants.arrowRight} />
        </View>
        <View style={styles.bottomArrow}>
          <Icon size={12} name={constants.arrowRight} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flightDividerContainer: {
    height: 24,
    flexDirection: "row",
    marginVertical: 16
  },
  arrowBox: {
    height: 24,
    width: 24
  },
  layoverTextWrapper: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  layoverText: {
    ...Platform.select({
      ios: {
        paddingTop: 6
      },
      android: {
        paddingTop: 2
      }
    }),
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2
  },
  dottedLineContainer: {
    flex: 1,
    justifyContent: "center"
  },
  topArrow: {
    height: 12,
    width: 12,
    transform: [{ rotate: "90deg" }]
  },
  bottomArrow: {
    height: 12,
    width: 12,
    transform: [{ rotate: "-90deg" }]
  }
});

FlightDivider.propTypes = {
  onClick: PropTypes.func.isRequired,
  layoverText: PropTypes.string.isRequired
};

export default FlightDivider;
