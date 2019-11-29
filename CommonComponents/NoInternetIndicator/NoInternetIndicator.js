import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react";

const NoInternetIndicator = inject("appState")(
  observer(({ appState }) => {
    if (appState.isConnected) return null;

    return (
      <View style={styles.noInternetViewContainer}>
        <Icon
          name={constants.noInternetIcon}
          size={13}
          color={"white"}
          style={styles.noInternetIcon}
        />
        <Text style={styles.noInternetText}>{constants.noInernetText}</Text>
      </View>
    );
  })
);

const styles = StyleSheet.create({
  noInternetViewContainer: {
    backgroundColor: constants.black1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  noInternetIcon: {
    marginTop: -3
  },
  noInternetText: {
    ...constants.fontCustom(constants.primaryRegular, 13),
    color: "white",
    marginLeft: 4
  }
});

export default NoInternetIndicator;
