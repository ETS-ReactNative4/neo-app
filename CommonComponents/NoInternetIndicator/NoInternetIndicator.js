import React, { Component } from "react";
import { StyleSheet, Text, View, NetInfo, LayoutAnimation } from "react-native";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react/custom";

@inject("appState")
@observer
class NoInternetIndicator extends Component {
  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.appState.setConnectionStatus(isConnected);
    });

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = isConnected => {
    this.props.appState.setConnectionStatus(isConnected);
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (this.props.appState.isConnected) return null;

    return (
      <View style={styles.noInternetViewContainer}>
        <Icon name={constants.noInternetIcon} size={16} color={"white"} />
        <Text style={styles.noInternetText}>{constants.noInernetText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noInternetViewContainer: {
    backgroundColor: constants.black1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8
  },
  noInternetText: {
    ...constants.fontCustom(constants.primaryRegular, 13),
    color: "white"
  }
});

export default NoInternetIndicator;
