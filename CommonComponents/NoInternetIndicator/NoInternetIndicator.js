import React from "react";
import { StyleSheet, Text, View, LayoutAnimation } from "react-native";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react/custom";

const NoInternetIndicator = inject("appState")(
  observer(({ appState }) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (appState.isConnected) return null;

    return (
      <View style={styles.noInternetViewContainer}>
        <Icon name={constants.noInternetIcon} size={14} color={"white"} />
        <Text style={styles.noInternetText}>{constants.noInernetText}</Text>
      </View>
    );
  })
);

const styles = StyleSheet.create({
  noInternetViewContainer: {
    backgroundColor: constants.black1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginLeft: 2
  },
  noInternetText: {
    ...constants.fontCustom(constants.primaryRegular, 13),
    color: "white",
    marginTop: 2
  }
});

export default NoInternetIndicator;
