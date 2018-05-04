import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  LayoutAnimation
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

class TripToggle extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    containerStyle: PropTypes.object
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const { isActive, action } = this.props;
    let { containerStyle } = this.props;
    if (!containerStyle) containerStyle = {};
    return (
      <TouchableHighlight
        onPress={action}
        underlayColor={constants.shade4}
        style={[
          styles.toggleContainer,
          isActive ? { backgroundColor: constants.firstColor } : {},
          containerStyle
        ]}
      >
        <View style={styles.toggleView}>
          {isActive ? (
            <Text style={styles.onLabel}>{`Trip`}</Text>
          ) : (
            <View style={styles.offButton} />
          )}
          {isActive ? (
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
