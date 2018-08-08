import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  LayoutAnimation,
  Platform
} from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react/custom";

@inject("appState")
@observer
class TripToggle extends Component {
  static propTypes = {
    containerStyle: PropTypes.object
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const { isTripModeOn, setTripMode } = this.props.appState;
    let { containerStyle } = this.props;
    if (!containerStyle) containerStyle = {};
    return (
      <TouchableHighlight
        onPress={() => setTripMode(!isTripModeOn)}
        underlayColor={constants.shade4}
        style={[
          styles.toggleContainer,
          isTripModeOn ? { backgroundColor: constants.firstColor } : {},
          containerStyle
        ]}
      >
        <View style={styles.toggleView}>
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
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  toggleContainer: {
    height: 19,
    width: 42,
    borderRadius: 9.5,
    backgroundColor: constants.shade2
  },
  toggleView: { flex: 1, flexDirection: "row" },
  offButton: {
    height: 24,
    width: 24,
    ...Platform.select({
      android: {
        backgroundColor: constants.shade5
      },
      ios: {
        backgroundColor: "white"
      }
    }),
    alignItems: "flex-end",
    borderRadius: 12,
    marginTop: -3.5,
    marginLeft: -8,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  offLabel: {
    fontFamily: constants.primarySemiBold,
    fontSize: 10,
    color: "white",
    marginLeft: 2,
    marginTop: 1
  },
  onLabel: {
    fontFamily: constants.primarySemiBold,
    fontSize: 10,
    color: "white",
    marginLeft: 8,
    marginTop: 1
  },
  onButton: {
    height: 24,
    width: 24,
    ...Platform.select({
      android: {
        backgroundColor: constants.shade5
      },
      ios: {
        backgroundColor: "white"
      }
    }),
    alignItems: "flex-end",
    borderRadius: 12,
    marginTop: -3.5,
    marginLeft: 3,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.5
  }
});

export default TripToggle;
