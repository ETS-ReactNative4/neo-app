import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

const TabBarIcon = ({ text, icon }) => {
  return (
    <View style={styles.iconWrapper}>
      <Image style={styles.icon} source={icon} resizeMode={"contain"} />
      <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.label}>
        {text}
      </Text>
    </View>
  );
};

TabBarIcon.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired
};

const styles = StyleSheet.create({
  iconWrapper: {
    ...Platform.select({
      android: {
        marginTop: -4
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
    fontSize: 8,
    color: constants.black1
  }
});

export default TabBarIcon;
