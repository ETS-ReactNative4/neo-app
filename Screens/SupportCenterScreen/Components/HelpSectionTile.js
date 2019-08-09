import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes
} from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";

const HelpSectionTile = ({
  containerStyle = StyleSheet.create({}),
  icon = "",
  title = "",
  action = () => null
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.helpSectionTileContainer, containerStyle]}
    >
      <View style={styles.leftIconContainer}>
        <Icon size={16} name={icon} />
      </View>
      <View style={styles.textSectionContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightIconContainer}>
        <Icon size={10} name={constants.arrowRight} />
      </View>
    </TouchableOpacity>
  );
};

HelpSectionTile.propTypes = {
  containerStyle: ViewPropTypes.style,
  icon: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.func
};

const styles = StyleSheet.create({
  helpSectionTileContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 2,
    backgroundColor: "white"
  },
  leftIconContainer: {
    height: 16,
    width: 16,
    marginHorizontal: 24
  },
  textSectionContainer: {
    flex: 1
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1,
    marginTop: 4
  },
  rightIconContainer: {
    height: 10,
    width: 10,
    marginHorizontal: 24
  }
});

export default HelpSectionTile;
