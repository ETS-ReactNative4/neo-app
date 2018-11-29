import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react/custom";
import * as Keychain from "react-native-keychain";
import { logError } from "../../Services/errorLogger/errorLogger";
import { recordEvent } from "../../Services/analytics/analyticsService";

@inject("itineraries")
@inject("appState")
@observer
class TripToggle extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    navigation: PropTypes.object.isRequired
  };

  toggleNavigation = () => {
    recordEvent(constants.tripToggleClickEvent);
    const { isTripModeOn, setTripMode } = this.props.appState;
    const { selectedItineraryId } = this.props.itineraries;
    const { navigation } = this.props;
    if (isTripModeOn) {
      setTripMode(!isTripModeOn);
      navigation.navigate("NewItineraryStack");
    } else {
      if (selectedItineraryId) {
        setTripMode(!isTripModeOn);
        navigation.navigate("BookedItineraryTabs");
      } else {
        Keychain.getGenericPassword()
          .then(credentials => {
            if (credentials) {
              navigation.navigate("YourBookingsUniversal");
            } else {
              navigation.navigate("MobileNumber");
            }
          })
          .catch(e => {
            logError(e);
          });
      }
    }
  };

  render() {
    const { isTripModeOn } = this.props.appState;
    let { containerStyle } = this.props;
    if (!containerStyle) containerStyle = {};
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.toggleNavigation}
        style={[styles.toggleContainer, containerStyle]}
      >
        <View
          style={[
            styles.toggleStrap,
            isTripModeOn
              ? {
                  backgroundColor: constants.firstColor
                }
              : null
          ]}
        />
        {isTripModeOn ? (
          <Text style={styles.onLabel}>{`Trip`}</Text>
        ) : (
          <View style={styles.offButton} />
        )}
        {isTripModeOn ? (
          <View style={styles.onButton} />
        ) : (
          <Text style={styles.offLabel}>{`Trip`}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  toggleContainer: {
    height: 32,
    width: 56,
    flexDirection: "row",
    marginRight: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  toggleStrap: {
    height: 18,
    top: 7,
    left: 4,
    width: 48,
    borderRadius: 9.5,
    backgroundColor: constants.shade2,
    position: "absolute"
  },
  offButton: {
    height: 24,
    width: 24,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 5
  },
  onButton: {
    height: 24,
    width: 24,
    backgroundColor: "white",
    alignItems: "flex-end",
    borderRadius: 12,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 5
  },
  offLabel: {
    fontFamily: constants.primarySemiBold,
    fontSize: 10,
    color: "white",
    paddingLeft: 2,
    marginTop: -2,
    width: 24
  },
  onLabel: {
    fontFamily: constants.primarySemiBold,
    fontSize: 10,
    color: "white",
    paddingLeft: 4,
    marginTop: -2,
    width: 24
  }
});

export default TripToggle;
