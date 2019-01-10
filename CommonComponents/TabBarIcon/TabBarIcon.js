import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react/custom";
import InfoDot from "../InfoDot/InfoDot";

const TabBarIcon = inject("appState")(
  observer(({ appState, text, icon, color }) => {
    const { isChatNotificationActive } = appState;
    return (
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Icon color={color} name={icon} size={24} />
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={[styles.label, { color }]}
        >
          {text}
        </Text>
        {text === "SUPPORT" && isChatNotificationActive ? (
          <InfoDot containerStyle={styles.dotStyle} />
        ) : null}
      </View>
    );
  })
);

TabBarIcon.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  iconWrapper: {
    ...Platform.select({
      android: {
        marginTop: -4
      },
      ios: {
        width: 45
      }
    }),
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    height: 25,
    width: 25,
    margin: 8
  },
  label: {
    fontFamily: constants.primaryLight,
    fontSize: 8
  },
  dotStyle: {
    position: "absolute",
    top: 5,
    right: 5
  }
});

export default TabBarIcon;
